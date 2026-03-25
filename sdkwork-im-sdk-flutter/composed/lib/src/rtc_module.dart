import 'package:backend_sdk/src/models.dart';
import 'package:openchat_wukongim_adapter/openchat_wukongim_adapter.dart';

import 'context.dart';
import 'types.dart';

class OpenChatRtcModule {
  late final OpenChatRtcConnectionModule connection;
  late final OpenChatRtcRoomsModule rooms;
  late final OpenChatRtcTokensModule tokens;
  late final OpenChatRtcParticipantsModule participants;
  late final OpenChatRtcProvidersModule providers;
  late final OpenChatRtcRecordsModule records;
  late final OpenChatRtcSignalingModule signaling;

  OpenChatRtcModule(OpenChatSdkContext context) {
    connection = OpenChatRtcConnectionModule(context);
    rooms = OpenChatRtcRoomsModule(context);
    tokens = OpenChatRtcTokensModule(context);
    participants = OpenChatRtcParticipantsModule(context);
    providers = OpenChatRtcProvidersModule(context);
    records = OpenChatRtcRecordsModule(context);
    signaling = OpenChatRtcSignalingModule(context);
  }
}

class OpenChatRtcConnectionModule {
  final OpenChatSdkContext context;

  OpenChatRtcConnectionModule(this.context);

  Future<OpenChatRtcConnectionInfo> get(
    String roomId, {
    OpenChatRtcConnectionRequest? request,
  }) async {
    final response = await context.backendClient.rtc
        .appControllerGetConnectionInfo(
          roomId,
          request?.toDto() ?? RtcConnectionInfoRequestDto(),
        );
    if (response == null) {
      throw StateError('RTC connection info is unavailable for room: $roomId');
    }
    return OpenChatRtcConnectionInfo.fromDto(response);
  }

  Future<OpenChatRtcConnectionInfo> prepareCall(
    String roomId, {
    OpenChatRtcConnectionRequest? request,
    bool applyRealtimeSession = true,
  }) async {
    final info = await get(roomId, request: request);
    if (applyRealtimeSession) {
      final session = info.realtime.toRealtimeSession();
      if (session != null) {
        context.authSession = context.authSession.copyWith(realtime: session);
      }
    }
    return info;
  }
}

class OpenChatRtcRoomsModule {
  final OpenChatSdkContext context;

  OpenChatRtcRoomsModule(this.context);

  Future<RTCRoom?> create(CreateRtcRoomDto payload) {
    return context.backendClient.rtc.appControllerCreateRoom(payload);
  }

  Future<bool> end(String roomId) async {
    final dynamic response = await context.backendClient.rtc
        .appControllerEndRoom(roomId);
    return context.normalizeActionSuccess(response);
  }

  Future<RTCRoom?> get(String roomId) {
    return context.backendClient.rtc.appControllerGetRoomById(roomId);
  }

  Future<Object?> listByUser([String? userId]) {
    return context.backendClient.rtc.appControllerGetRoomsByUserId(
      context.resolveCurrentUserId(userId),
    );
  }
}

class OpenChatRtcTokensModule {
  final OpenChatSdkContext context;

  OpenChatRtcTokensModule(this.context);

  Future<RTCToken?> create(GenerateRtcTokenDto payload) {
    return context.backendClient.rtc.appControllerGenerateToken(payload);
  }

  Future<RtcTokenValidationResultDto?> validate(String token) {
    return context.backendClient.rtc.appControllerValidateToken(
      ValidateRtcTokenDto(token: token),
    );
  }
}

class OpenChatRtcParticipantsModule {
  final OpenChatSdkContext context;

  OpenChatRtcParticipantsModule(this.context);

  Future<bool> add(String roomId, String userId) async {
    final dynamic response = await context.backendClient.rtc
        .appControllerAddParticipant(
          roomId,
          AddRtcParticipantDto(userId: userId),
        );
    return context.normalizeActionSuccess(response);
  }

  Future<bool> remove(String roomId, String userId) async {
    final dynamic response = await context.backendClient.rtc
        .appControllerRemoveParticipant(roomId, userId);
    return context.normalizeActionSuccess(response);
  }
}

class OpenChatRtcProvidersModule {
  final OpenChatSdkContext context;

  OpenChatRtcProvidersModule(this.context);

  Future<RtcProviderCapabilitiesResponseDto?> capabilities() {
    return context.backendClient.rtc.appControllerGetProviderCapabilities();
  }
}

class OpenChatRtcRecordsModule {
  final OpenChatSdkContext context;

  OpenChatRtcRecordsModule(this.context);

  Future<Object?> startRoomRecording(
    String roomId, [
    StartRtcRecordingDto? payload,
  ]) {
    return context.backendClient.rtc.appControllerStartRoomRecording(
      roomId,
      payload ?? StartRtcRecordingDto(),
    );
  }

  Future<Object?> stopRoomRecording(
    String roomId, [
    StopRtcRecordingDto? payload,
  ]) {
    return context.backendClient.rtc.appControllerStopRoomRecording(
      roomId,
      payload ?? StopRtcRecordingDto(),
    );
  }

  Future<Object?> create(CreateRtcVideoRecordDto payload) {
    return context.backendClient.rtc.appControllerCreateVideoRecord(payload);
  }

  Future<Object?> list([Map<String, dynamic>? params]) {
    return context.backendClient.rtc.appControllerGetVideoRecords(params);
  }

  Future<Object?> get(String recordId) {
    return context.backendClient.rtc.appControllerGetVideoRecord(recordId);
  }

  Future<bool> delete(String recordId) async {
    final dynamic response = await context.backendClient.rtc
        .appControllerDeleteVideoRecord(recordId);
    return context.normalizeActionSuccess(response);
  }

