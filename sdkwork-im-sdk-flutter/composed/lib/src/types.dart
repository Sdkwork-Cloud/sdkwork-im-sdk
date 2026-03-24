import 'dart:async';

import 'package:backend_sdk/backend_sdk.dart';
import 'package:backend_sdk/src/http/client.dart' as backend_http;
import 'package:backend_sdk/src/models.dart';
import 'package:openchat_wukongim_adapter/openchat_wukongim_adapter.dart';

typedef OpenChatRealtimeBootstrapProvider = Future<OpenChatRealtimeSession>
    Function();

class OpenChatAuthSession {
  final Map<String, dynamic>? user;
  final String? token;
  final String? refreshToken;
  final num? expiresIn;
  final OpenChatRealtimeSession? realtime;

  const OpenChatAuthSession({
    this.user,
    this.token,
    this.refreshToken,
    this.expiresIn,
    this.realtime,
  });

  OpenChatAuthSession copyWith({
    Map<String, dynamic>? user,
    String? token,
    String? refreshToken,
    num? expiresIn,
    OpenChatRealtimeSession? realtime,
    bool clearRealtime = false,
  }) {
    return OpenChatAuthSession(
      user: user ?? this.user,
      token: token ?? this.token,
      refreshToken: refreshToken ?? this.refreshToken,
      expiresIn: expiresIn ?? this.expiresIn,
      realtime: clearRealtime ? null : (realtime ?? this.realtime),
    );
  }
}

class OpenChatSendResult {
  final bool accepted;
  final SendMessage payload;

  const OpenChatSendResult({
    required this.accepted,
    required this.payload,
  });
}

class OpenChatFriendRequestResult {
  final bool success;
  final String? requestId;

  const OpenChatFriendRequestResult({
    required this.success,
    this.requestId,
  });
}

class OpenChatImSdkOptions {
  final SdkworkBackendClient backendClient;
  final backend_http.HttpClient? rawHttpClient;
  final OpenChatWukongimAdapter? realtimeAdapter;
  final OpenChatRealtimeBootstrapProvider? realtimeBootstrapProvider;

  const OpenChatImSdkOptions({
    required this.backendClient,
    this.rawHttpClient,
    this.realtimeAdapter,
    this.realtimeBootstrapProvider,
  });
}

OpenChatAuthSession normalizeAuthSession(
  AuthResponseDto? response, {
  Map<String, dynamic>? previousUser,
}) {
  final user = response?.user ?? previousUser;
  final imConfig = response?.imConfig;
  OpenChatRealtimeSession? realtime;
  final realtimeUid = pickString(imConfig?.uid, user?['id'], user?['uid']);
  if (realtimeUid != null &&
      pickString(imConfig?.token) != null &&
      pickString(imConfig?.wsUrl) != null) {
    realtime = OpenChatRealtimeSession(
      uid: realtimeUid,
      token: imConfig!.token!,
      wsUrl: imConfig.wsUrl!,
    );
  }
  return OpenChatAuthSession(
    user: user,
    token: response?.token,
    refreshToken: response?.refreshToken,
    expiresIn: response?.expiresIn,
    realtime: realtime,
  );
}

String? pickString(Object? first, [Object? second, Object? third]) {
  for (final candidate in <Object?>[first, second, third]) {
    if (candidate is String && candidate.trim().isNotEmpty) {
      return candidate.trim();
    }
  }
  return null;
}

String uppercase(String value) => value.trim().toUpperCase();

const int transportVersion = 2;
const String imApiPrefix = '/im/v3';
