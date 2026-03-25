import 'dart:async';

import 'package:backend_sdk/backend_sdk.dart';
import 'package:backend_sdk/src/http/client.dart' as backend_http;
import 'package:backend_sdk/src/models.dart';
import 'package:openchat_wukongim_adapter/openchat_wukongim_adapter.dart';

typedef OpenChatRealtimeBootstrapProvider =
    Future<OpenChatRealtimeSession> Function();

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

  const OpenChatSendResult({required this.accepted, required this.payload});
}

class OpenChatFriendRequestResult {
  final bool success;
  final String? requestId;

  const OpenChatFriendRequestResult({required this.success, this.requestId});
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

class OpenChatRtcConnectionRequest {
  final String? channelId;
  final String? provider;
  final String? role;
  final int? expireSeconds;
  final bool? includeRealtimeToken;

  const OpenChatRtcConnectionRequest({
    this.channelId,
    this.provider,
    this.role,
    this.expireSeconds,
    this.includeRealtimeToken,
  });

  Map<String, dynamic> toJson() {
    return <String, dynamic>{
      if (channelId != null && channelId!.trim().isNotEmpty)
        'channelId': channelId!.trim(),
      if (provider != null && provider!.trim().isNotEmpty)
        'provider': provider!.trim(),
      if (role != null && role!.trim().isNotEmpty) 'role': role!.trim(),
      if (expireSeconds != null) 'expireSeconds': expireSeconds,
      if (includeRealtimeToken != null)
        'includeRealtimeToken': includeRealtimeToken,
    };
  }

  RtcConnectionInfoRequestDto toDto() {
    return RtcConnectionInfoRequestDto(
      channelId: channelId,
      provider: provider,
      role: role,
      expireSeconds: expireSeconds?.toDouble(),
      includeRealtimeToken: includeRealtimeToken,
    );
  }
}

class OpenChatRtcConversationTarget {
  final String conversationType;
  final String targetId;

  const OpenChatRtcConversationTarget({
    required this.conversationType,
    required this.targetId,
  });

  factory OpenChatRtcConversationTarget.fromJson(Map<String, dynamic> json) {
    return OpenChatRtcConversationTarget(
      conversationType: pickString(json['conversationType']) ?? 'GROUP',
      targetId: pickString(json['targetId']) ?? '',
    );
  }

  factory OpenChatRtcConversationTarget.fromDto(
    RtcConnectionConversationTargetDto? dto,
  ) {
    return OpenChatRtcConversationTarget(
      conversationType: pickString(dto?.conversationType) ?? 'GROUP',
      targetId: pickString(dto?.targetId) ?? '',
    );
  }
}

class OpenChatRtcSignalingInfo {
  final String transport;
  final String eventType;
  final String namespace;
  final String roomId;
  final String directTargetField;
  final OpenChatRtcConversationTarget? broadcastConversation;
  final List<String> directSignalTypes;
  final List<String> broadcastSignalTypes;

  const OpenChatRtcSignalingInfo({
    required this.transport,
    required this.eventType,
    required this.namespace,
    required this.roomId,
    required this.directTargetField,
    required this.broadcastConversation,
    required this.directSignalTypes,
    required this.broadcastSignalTypes,
  });

  factory OpenChatRtcSignalingInfo.fromJson(Map<String, dynamic> json) {
    return OpenChatRtcSignalingInfo(
      transport: pickString(json['transport']) ?? 'WUKONGIM_EVENT',
      eventType: pickString(json['eventType']) ?? 'RTC_SIGNAL',
      namespace: pickString(json['namespace']) ?? 'rtc',
      roomId: pickString(json['roomId']) ?? '',
      directTargetField: pickString(json['directTargetField']) ?? 'toUserId',
      broadcastConversation:
          _asStringKeyedMap(json['broadcastConversation']) == null
          ? null
          : OpenChatRtcConversationTarget.fromJson(
              _asStringKeyedMap(json['broadcastConversation'])!,
            ),
      directSignalTypes: _asStringList(json['directSignalTypes']),
      broadcastSignalTypes: _asStringList(json['broadcastSignalTypes']),
    );
  }

