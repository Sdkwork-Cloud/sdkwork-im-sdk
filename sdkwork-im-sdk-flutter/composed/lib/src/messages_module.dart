import 'package:backend_sdk/src/models.dart';

import 'builders.dart';
import 'context.dart';
import 'types.dart';

class OpenChatMessagesModule {
  final OpenChatSdkContext context;

  OpenChatMessagesModule(this.context);

  Future<OpenChatSendResult> send(SendMessage payload) {
    return context.send(payload);
  }

  Future<OpenChatSendResult> sendText({
    required String text,
    ConversationEnvelope? conversation,
    String? toUserId,
    String? groupId,
    List<String>? mentions,
    bool? mentionAll,
    Map<String, dynamic>? annotations,
    String? uuid,
    String? replyToId,
    String? forwardFromId,
    int? clientSeq,
    String? idempotencyKey,
    Map<String, dynamic>? extra,
    bool? needReadReceipt,
  }) {
    return context.sendMessageEnvelope(
      message: OpenChatImBuilders.textMessage(
        text: text,
        mentions: mentions,
        annotations: annotations,
      ),
      conversation: conversation,
      toUserId: toUserId,
      groupId: groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: <String, dynamic>{
        ...?extra,
        if (mentionAll != null) 'mentionAll': mentionAll,
      }.isEmpty
          ? null
          : <String, dynamic>{
              ...?extra,
              if (mentionAll != null) 'mentionAll': mentionAll,
            },
      needReadReceipt: needReadReceipt,
    );
  }

