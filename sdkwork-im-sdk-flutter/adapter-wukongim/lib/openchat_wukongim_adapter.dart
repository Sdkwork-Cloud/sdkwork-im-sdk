library openchat_wukongim_adapter;

import 'dart:async';
import 'dart:convert';

import 'package:wukongimfluttersdk/common/options.dart';
import 'package:wukongimfluttersdk/entity/msg.dart';
import 'package:wukongimfluttersdk/type/const.dart';
import 'package:wukongimfluttersdk/wkim.dart';

typedef OpenChatDisposer = void Function();

enum OpenChatConnectionState {
  idle,
  connecting,
  connected,
  disconnected,
  error,
}

class OpenChatConversationEnvelope {
  final String? type;
  final String? targetId;

  const OpenChatConversationEnvelope({
    this.type,
    this.targetId,
  });
}

class OpenChatMessageEnvelope {
  final String? type;
  final Map<String, dynamic>? text;
  final Map<String, dynamic>? image;
  final Map<String, dynamic>? audio;
  final Map<String, dynamic>? video;
  final Map<String, dynamic>? file;
  final Map<String, dynamic>? location;
  final Map<String, dynamic>? card;
  final Map<String, dynamic>? custom;
  final Map<String, dynamic>? system;
  final Map<String, dynamic>? music;
  final Map<String, dynamic>? document;
  final Map<String, dynamic>? code;
  final Map<String, dynamic>? ppt;
  final Map<String, dynamic>? character;
  final Map<String, dynamic>? model3d;

  const OpenChatMessageEnvelope({
    this.type,
    this.text,
    this.image,
    this.audio,
    this.video,
    this.file,
    this.location,
    this.card,
    this.custom,
    this.system,
    this.music,
    this.document,
    this.code,
    this.ppt,
    this.character,
    this.model3d,
  });
}

class OpenChatEventTransport {
  final String type;
  final String? name;
  final Map<String, dynamic>? data;
  final Map<String, dynamic>? metadata;

  const OpenChatEventTransport({
    required this.type,
    this.name,
    this.data,
    this.metadata,
  });
}

class OpenChatRealtimeSession {
  final String uid;
  final String token;
  final String wsUrl;
  final String? deviceId;
  final Object? deviceFlag;
  final Map<String, dynamic> extra;

  const OpenChatRealtimeSession({
    required this.uid,
    required this.token,
    required this.wsUrl,
    this.deviceId,
    this.deviceFlag,
    this.extra = const {},
  });

  OpenChatRealtimeSession copyWith({
    String? uid,
    String? token,
    String? wsUrl,
    String? deviceId,
    Object? deviceFlag = _openChatNoValue,
    Map<String, dynamic>? extra,
  }) {
    return OpenChatRealtimeSession(
      uid: uid ?? this.uid,
      token: token ?? this.token,
      wsUrl: wsUrl ?? this.wsUrl,
      deviceId: deviceId ?? this.deviceId,
      deviceFlag:
          identical(deviceFlag, _openChatNoValue) ? this.deviceFlag : deviceFlag,
      extra: extra ?? this.extra,
    );
  }
}

abstract class OpenChatRealtimeFrame {
  String? get messageId;
  OpenChatConversationEnvelope? get conversation;
  String? get senderId;
  String? get channelId;
  int? get timestamp;
  Map<String, dynamic> get raw;
}

class OpenChatRealtimeMessageFrame implements OpenChatRealtimeFrame {
  @override
  final String? messageId;
  @override
  final OpenChatConversationEnvelope? conversation;
  final OpenChatMessageEnvelope message;
  @override
  final String? senderId;
  @override
  final String? channelId;
  @override
  final int? timestamp;
  @override
  final Map<String, dynamic> raw;

  const OpenChatRealtimeMessageFrame({
    this.messageId,
    this.conversation,
    required this.message,
    this.senderId,
    this.channelId,
    this.timestamp,
    required this.raw,
  });
}