  factory OpenChatRtcSignalingInfo.fromDto(RtcConnectionSignalingDto? dto) {
    return OpenChatRtcSignalingInfo(
      transport: pickString(dto?.transport) ?? 'WUKONGIM_EVENT',
      eventType: pickString(dto?.eventType) ?? 'RTC_SIGNAL',
      namespace: pickString(dto?.namespace) ?? 'rtc',
      roomId: pickString(dto?.roomId) ?? '',
      directTargetField: pickString(dto?.directTargetField) ?? 'toUserId',
      broadcastConversation: dto?.broadcastConversation == null
          ? null
          : OpenChatRtcConversationTarget.fromDto(dto?.broadcastConversation),
      directSignalTypes: dto?.directSignalTypes ?? const <String>[],
      broadcastSignalTypes: dto?.broadcastSignalTypes ?? const <String>[],
    );
  }
}

class OpenChatRtcRealtimeInfo {
  final String transport;
  final String uid;
  final String wsUrl;
  final String? token;
  final String? apiUrl;
  final String? managerUrl;
  final String? tcpAddr;

  const OpenChatRtcRealtimeInfo({
    required this.transport,
    required this.uid,
    required this.wsUrl,
    this.token,
    this.apiUrl,
    this.managerUrl,
    this.tcpAddr,
  });

  factory OpenChatRtcRealtimeInfo.fromJson(Map<String, dynamic> json) {
    return OpenChatRtcRealtimeInfo(
      transport: pickString(json['transport']) ?? 'WUKONGIM',
      uid: pickString(json['uid']) ?? '',
      wsUrl: pickString(json['wsUrl']) ?? '',
      token: pickString(json['token']),
      apiUrl: pickString(json['apiUrl']),
      managerUrl: pickString(json['managerUrl']),
      tcpAddr: pickString(json['tcpAddr']),
    );
  }

  factory OpenChatRtcRealtimeInfo.fromDto(RtcConnectionRealtimeDto? dto) {
    return OpenChatRtcRealtimeInfo(
      transport: pickString(dto?.transport) ?? 'WUKONGIM',
      uid: pickString(dto?.uid) ?? '',
      wsUrl: pickString(dto?.wsUrl) ?? '',
      token: pickString(dto?.token),
      apiUrl: pickString(dto?.apiUrl),
      managerUrl: pickString(dto?.managerUrl),
      tcpAddr: pickString(dto?.tcpAddr),
    );
  }

  OpenChatRealtimeSession? toRealtimeSession() {
    if (uid.isEmpty || wsUrl.isEmpty || token == null || token!.isEmpty) {
      return null;
    }
    return OpenChatRealtimeSession(
      uid: uid,
      token: token!,
      wsUrl: wsUrl,
      extra: <String, dynamic>{
        if (apiUrl != null) 'apiUrl': apiUrl,
        if (managerUrl != null) 'managerUrl': managerUrl,
        if (tcpAddr != null) 'tcpAddr': tcpAddr,
      },
    );
  }
}

class OpenChatRtcProviderConfig {
  final String provider;
  final String? channelId;
  final String appId;
  final String providerRoomId;
  final String businessRoomId;
  final String userId;
  final String token;
  final String? role;
  final DateTime? expiresAt;
  final String? endpoint;
  final String? region;
  final Map<String, dynamic>? extras;

  const OpenChatRtcProviderConfig({
    required this.provider,
    required this.appId,
    required this.providerRoomId,
    required this.businessRoomId,
    required this.userId,
    required this.token,
    this.channelId,
    this.role,
    this.expiresAt,
    this.endpoint,
    this.region,
    this.extras,
  });