  Future<Object?> listByRoom(String roomId) {
    return context.backendClient.rtc.appControllerGetVideoRecordsByRoomId(
      roomId,
    );
  }

  Future<Object?> listByUser([String? userId]) {
    return context.backendClient.rtc.appControllerGetVideoRecordsByUserId(
      context.resolveCurrentUserId(userId),
    );
  }

  Future<Object?> updateStatus(
    String recordId,
    UpdateRtcVideoRecordStatusDto payload,
  ) {
    return context.backendClient.rtc.appControllerUpdateVideoRecordStatus(
      recordId,
      payload,
    );
  }

  Future<Object?> updateMetadata(
    String recordId,
    UpdateRtcVideoRecordMetadataDto payload,
  ) {
    return context.backendClient.rtc.appControllerUpdateVideoRecordMetadata(
      recordId,
      payload,
    );
  }

  Future<Object?> sync(String recordId, SyncRtcVideoRecordDto payload) {
    return context.backendClient.rtc.appControllerSyncVideoRecord(
      recordId,
      payload,
    );
  }
}

class OpenChatRtcSignalingModule {
  final OpenChatSdkContext context;

  OpenChatRtcSignalingModule(this.context);

  Future<OpenChatSendResult> sendJoin({
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
    return context.sendRtcSignalEvent(
      eventName: 'rtc.join',
      signalType: 'join',
      roomId: roomId,
      toUserId: toUserId,
      groupId: groupId,
      sessionId: sessionId,
      correlationId: correlationId,
      payload: payload,
      metadata: metadata,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
    );
  }

  Future<OpenChatSendResult> sendLeave({
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
    return context.sendRtcSignalEvent(
      eventName: 'rtc.leave',
      signalType: 'leave',
      roomId: roomId,
      toUserId: toUserId,
      groupId: groupId,
      sessionId: sessionId,
      correlationId: correlationId,
      payload: payload,
      metadata: metadata,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
    );
  }

  Future<OpenChatSendResult> sendPublish({
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
    return context.sendRtcSignalEvent(
      eventName: 'rtc.publish',
      signalType: 'publish',
      roomId: roomId,
      toUserId: toUserId,
      groupId: groupId,
      sessionId: sessionId,
      correlationId: correlationId,
      payload: payload,
      metadata: metadata,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
    );
  }

  Future<OpenChatSendResult> sendUnpublish({
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
    return context.sendRtcSignalEvent(
      eventName: 'rtc.unpublish',
      signalType: 'unpublish',
      roomId: roomId,
      toUserId: toUserId,
      groupId: groupId,
      sessionId: sessionId,
      correlationId: correlationId,
      payload: payload,
      metadata: metadata,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
    );
  }

  Future<OpenChatSendResult> sendOffer({
    required String roomId,
    required String toUserId,
    required String sdp,
    String? sessionId,
    String? correlationId,
    Map<String, dynamic>? metadata,
    String? uuid,
    String? replyToId,
    String? forwardFromId,
    int? clientSeq,
    String? idempotencyKey,
    Map<String, dynamic>? extra,
  }) {
    return context.sendRtcSignalEvent(
      eventName: 'rtc.offer',
      signalType: 'offer',
      roomId: roomId,
      toUserId: toUserId,
      sessionId: sessionId,
      correlationId: correlationId,
      payload: <String, dynamic>{'sdp': sdp},
      metadata: metadata,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
    );
  }

  Future<OpenChatSendResult> sendAnswer({
    required String roomId,
    required String toUserId,
    required String sdp,
    String? sessionId,
    String? correlationId,
    Map<String, dynamic>? metadata,
    String? uuid,
    String? replyToId,
    String? forwardFromId,
    int? clientSeq,
    String? idempotencyKey,
    Map<String, dynamic>? extra,
  }) {
    return context.sendRtcSignalEvent(
      eventName: 'rtc.answer',
      signalType: 'answer',
      roomId: roomId,
      toUserId: toUserId,
      sessionId: sessionId,
      correlationId: correlationId,
      payload: <String, dynamic>{'sdp': sdp},
      metadata: metadata,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
    );
  }

  Future<OpenChatSendResult> sendIceCandidate({
    required String roomId,
    required String toUserId,
    required Map<String, dynamic> candidate,
    String? sessionId,
    String? correlationId,
    Map<String, dynamic>? metadata,
    String? uuid,
    String? replyToId,
    String? forwardFromId,
    int? clientSeq,
    String? idempotencyKey,
    Map<String, dynamic>? extra,
  }) {
    return context.sendRtcSignalEvent(
      eventName: 'rtc.ice-candidate',
      signalType: 'ice-candidate',
      roomId: roomId,
      toUserId: toUserId,
      sessionId: sessionId,
      correlationId: correlationId,
      payload: <String, dynamic>{'candidate': candidate},
      metadata: metadata,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
    );
  }

  Future<OpenChatSendResult> sendCustom({
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
    return context.sendRtcSignalEvent(
      eventName: eventName,
      signalType: signalType,
      roomId: roomId,
      toUserId: toUserId,
      groupId: groupId,
      sessionId: sessionId,
      correlationId: correlationId,
      payload: payload,
      metadata: metadata,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
    );
  }

  OpenChatDisposer subscribe(
    void Function(OpenChatRealtimeEventFrame frame) listener,
  ) {
    return context.requireRealtimeAdapter().onEvent((frame) {
      final event = frame.event;
      final namespace = event.metadata?['namespace'];
      if (event.type == 'RTC_SIGNAL' ||
          namespace == 'rtc' ||
          (event.name?.startsWith('rtc.') ?? false)) {
        listener(frame);
      }
    });
  }
}