class OpenChatRealtimeEventFrame implements OpenChatRealtimeFrame {
  @override
  final String? messageId;
  @override
  final OpenChatConversationEnvelope? conversation;
  final OpenChatEventTransport event;
  @override
  final String? senderId;
  @override
  final String? channelId;
  @override
  final int? timestamp;
  @override
  final Map<String, dynamic> raw;

  const OpenChatRealtimeEventFrame({
    this.messageId,
    this.conversation,
    required this.event,
    this.senderId,
    this.channelId,
    this.timestamp,
    required this.raw,
  });
}

abstract class OpenChatWukongimRuntime {
  Future<void> connect(OpenChatRealtimeSession session);
  Future<void> disconnect();
  void addMessageListener(void Function(Object? payload) listener);
  void removeMessageListener(void Function(Object? payload) listener);
  void addConnectionListener(
    void Function(int status, int? reasonCode, Object? info) listener,
  );
  void removeConnectionListener(
    void Function(int status, int? reasonCode, Object? info) listener,
  );
}

class OpenChatWukongimAdapterConfig {
  final OpenChatWukongimRuntime? runtime;
  final FutureOr<OpenChatWukongimRuntime> Function()? runtimeFactory;
  final OpenChatRealtimeSession? session;

  const OpenChatWukongimAdapterConfig({
    this.runtime,
    this.runtimeFactory,
    this.session,
  });
}

class OpenChatFlutterWukongimRuntime implements OpenChatWukongimRuntime {
  final String _listenerKey =
      'openchat_im_sdk_runtime_${DateTime.now().microsecondsSinceEpoch}';

  final Set<void Function(Object? payload)> _messageListeners =
      <void Function(Object? payload)>{};
  final Set<void Function(int status, int? reasonCode, Object? info)>
      _connectionListeners =
      <void Function(int status, int? reasonCode, Object? info)>{};

  bool _listenersBound = false;

  @override
  Future<void> connect(OpenChatRealtimeSession session) async {
    final options = Options.newDefault(
      session.uid,
      session.token,
      addr: _normalizeAddress(session.wsUrl),
    );
    options.getAddr = (Function(String addr) complete) async {
      complete(_normalizeAddress(session.wsUrl));
    };

    final deviceFlag = _asInt(session.deviceFlag);
    if (deviceFlag != null) {
      options.deviceFlag = deviceFlag;
    }

    final setupResult = await WKIM.shared.setup(options);
    if (!setupResult) {
      throw StateError('Failed to initialize wukongimfluttersdk runtime.');
    }

    _bindListeners();
    WKIM.shared.connectionManager.connect();
  }

  @override
  Future<void> disconnect() async {
    _unbindListeners();
    WKIM.shared.connectionManager.disconnect(false);
  }

  @override
  void addMessageListener(void Function(Object? payload) listener) {
    _messageListeners.add(listener);
  }

  @override
  void removeMessageListener(void Function(Object? payload) listener) {
    _messageListeners.remove(listener);
  }

  @override
  void addConnectionListener(
    void Function(int status, int? reasonCode, Object? info) listener,
  ) {
    _connectionListeners.add(listener);
  }

  @override
  void removeConnectionListener(
    void Function(int status, int? reasonCode, Object? info) listener,
  ) {
    _connectionListeners.remove(listener);
  }

  void _bindListeners() {
    if (_listenersBound) {
      return;
    }
    WKIM.shared.connectionManager.addOnConnectionStatus(
      _listenerKey,
      _emitConnection,
    );
    WKIM.shared.messageManager.addOnNewMsgListener(_listenerKey, _emitMessages);
    _listenersBound = true;
  }

  void _unbindListeners() {
    if (!_listenersBound) {
      return;
    }
    WKIM.shared.connectionManager.removeOnConnectionStatus(_listenerKey);
    WKIM.shared.messageManager.removeNewMsgListener(_listenerKey);
    _listenersBound = false;
  }

  void _emitMessages(List<WKMsg> messages) {
    for (final message in messages) {
      for (final listener in _messageListeners) {
        listener(message);
      }
    }
  }

  void _emitConnection(int status, int? reasonCode, Object? info) {
    for (final listener in _connectionListeners) {
      listener(status, reasonCode, info);
    }
  }

