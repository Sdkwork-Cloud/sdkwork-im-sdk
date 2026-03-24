import 'dart:convert';

import 'package:backend_sdk/backend_sdk.dart';
import 'package:backend_sdk/src/http/client.dart' as backend_http;
import 'package:backend_sdk/src/models.dart';
import 'package:http/http.dart' as http;
import 'package:openchat_wukongim_adapter/openchat_wukongim_adapter.dart';

import 'builders.dart';
import 'types.dart';

class OpenChatSdkContext {
  final SdkworkBackendClient backendClient;
  final backend_http.HttpClient? rawHttpClient;
  final OpenChatWukongimAdapter? realtimeAdapter;
  final OpenChatRealtimeBootstrapProvider? realtimeBootstrapProvider;

  OpenChatAuthSession authSession = const OpenChatAuthSession();

  OpenChatSdkContext(OpenChatImSdkOptions options)
      : backendClient = options.backendClient,
        rawHttpClient = options.rawHttpClient,
        realtimeAdapter = options.realtimeAdapter,
        realtimeBootstrapProvider = options.realtimeBootstrapProvider;

  OpenChatAuthSession applyAccessToken(String token) {
    backendClient.setAccessToken(token);
    rawHttpClient?.setAccessToken(token);
    authSession = authSession.copyWith(token: token);
    return authSession;
  }

  OpenChatWukongimAdapter requireRealtimeAdapter() {
    final adapter = realtimeAdapter;
    if (adapter == null) {
      throw StateError(
        'Realtime adapter is unavailable. Configure OpenChatWukongimAdapter.',
      );
    }
    return adapter;
  }

  backend_http.HttpClient requireRawHttpClient() {
    final client = rawHttpClient;
    if (client == null) {
      throw StateError(
        'This operation requires rawHttpClient because the generated Flutter SDK does not support DELETE request bodies.',
      );
    }
    return client;
  }

  String resolveCurrentUserId(String? userId) {
    if (userId != null && userId.trim().isNotEmpty) {
      return userId.trim();
    }
    final user = authSession.user;
    final resolved = pickString(
      user?['id'],
      user?['userId'],
      user?['uid'],
    );
    if (resolved != null) {
      return resolved;
    }
    throw StateError('Current user id is unavailable.');
  }

  ConversationEnvelope resolveConversation({
    ConversationEnvelope? conversation,
    String? toUserId,
    String? groupId,
  }) {
    if (conversation != null) {
      return ConversationEnvelope(
        type: uppercase(conversation.type ?? 'SINGLE'),
        targetId: conversation.targetId,
      );
    }
    if (groupId != null && groupId.trim().isNotEmpty) {
      return ConversationEnvelope(type: 'GROUP', targetId: groupId.trim());
    }
    if (toUserId != null && toUserId.trim().isNotEmpty) {
      return ConversationEnvelope(type: 'SINGLE', targetId: toUserId.trim());
    }
    throw ArgumentError(
      'Provide conversation, toUserId, or groupId before sending IM payloads.',
    );
  }

  Future<OpenChatSendResult> send(SendMessage payload) async {
    final normalized = OpenChatImBuilders.normalizeSendMessage(payload);
    await backendClient.messages.messageControllerSend(normalized);
    return OpenChatSendResult(accepted: true, payload: normalized);
  }

  Future<OpenChatSendResult> sendMessageEnvelope({
    required MessageEnvelope message,
    ConversationEnvelope? conversation,
    String? toUserId,
    String? groupId,
    String? uuid,
    String? replyToId,
    String? forwardFromId,
    int? clientSeq,
    String? idempotencyKey,
    Map<String, dynamic>? extra,
    bool? needReadReceipt,
  }) {
    return send(
      OpenChatImBuilders.buildSendMessage(
        conversation: resolveConversation(
          conversation: conversation,
          toUserId: toUserId,
          groupId: groupId,
        ),
        message: message,
        uuid: uuid,
        replyToId: replyToId,
        forwardFromId: forwardFromId,
        clientSeq: clientSeq,
        idempotencyKey: idempotencyKey,
        extra: extra,
        needReadReceipt: needReadReceipt,
      ),
    );
  }

  Future<OpenChatSendResult> publishEvent({
    required String type,
    String? name,
    Map<String, dynamic>? data,
    Map<String, dynamic>? metadata,
    ConversationEnvelope? conversation,
    String? toUserId,
    String? groupId,
    String? uuid,
    String? replyToId,
    String? forwardFromId,
    int? clientSeq,
    String? idempotencyKey,
    Map<String, dynamic>? extra,
    bool? needReadReceipt,
  }) {
    return send(
      OpenChatImBuilders.buildSendMessage(
        conversation: resolveConversation(
          conversation: conversation,
          toUserId: toUserId,
          groupId: groupId,
        ),
        event: OpenChatImBuilders.eventTransport(
          type: type,
          name: name,
          data: data,
          metadata: metadata,
        ),
        uuid: uuid,
        replyToId: replyToId,
        forwardFromId: forwardFromId,
        clientSeq: clientSeq,
        idempotencyKey: idempotencyKey,
        extra: extra,
        needReadReceipt: needReadReceipt,
      ),
    );
  }

