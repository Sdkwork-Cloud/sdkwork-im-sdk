import 'package:openchat_wukongim_adapter/openchat_wukongim_adapter.dart';

import 'context.dart';

class OpenChatRealtimeModule {
  final OpenChatSdkContext context;

  OpenChatRealtimeModule(this.context);

  Future<OpenChatRealtimeSession> connect([
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
    throw StateError(
      'Realtime session is unavailable. Call session.bootstrapRealtime() first.',
    );
  }

  Future<bool> disconnect() async {
    if (context.realtimeAdapter != null) {
      await context.realtimeAdapter!.disconnect();
    }
    return true;
  }

  bool isConnected() => context.requireRealtimeAdapter().isConnected();

  OpenChatRealtimeSession? getSession() {
    return context.requireRealtimeAdapter().getSession() ??
        context.authSession.realtime;
  }

  OpenChatDisposer onMessage(
    void Function(OpenChatRealtimeMessageFrame frame) listener,
  ) {
    return context.requireRealtimeAdapter().onMessage(listener);
  }

  OpenChatDisposer onEvent(
    void Function(OpenChatRealtimeEventFrame frame) listener,
  ) {
    return context.requireRealtimeAdapter().onEvent(listener);
  }

  OpenChatDisposer onRaw(
    void Function(OpenChatRealtimeFrame frame) listener,
  ) {
    return context.requireRealtimeAdapter().onRaw(listener);
  }

  OpenChatDisposer onConnectionStateChange(
    void Function(OpenChatConnectionState state) listener,
  ) {
    return context.requireRealtimeAdapter().onConnectionStateChange(listener);
  }
}