  static String _normalizeAddress(String wsUrl) {
    final trimmed = wsUrl.trim();
    final uri = Uri.tryParse(trimmed);
    if (uri != null && uri.host.isNotEmpty) {
      final port = uri.hasPort
          ? uri.port
          : (uri.scheme.toLowerCase() == 'wss' ? 443 : 80);
      return '${uri.host}:$port';
    }
    if (trimmed.contains('://')) {
      return trimmed.split('://').last.split('/').first;
    }
    return trimmed.split('/').first;
  }

  static int? _asInt(Object? value) {
    if (value is int) {
      return value;
    }
    if (value is num) {
      return value.toInt();
    }
    if (value is String) {
      return int.tryParse(value);
    }
    return null;
  }
}

class OpenChatWukongimAdapter {
  final OpenChatWukongimAdapterConfig config;

  OpenChatWukongimRuntime? _runtime;
  OpenChatRealtimeSession? _session;
  OpenChatConnectionState _state = OpenChatConnectionState.idle;

  final Set<void Function(OpenChatRealtimeMessageFrame frame)> _messageListeners =
      <void Function(OpenChatRealtimeMessageFrame frame)>{};
  final Set<void Function(OpenChatRealtimeEventFrame frame)> _eventListeners =
      <void Function(OpenChatRealtimeEventFrame frame)>{};
  final Set<void Function(OpenChatRealtimeFrame frame)> _rawListeners =
      <void Function(OpenChatRealtimeFrame frame)>{};
  final Set<void Function(OpenChatConnectionState state)> _stateListeners =
      <void Function(OpenChatConnectionState state)>{};

  late final void Function(Object? payload) _runtimeMessageListener =
      _handleRuntimeMessage;
  late final void Function(int status, int? reasonCode, Object? info)
      _runtimeConnectionListener = _handleRuntimeConnection;

  OpenChatWukongimAdapter({
    OpenChatWukongimAdapterConfig config =
        const OpenChatWukongimAdapterConfig(),
  }) : config = config {
    _session = config.session;
  }

  OpenChatWukongimAdapterConfig getConfig() => config;

  OpenChatConnectionState get connectionState => _state;

  OpenChatRealtimeSession? getSession() => _session;

  bool isConnected() => _state == OpenChatConnectionState.connected;

  Future<OpenChatRealtimeSession> connect([
    OpenChatRealtimeSession? session,
  ]) async {
    final nextSession = session ?? _session ?? config.session;
    if (nextSession == null) {
      throw StateError(
        'Realtime session is required before connecting to WuKongIM.',
      );
    }

    _setState(OpenChatConnectionState.connecting);
    _runtime = await _resolveRuntime();
    _runtime!.removeMessageListener(_runtimeMessageListener);
    _runtime!.removeConnectionListener(_runtimeConnectionListener);
    _runtime!.addMessageListener(_runtimeMessageListener);
    _runtime!.addConnectionListener(_runtimeConnectionListener);

    _session = nextSession;
    await _runtime!.connect(nextSession);
    return nextSession;
  }

  Future<void> disconnect() async {
    await _runtime?.disconnect();
    _setState(OpenChatConnectionState.disconnected);
  }

  OpenChatDisposer onMessage(
    void Function(OpenChatRealtimeMessageFrame frame) listener,
  ) {
    _messageListeners.add(listener);
    return () => _messageListeners.remove(listener);
  }

  OpenChatDisposer onEvent(
    void Function(OpenChatRealtimeEventFrame frame) listener,
  ) {
    _eventListeners.add(listener);
    return () => _eventListeners.remove(listener);
  }

  OpenChatDisposer onRaw(
    void Function(OpenChatRealtimeFrame frame) listener,
  ) {
    _rawListeners.add(listener);
    return () => _rawListeners.remove(listener);
  }

  OpenChatDisposer onConnectionStateChange(
    void Function(OpenChatConnectionState state) listener,
  ) {
    _stateListeners.add(listener);
    return () => _stateListeners.remove(listener);
  }

