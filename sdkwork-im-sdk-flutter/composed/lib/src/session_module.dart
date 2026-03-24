import 'package:backend_sdk/src/models.dart';
import 'package:openchat_wukongim_adapter/openchat_wukongim_adapter.dart';

import 'context.dart';
import 'types.dart';

class OpenChatSessionModule {
  final OpenChatSdkContext context;

  OpenChatSessionModule(this.context);

  OpenChatAuthSession getState() => context.authSession;

  OpenChatAuthSession setAccessToken(String token) {
    return context.applyAccessToken(token);
  }

  OpenChatAuthSession setAuthToken(String token) {
    return context.applyAccessToken(token);
  }

  Future<OpenChatAuthSession> login(LoginDto payload) async {
    final response = await context.backendClient.auth.controllerLogin(payload);
    final nextSession = normalizeAuthSession(
      response,
      previousUser: context.authSession.user,
    );
    if (nextSession.token != null && nextSession.token!.isNotEmpty) {
      context.applyAccessToken(nextSession.token!);
    }
    context.authSession = nextSession;
    if (nextSession.realtime != null && context.realtimeAdapter != null) {
      await context.realtimeAdapter!.connect(nextSession.realtime);
    }
    return context.authSession;
  }

  Future<OpenChatAuthSession> register(RegisterDto payload) async {
    final response =
        await context.backendClient.auth.controllerRegister(payload);
    final nextSession = normalizeAuthSession(
      response,
      previousUser: context.authSession.user,
    );
    if (nextSession.token != null && nextSession.token!.isNotEmpty) {
      context.applyAccessToken(nextSession.token!);
    }
    context.authSession = nextSession;
    if (nextSession.realtime != null && context.realtimeAdapter != null) {
      await context.realtimeAdapter!.connect(nextSession.realtime);
    }
    return context.authSession;
  }

  Future<OpenChatAuthSession> refreshToken([String? refreshToken]) async {
    final effectiveRefreshToken =
        refreshToken ?? context.authSession.refreshToken;
    final response =
        await context.backendClient.auth.controllerRefreshToken(
      RefreshTokenDto(refreshToken: effectiveRefreshToken),
    );
    final nextSession = normalizeAuthSession(
      response,
      previousUser: context.authSession.user,
    );
    if (nextSession.token != null && nextSession.token!.isNotEmpty) {
      context.applyAccessToken(nextSession.token!);
    }
    context.authSession = context.authSession.copyWith(
      user: nextSession.user,
      token: nextSession.token,
      refreshToken: nextSession.refreshToken,
      expiresIn: nextSession.expiresIn,
      realtime: nextSession.realtime,
    );
    return context.authSession;
  }

  Future<bool> logout([String? refreshToken]) async {
    await context.backendClient.auth.controllerLogout(
      LogoutDto(
        token: context.authSession.token,
        refreshToken: refreshToken ?? context.authSession.refreshToken,
      ),
    );
    if (context.realtimeAdapter != null) {
      await context.realtimeAdapter!.disconnect();
    }
    context.authSession = const OpenChatAuthSession();
    return true;
  }

  Future<OpenChatRealtimeSession> bootstrapRealtime() async {
    final session = await context.bootstrapRealtime();
    context.authSession = context.authSession.copyWith(realtime: session);
    if (context.realtimeAdapter != null) {
      await context.realtimeAdapter!.connect(session);
    }
    return session;
  }

  Future<OpenChatRealtimeSession> connectRealtime([
    OpenChatRealtimeSession? session,
  ]) async {
    final adapter = context.requireRealtimeAdapter();
    final resolvedSession =
        session ?? context.authSession.realtime ?? adapter.getSession();
    if (resolvedSession != null) {
      final connected = await adapter.connect(resolvedSession);
      context.authSession = context.authSession.copyWith(realtime: connected);
      return connected;
    }
    return bootstrapRealtime();
  }

  Future<bool> disconnectRealtime() async {
    if (context.realtimeAdapter != null) {
      await context.realtimeAdapter!.disconnect();
    }
    return true;
  }
}
