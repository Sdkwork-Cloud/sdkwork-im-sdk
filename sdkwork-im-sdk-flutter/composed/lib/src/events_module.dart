import 'package:backend_sdk/src/models.dart';

import 'context.dart';
import 'types.dart';

class OpenChatEventsModule {
  final OpenChatSdkContext context;

  OpenChatEventsModule(this.context);

  Future<OpenChatSendResult> publish({
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
    return context.publishEvent(
      type: type,
      name: name,
      data: data,
      metadata: metadata,
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

  Future<OpenChatSendResult> publishToUser({
    required String userId,
    required String type,
    String? name,
    Map<String, dynamic>? data,
    Map<String, dynamic>? metadata,
    String? uuid,
    String? replyToId,
    String? forwardFromId,
    int? clientSeq,
    String? idempotencyKey,
    Map<String, dynamic>? extra,
    bool? needReadReceipt,
  }) {
    return publish(
      type: type,
      name: name,
      data: data,
      metadata: metadata,
      toUserId: userId,
      uuid: uuid,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq,
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }

  Future<OpenChatSendResult> publishToGroup({
    required String groupId,
    required String type,
    String? name,
    Map<String, dynamic>? data,
    Map<String, dynamic>? metadata,
    String? uuid,
    String? replyToId,
    String? forwardFromId,
    int? clientSeq,
    String? idempotencyKey,
    Map<String, dynamic>? extra,
    bool? needReadReceipt,
  }) {
    return publish(
      type: type,
      name: name,
      data: data,
      metadata: metadata,
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

  Future<OpenChatSendResult> publishGameEvent({
    required String name,
    required String groupId,
    Map<String, dynamic>? data,
    Map<String, dynamic>? metadata,
    String? uuid,
    String? replyToId,
    String? forwardFromId,
    int? clientSeq,
    String? idempotencyKey,
    Map<String, dynamic>? extra,
    bool? needReadReceipt,
  }) {
    return publish(
      type: 'GAME_EVENT',
      name: name,
      data: data,
      metadata: <String, dynamic>{
        'namespace': 'game',
        'version': 1,
        ...?metadata,
      },
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