  Future<OpenChatWukongimRuntime> _resolveRuntime() async {
    if (config.runtime != null) {
      return config.runtime!;
    }
    if (config.runtimeFactory != null) {
      return await config.runtimeFactory!();
    }
    return OpenChatFlutterWukongimRuntime();
  }

  void _handleRuntimeMessage(Object? payload) {
    final frame = _normalizeRealtimeFrame(payload);
    if (frame == null) {
      return;
    }

    for (final listener in _rawListeners) {
      listener(frame);
    }

    if (frame is OpenChatRealtimeMessageFrame) {
      for (final listener in _messageListeners) {
        listener(frame);
      }
      return;
    }

    if (frame is OpenChatRealtimeEventFrame) {
      for (final listener in _eventListeners) {
        listener(frame);
      }
    }
  }

  void _handleRuntimeConnection(int status, int? reasonCode, Object? info) {
    switch (status) {
      case WKConnectStatus.connecting:
      case WKConnectStatus.syncMsg:
        _setState(OpenChatConnectionState.connecting);
        return;
      case WKConnectStatus.success:
      case WKConnectStatus.syncCompleted:
        _setState(OpenChatConnectionState.connected);
        return;
      case WKConnectStatus.noNetwork:
      case WKConnectStatus.kicked:
        _setState(OpenChatConnectionState.disconnected);
        return;
      case WKConnectStatus.fail:
      default:
        _setState(OpenChatConnectionState.error);
        return;
    }
  }

  void _setState(OpenChatConnectionState nextState) {
    if (_state == nextState) {
      return;
    }
    _state = nextState;
    for (final listener in _stateListeners) {
      listener(nextState);
    }
  }

  static OpenChatRealtimeFrame? _normalizeRealtimeFrame(Object? payload) {
    final raw = _normalizeRawPayload(payload);
    if (raw == null) {
      return null;
    }

    final transport = _findTransport(raw);
    final conversation = _normalizeConversation(
      transport?['conversation'],
      raw,
    );
    final base = _OpenChatRealtimeFrameBase(
      messageId: _pickString(raw['messageId'], raw['messageID'], raw['id']),
      conversation: conversation,
      senderId: _pickString(
        raw['senderId'],
        raw['fromUid'],
        raw['fromUID'],
        raw['fromUserId'],
      ),
      channelId: _pickString(raw['channelId'], raw['channelID']),
      timestamp: _pickInt(raw['timestamp'], raw['createdAt']),
      raw: raw,
    );

    final messageCandidate = transport == null
        ? null
        : (transport.containsKey('message')
            ? transport['message']
            : (transport.containsKey('event') ? null : transport));
    final message = _normalizeMessageEnvelope(messageCandidate, raw);
    if (message != null) {
      return OpenChatRealtimeMessageFrame(
        messageId: base.messageId,
        conversation: base.conversation,
        message: message,
        senderId: base.senderId,
        channelId: base.channelId,
        timestamp: base.timestamp,
        raw: raw,
      );
    }

    final event = _normalizeEventTransport(transport?['event']);
    if (event != null) {
      return OpenChatRealtimeEventFrame(
        messageId: base.messageId,
        conversation: base.conversation,
        event: event,
        senderId: base.senderId,
        channelId: base.channelId,
        timestamp: base.timestamp,
        raw: raw,
      );
    }

    return null;
  }

  static Map<String, dynamic>? _normalizeRawPayload(Object? payload) {
    if (payload is WKMsg) {
      final raw = <String, dynamic>{
        'messageId': payload.messageID,
        'messageSeq': payload.messageSeq,
        'clientMsgNo': payload.clientMsgNO,
        'senderId': payload.fromUID,
        'fromUid': payload.fromUID,
        'channelId': payload.channelID,
        'channelType': payload.channelType,
        'timestamp': payload.timestamp,
        'contentType': payload.contentType,
        'content': payload.content,
      };
      final parsedContent = _asMap(payload.content);
      if (parsedContent != null) {
        raw['payload'] = parsedContent;
      }
      return raw;
    }

    return _asMap(payload);
  }