  Future<OpenChatSendResult> sendImage({
    required ImageMediaResource resource,
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
    return _sendMedia(
      message: OpenChatImBuilders.imageMessage(resource),
      conversation: conversation,
      toUserId: toUserId,
      groupId: groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }

  Future<OpenChatSendResult> sendAudio({
    required AudioMediaResource resource,
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
    return _sendMedia(
      message: OpenChatImBuilders.audioMessage(resource),
      conversation: conversation,
      toUserId: toUserId,
      groupId: groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }

  Future<OpenChatSendResult> sendVideo({
    required VideoMediaResource resource,
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
    return _sendMedia(
      message: OpenChatImBuilders.videoMessage(resource),
      conversation: conversation,
      toUserId: toUserId,
      groupId: groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }

  Future<OpenChatSendResult> sendFile({
    required FileMediaResource resource,
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
    return _sendMedia(
      message: OpenChatImBuilders.fileMessage(resource),
      conversation: conversation,
      toUserId: toUserId,
      groupId: groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }

  Future<OpenChatSendResult> sendLocation({
    required LocationMediaResource resource,
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
    return _sendMedia(
      message: OpenChatImBuilders.locationMessage(resource),
      conversation: conversation,
      toUserId: toUserId,
      groupId: groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }

  Future<OpenChatSendResult> sendCard({
    required CardMediaResource resource,
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
    return _sendMedia(
      message: OpenChatImBuilders.cardMessage(resource),
      conversation: conversation,
      toUserId: toUserId,
      groupId: groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }

  Future<OpenChatSendResult> sendUserCard({
    required CardContent resource,
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
    return sendCustom(
      resource: CustomContent(
        customType: 'user_card',
        data: _normalizeCustomDataMap(resource.toJson()),
      ),
      conversation: conversation,
      toUserId: toUserId,
      groupId: groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }

  Future<OpenChatSendResult> sendCombined({
    required List<Object?> resources,
    String? caption,
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
    return sendCustom(
      resource: CustomContent(
        customType: 'combined',
        data: <String, dynamic>{
          'resources': resources.map(_encodeCustomDataValue).toList(),
          if (caption != null && caption.trim().isNotEmpty)
            'caption': caption.trim(),
        },
      ),
      conversation: conversation,
      toUserId: toUserId,
      groupId: groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }

  Future<OpenChatSendResult> sendCustom({
    required CustomContent resource,
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
    return _sendMedia(
      message: OpenChatImBuilders.customMessage(resource),
      conversation: conversation,
      toUserId: toUserId,
      groupId: groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }

  Map<String, dynamic> _normalizeCustomDataMap(Map<String, dynamic> value) {
    return value.map(
      (key, item) => MapEntry(key, _encodeCustomDataValue(item)),
    );
  }

  dynamic _encodeCustomDataValue(dynamic value) {
    if (value == null) {
      return null;
    }

    if (value is Map<String, dynamic>) {
      return _normalizeCustomDataMap(value);
    }

    if (value is List) {
      return value.map(_encodeCustomDataValue).toList();
    }

    try {
      final dynamic dynamicValue = value;
      final dynamic encoded = dynamicValue.toJson();
      if (encoded is Map<String, dynamic>) {
        return _normalizeCustomDataMap(encoded);
      }
      if (encoded is List) {
        return encoded.map(_encodeCustomDataValue).toList();
      }
      return encoded;
    } catch (_) {
      return value;
    }
  }

  Future<OpenChatSendResult> sendSystem({
    required SystemContent resource,
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
    return _sendMedia(
      message: OpenChatImBuilders.systemMessage(resource),
      conversation: conversation,
      toUserId: toUserId,
      groupId: groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }

  Future<OpenChatSendResult> sendMusic({
    required MusicMediaResource resource,
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
    return _sendMedia(
      message: OpenChatImBuilders.musicMessage(resource),
      conversation: conversation,
      toUserId: toUserId,
      groupId: groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }

  Future<OpenChatSendResult> sendDocument({
    required DocumentMediaResource resource,
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
    return _sendMedia(
      message: OpenChatImBuilders.documentMessage(resource),
      conversation: conversation,
      toUserId: toUserId,
      groupId: groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }

  Future<OpenChatSendResult> sendCode({
    required CodeMediaResource resource,
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
    return _sendMedia(
      message: OpenChatImBuilders.codeMessage(resource),
      conversation: conversation,
      toUserId: toUserId,
      groupId: groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }

  Future<OpenChatSendResult> sendPpt({
    required PptMediaResource resource,
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
    return _sendMedia(
      message: OpenChatImBuilders.pptMessage(resource),
      conversation: conversation,
      toUserId: toUserId,
      groupId: groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }

  Future<OpenChatSendResult> sendCharacter({
    required CharacterMediaResource resource,
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
    return _sendMedia(
      message: OpenChatImBuilders.characterMessage(resource),
      conversation: conversation,
      toUserId: toUserId,
      groupId: groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }

  Future<OpenChatSendResult> sendModel3d({
    required Model3DMediaResource resource,
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
    return _sendMedia(
      message: OpenChatImBuilders.model3dMessage(resource),
      conversation: conversation,
      toUserId: toUserId,
      groupId: groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }

  Future<Object?> batchSend(List<SendMessage> messages) {
    final normalizedMessages =
        messages.map(OpenChatImBuilders.normalizeSendMessage).toList();
    return context.backendClient.messages.messageControllerBatchSend(
      BatchSendMessage(messages: normalizedMessages),
    );
  }

  Future<Object?> getByUserId(String userId, [Map<String, dynamic>? params]) {
    return context.backendClient.messages
        .messageControllerGetByUserId(userId, params);
  }

  Future<Object?> getByGroupId(String groupId, [Map<String, dynamic>? params]) {
    return context.backendClient.messages
        .messageControllerGetByGroupId(groupId, params);
  }

  Future<Object?> getHistoryBySeq([Map<String, dynamic>? params]) {
    return context.backendClient.messages.messageControllerGetHistoryBySeq(
      params,
    );
  }

  Future<Object?> ackConversationSeq(AckConversationSeqRequest payload) {
    return context.backendClient.messages
        .messageControllerAckConversationSeq(payload);
  }

  Future<Object?> ackConversationSeqBatch(
    AckConversationSeqBatchRequest payload,
  ) {
    return context.backendClient.messages
        .messageControllerAckConversationSeqBatch(payload);
  }

  Future<Object?> get(String id) {
    return context.backendClient.messages.messageControllerGetById(id);
  }

  Future<bool> delete(String id) async {
    final dynamic response =
        await context.backendClient.messages.messageControllerDelete(id);
    return context.normalizeActionSuccess(response);
  }

  Future<Object?> getReceipts(String id, [Map<String, dynamic>? params]) {
    return context.backendClient.messages.messageControllerGetReceipts(
      id,
      params,
    );
  }

  Future<Object?> getReceiptSummary(String id) {
    return context.backendClient.messages
        .messageControllerGetReceiptSummary(id);
  }

  Future<Object?> getUnreadMembers(String id, [Map<String, dynamic>? params]) {
    return context.backendClient.messages
        .messageControllerGetGroupUnreadMembers(id, params);
  }

  Future<Object?> getReadMembers(String id, [Map<String, dynamic>? params]) {
    return context.backendClient.messages
        .messageControllerGetGroupReadMembers(id, params);
  }

  Future<Object?> updateStatus(String id, UpdateMessageStatus payload) {
    return context.backendClient.messages
        .messageControllerUpdateStatus(id, payload);
  }

  Future<Object?> edit(String id, EditMessage payload) {
    return context.backendClient.messages.messageControllerEdit(id, payload);
  }

  Future<Object?> getReactionSummary(String id) {
    return context.backendClient.messages
        .messageControllerGetReactionSummary(id);
  }

  Future<Object?> setReaction(String id, SetMessageReaction payload) {
    return context.backendClient.messages
        .messageControllerSetReaction(id, payload);
  }

  Future<Object?> markGroupAsRead(String groupId, MarkMessagesRead payload) {
    return context.backendClient.messages
        .messageControllerMarkGroupAsRead(groupId, payload);
  }

  Future<Object?> markAsRead(String userId, MarkMessagesRead payload) {
    return context.backendClient.messages
        .messageControllerMarkAsRead(userId, payload);
  }

  Future<bool> recall(String id) async {
    final dynamic response =
        await context.backendClient.messages.messageControllerRecall(id);
    return context.normalizeActionSuccess(response);
  }

  Future<Object?> forward(String id, ForwardMessage payload) {
    return context.backendClient.messages.messageControllerForward(id, payload);
  }

  Future<bool> retryFailed(String id) async {
    final dynamic response =
        await context.backendClient.messages.messageControllerRetryFailed(id);
    return context.normalizeActionSuccess(response);
  }

  Future<OpenChatSendResult> _sendMedia({
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
    return context.sendMessageEnvelope(
      message: message,
      conversation: conversation,
      toUserId: toUserId,
      groupId: groupId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }
}