  Future<OpenChatSendResult> sendRtcSignalEvent({
    required String eventName,
    required String signalType,
    required String roomId,
    String? toUserId,
    String? groupId,
    String? sessionId,
    String? correlationId,
    Map<String, dynamic>? payload,
    Map<String, dynamic>? metadata,
    String? uuid,
    String? replyToId,
    String? forwardFromId,
    int? clientSeq,
    String? idempotencyKey,
    Map<String, dynamic>? extra,
  }) {
    return publishEvent(
      type: 'RTC_SIGNAL',
      name: eventName,
      data: <String, dynamic>{
        'roomId': roomId,
        if (toUserId != null && toUserId.isNotEmpty) 'toUserId': toUserId,
        'signalType': signalType,
        if (sessionId != null && sessionId.isNotEmpty) 'sessionId': sessionId,
        if (payload != null) 'payload': payload,
      },
      metadata: <String, dynamic>{
        'namespace': 'rtc',
        'version': 1,
        'roomId': roomId,
        if (correlationId != null && correlationId.isNotEmpty)
          'correlationId': correlationId,
        ...?metadata,
      },
      toUserId: toUserId,
      groupId:
          toUserId == null || toUserId.isEmpty ? (groupId ?? roomId) : groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
    );
  }

  Future<OpenChatRealtimeSession> bootstrapRealtime() async {
    if (realtimeBootstrapProvider != null) {
      return realtimeBootstrapProvider!();
    }

    final current = authSession.realtime ?? realtimeAdapter?.getSession();
    if (current != null &&
        current.uid.isNotEmpty &&
        current.token.isNotEmpty &&
        current.wsUrl.isNotEmpty) {
      return current;
    }

    final client = requireRawHttpClient();

    final configResponse = await client.get('$imApiPrefix/wukongim/config');
    final tokenResponse = await client.post('$imApiPrefix/wukongim/token');
    final config = unwrapRecord(configResponse);
    final token = unwrapRecord(tokenResponse);
    final uid = pickString(
      config['uid'],
      authSession.user?['id'],
      authSession.user?['uid'],
    );
    final realtimeToken = pickString(token['token'], config['token']);
    final wsUrl = pickString(
      config['wsUrl'],
      config['websocketUrl'],
      config['addr'],
    );
    if (uid == null || realtimeToken == null || wsUrl == null) {
      throw StateError(
        'WukongIM bootstrap response is missing uid, token, or wsUrl.',
      );
    }

    return OpenChatRealtimeSession(
      uid: uid,
      token: realtimeToken,
      wsUrl: wsUrl,
      deviceId: pickString(config['deviceId']),
      deviceFlag: config['deviceFlag'],
      extra: <String, dynamic>{
        ...config,
        ...token,
      },
    );
  }

  Future<Object?> deleteJson(
    String path, {
    required Map<String, dynamic> body,
    Map<String, String>? headers,
  }) async {
    final client = requireRawHttpClient();
    final normalizedPath = path.startsWith('/') ? path : '/$path';
    final uri = Uri.parse('${client.baseUrl}$normalizedPath');
    final request = http.Request('DELETE', uri);
    request.headers.addAll(<String, String>{
      ...client.headers,
      ...?headers,
      'Content-Type': 'application/json',
    });
    request.body = jsonEncode(body);

    final streamed = await http.Client()
        .send(request)
        .timeout(Duration(milliseconds: client.timeout));
    final response = await http.Response.fromStream(streamed);

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception('HTTP ${response.statusCode}: ${response.body}');
    }

    if (response.body.isEmpty) {
      return null;
    }

    final contentType = response.headers['content-type'] ?? '';
    if (contentType.contains('application/json')) {
      return jsonDecode(response.body);
    }
    return response.body;
  }

  Map<String, dynamic> unwrapRecord(Object? value) {
    final record = asRecord(value);
    final data = asRecord(record?['data']);
    return data ?? record ?? <String, dynamic>{};
  }

  Map<String, dynamic>? asRecord(Object? value) {
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

  Object? readValue(Object? target, String fieldName) {
    final record = asRecord(target);
    if (record != null) {
      if (record.containsKey(fieldName)) {
        return record[fieldName];
      }
      final data = asRecord(record['data']);
      if (data != null && data.containsKey(fieldName)) {
        return data[fieldName];
      }
      return null;
    }

    final dynamic value = target;
    try {
      return value == null ? null : value[fieldName];
    } catch (_) {
      try {
        final dynamic asJson = value == null ? null : value.toJson();
        return asJson == null ? null : asJson[fieldName];
      } catch (_) {
        return null;
      }
    }
  }

  bool normalizeActionSuccess(Object? value) {
    if (value == null) {
      return true;
    }
    if (value is bool) {
      return value;
    }
    final explicit = readValue(value, 'success');
    if (explicit is bool) {
      return explicit;
    }
    return true;
  }
}