  static Map<String, dynamic>? _findTransport(Map<String, dynamic> raw) {
    final candidates = <Object?>[
      raw,
      raw['content'],
      raw['payload'],
      raw['data'],
      raw['message'],
      raw['body'],
    ];

    for (final candidate in candidates) {
      final record = _asMap(candidate);
      if (record == null) {
        continue;
      }
      if (record['conversation'] != null &&
          (record['message'] != null || record['event'] != null)) {
        return record;
      }
      final nestedContent = _asMap(record['content']);
      if (nestedContent != null &&
          nestedContent['conversation'] != null &&
          (nestedContent['message'] != null || nestedContent['event'] != null)) {
        return nestedContent;
      }
    }

    return raw['payload'] is Map<String, dynamic>
        ? raw['payload'] as Map<String, dynamic>
        : null;
  }

  static OpenChatConversationEnvelope? _normalizeConversation(
    Object? value,
    Map<String, dynamic> raw,
  ) {
    final record = _asMap(value);
    if (record != null) {
      return OpenChatConversationEnvelope(
        type: _uppercase(_pickString(record['type'])) ?? 'SINGLE',
        targetId: _pickString(
          record['targetId'],
          record['channelId'],
          raw['channelId'],
          raw['channelID'],
        ),
      );
    }

    final targetId = _pickString(raw['channelId'], raw['channelID']);
    if (targetId == null || targetId.isEmpty) {
      return null;
    }

    final channelType = _pickInt(raw['channelType'], raw['channel_type']);
    return OpenChatConversationEnvelope(
      type: channelType == WKChannelType.group ? 'GROUP' : 'SINGLE',
      targetId: targetId,
    );
  }

  static OpenChatMessageEnvelope? _normalizeMessageEnvelope(
    Object? value,
    Map<String, dynamic> raw,
  ) {
    final record = _asMap(value);
    final fallbackType = _messageTypeFromRaw(raw);
    if (record == null && fallbackType == null) {
      return null;
    }

    final type = _uppercase(_pickString(record?['type'])) ?? fallbackType;
    if (type == null) {
      return null;
    }

    final normalized = <String, dynamic>{
      'type': type,
    };

    for (final key in _messageResourceKeys) {
      final resource = _asMap(record?[key]);
      if (resource != null) {
        normalized[key] = resource;
      }
    }

    if (_isTextType(type) && normalized['text'] == null) {
      final textResource = _normalizeTextResource(record ?? raw);
      if (textResource != null) {
        normalized['text'] = textResource;
      }
    }

    if (normalized[_resourceKeyForType(type)] == null && record != null) {
      normalized[_resourceKeyForType(type)] = Map<String, dynamic>.from(record);
    }

    return OpenChatMessageEnvelope(
      type: type,
      text: _mapValue(normalized['text']),
      image: _mapValue(normalized['image']),
      audio: _mapValue(normalized['audio']),
      video: _mapValue(normalized['video']),
      file: _mapValue(normalized['file']),
      location: _mapValue(normalized['location']),
      card: _mapValue(normalized['card']),
      custom: _mapValue(normalized['custom']),
      system: _mapValue(normalized['system']),
      music: _mapValue(normalized['music']),
      document: _mapValue(normalized['document']),
      code: _mapValue(normalized['code']),
      ppt: _mapValue(normalized['ppt']),
      character: _mapValue(normalized['character']),
      model3d: _mapValue(normalized['model3d']),
    );
  }

  static OpenChatEventTransport? _normalizeEventTransport(Object? value) {
    final record = _asMap(value);
    final type = _pickString(record?['type']);
    if (record == null || type == null || type.isEmpty) {
      return null;
    }

    return OpenChatEventTransport(
      type: type,
      name: _pickString(record['name']),
      data: _asMap(record['data']),
      metadata: _asMap(record['metadata']),
    );
  }

  static Map<String, dynamic>? _normalizeTextResource(
    Map<String, dynamic> record,
  ) {
    final text = _pickString(
      record['text'],
      record['content'],
      record['displayText'],
    );
    if (text == null || text.isEmpty) {
      return null;
    }

    final mentions = record['mentions'];
    final annotations = _asMap(record['annotations']);
    return <String, dynamic>{
      'text': text,
      if (mentions is List)
        'mentions': mentions.whereType<String>().toList(growable: false),
      if (annotations != null) 'annotations': annotations,
    };
  }