  factory OpenChatRtcProviderConfig.fromJson(Map<String, dynamic> json) {
    return OpenChatRtcProviderConfig(
      provider: pickString(json['provider']) ?? '',
      channelId: pickString(json['channelId']),
      appId: pickString(json['appId']) ?? '',
      providerRoomId: pickString(json['providerRoomId']) ?? '',
      businessRoomId: pickString(json['businessRoomId']) ?? '',
      userId: pickString(json['userId']) ?? '',
      token: pickString(json['token']) ?? '',
      role: pickString(json['role']),
      expiresAt: _asDateTime(json['expiresAt']),
      endpoint: pickString(json['endpoint']),
      region: pickString(json['region']),
      extras: _asStringKeyedMap(json['extras']),
    );
  }

  factory OpenChatRtcProviderConfig.fromDto(
    RtcConnectionProviderConfigDto? dto,
  ) {
    return OpenChatRtcProviderConfig(
      provider: pickString(dto?.provider) ?? '',
      channelId: pickString(dto?.channelId),
      appId: pickString(dto?.appId) ?? '',
      providerRoomId: pickString(dto?.providerRoomId) ?? '',
      businessRoomId: pickString(dto?.businessRoomId) ?? '',
      userId: pickString(dto?.userId) ?? '',
      token: pickString(dto?.token) ?? '',
      role: pickString(dto?.role),
      expiresAt: _asDateTime(dto?.expiresAt),
      endpoint: pickString(dto?.endpoint),
      region: pickString(dto?.region),
      extras: _asStringKeyedMap(dto?.extras),
    );
  }
}

class OpenChatRtcConnectionInfo {
  final Map<String, dynamic>? room;
  final Map<String, dynamic>? rtcToken;
  final OpenChatRtcProviderConfig providerConfig;
  final OpenChatRtcSignalingInfo signaling;
  final OpenChatRtcRealtimeInfo realtime;

  const OpenChatRtcConnectionInfo({
    required this.room,
    required this.rtcToken,
    required this.providerConfig,
    required this.signaling,
    required this.realtime,
  });

  factory OpenChatRtcConnectionInfo.fromJson(Map<String, dynamic> json) {
    return OpenChatRtcConnectionInfo(
      room: _asStringKeyedMap(json['room']),
      rtcToken: _asStringKeyedMap(json['rtcToken']),
      providerConfig: OpenChatRtcProviderConfig.fromJson(
        _asStringKeyedMap(json['providerConfig']) ?? <String, dynamic>{},
      ),
      signaling: OpenChatRtcSignalingInfo.fromJson(
        _asStringKeyedMap(json['signaling']) ?? <String, dynamic>{},
      ),
      realtime: OpenChatRtcRealtimeInfo.fromJson(
        _asStringKeyedMap(json['realtime']) ?? <String, dynamic>{},
      ),
    );
  }

  factory OpenChatRtcConnectionInfo.fromDto(RtcConnectionInfoResponseDto dto) {
    return OpenChatRtcConnectionInfo(
      room: dto.room?.toJson(),
      rtcToken: dto.rtcToken?.toJson(),
      providerConfig: OpenChatRtcProviderConfig.fromDto(dto.providerConfig),
      signaling: OpenChatRtcSignalingInfo.fromDto(dto.signaling),
      realtime: OpenChatRtcRealtimeInfo.fromDto(dto.realtime),
    );
  }
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

Map<String, dynamic>? _asStringKeyedMap(Object? value) {
  if (value == null) {
    return null;
  }
  if (value is Map<String, dynamic>) {
    return value;
  }
  if (value is Map) {
    final normalized = <String, dynamic>{};
    value.forEach((Object? key, Object? entryValue) {
      if (key is String) {
        normalized[key] = entryValue;
      }
    });
    return normalized;
  }
  return null;
}

List<String> _asStringList(Object? value) {
  if (value is Iterable) {
    return value
        .map((item) => item?.toString() ?? '')
        .where((item) => item.isNotEmpty)
        .toList(growable: false);
  }
  return const <String>[];
}

DateTime? _asDateTime(Object? value) {
  if (value is DateTime) {
    return value;
  }
  if (value is String && value.trim().isNotEmpty) {
    return DateTime.tryParse(value.trim());
  }
  return null;
}