  static String? _messageTypeFromRaw(Map<String, dynamic> raw) {
    final explicit = _uppercase(_pickString(raw['type']));
    if (explicit != null) {
      return explicit;
    }

    final contentType = _pickInt(raw['contentType'], raw['type']);
    switch (contentType) {
      case WkMessageContentType.text:
        return 'TEXT';
      case WkMessageContentType.image:
        return 'IMAGE';
      case WkMessageContentType.voice:
        return 'AUDIO';
      case WkMessageContentType.video:
        return 'VIDEO';
      case WkMessageContentType.file:
        return 'FILE';
      case WkMessageContentType.location:
        return 'LOCATION';
      case WkMessageContentType.card:
        return 'CARD';
      default:
        return null;
    }
  }

  static bool _isTextType(String type) => type == 'TEXT';

  static String _resourceKeyForType(String type) {
    switch (type) {
      case 'TEXT':
        return 'text';
      case 'IMAGE':
        return 'image';
      case 'AUDIO':
        return 'audio';
      case 'VIDEO':
        return 'video';
      case 'FILE':
        return 'file';
      case 'LOCATION':
        return 'location';
      case 'CARD':
        return 'card';
      case 'CUSTOM':
        return 'custom';
      case 'SYSTEM':
        return 'system';
      case 'MUSIC':
        return 'music';
      case 'DOCUMENT':
        return 'document';
      case 'CODE':
        return 'code';
      case 'PPT':
        return 'ppt';
      case 'CHARACTER':
        return 'character';
      case 'MODEL_3D':
        return 'model3d';
      default:
        return 'custom';
    }
  }

  static Map<String, dynamic>? _mapValue(Object? value) {
    return value is Map<String, dynamic> ? value : null;
  }

  static Map<String, dynamic>? _asMap(Object? value) {
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
    if (value is String) {
      final trimmed = value.trim();
      if (trimmed.isEmpty) {
        return null;
      }
      try {
        final decoded = jsonDecode(trimmed);
        return _asMap(decoded);
      } catch (_) {
        return null;
      }
    }
    return null;
  }

  static String? _pickString(Object? first, [Object? second, Object? third, Object? fourth]) {
    for (final candidate in <Object?>[first, second, third, fourth]) {
      if (candidate is String && candidate.trim().isNotEmpty) {
        return candidate.trim();
      }
    }
    return null;
  }

  static int? _pickInt(Object? first, [Object? second]) {
    for (final candidate in <Object?>[first, second]) {
      if (candidate is int) {
        return candidate;
      }
      if (candidate is num) {
        return candidate.toInt();
      }
      if (candidate is String && candidate.trim().isNotEmpty) {
        final parsed = int.tryParse(candidate.trim());
        if (parsed != null) {
          return parsed;
        }
      }
    }
    return null;
  }

  static String? _uppercase(String? value) {
    if (value == null || value.trim().isEmpty) {
      return null;
    }
    return value.trim().toUpperCase();
  }
}

class WukongImAdapter extends OpenChatWukongimAdapter {
  WukongImAdapter({
    OpenChatWukongimAdapterConfig config =
        const OpenChatWukongimAdapterConfig(),
  }) : super(config: config);
}

class _OpenChatRealtimeFrameBase {
  final String? messageId;
  final OpenChatConversationEnvelope? conversation;
  final String? senderId;
  final String? channelId;
  final int? timestamp;
  final Map<String, dynamic> raw;

  const _OpenChatRealtimeFrameBase({
    required this.messageId,
    required this.conversation,
    required this.senderId,
    required this.channelId,
    required this.timestamp,
    required this.raw,
  });
}

const Object _openChatNoValue = Object();

const List<String> _messageResourceKeys = <String>[
  'text',
  'image',
  'audio',
  'video',
  'file',
  'location',
  'card',
  'custom',
  'system',
  'music',
  'document',
  'code',
  'ppt',
  'character',
  'model3d',
];
