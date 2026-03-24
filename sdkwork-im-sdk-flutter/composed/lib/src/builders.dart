import 'package:backend_sdk/src/models.dart';

import 'types.dart';

class OpenChatImBuilders {
  static MessageEnvelope textMessage({
    required String text,
    List<String>? mentions,
    Map<String, dynamic>? annotations,
  }) {
    return MessageEnvelope(
      type: 'TEXT',
      text: TextMediaResource(
        text: text,
        mentions: mentions,
        annotations: annotations,
      ),
    );
  }

  static MessageEnvelope imageMessage(ImageMediaResource resource) =>
      MessageEnvelope(type: 'IMAGE', image: resource);

  static MessageEnvelope audioMessage(AudioMediaResource resource) =>
      MessageEnvelope(type: 'AUDIO', audio: resource);

  static MessageEnvelope videoMessage(VideoMediaResource resource) =>
      MessageEnvelope(type: 'VIDEO', video: resource);

  static MessageEnvelope fileMessage(FileMediaResource resource) =>
      MessageEnvelope(type: 'FILE', file: resource);

  static MessageEnvelope locationMessage(LocationMediaResource resource) =>
      MessageEnvelope(type: 'LOCATION', location: resource);

  static MessageEnvelope cardMessage(CardMediaResource resource) =>
      MessageEnvelope(type: 'CARD', card: resource);

  static MessageEnvelope customMessage(CustomContent resource) =>
      MessageEnvelope(type: 'CUSTOM', custom: resource);

  static MessageEnvelope systemMessage(SystemContent resource) =>
      MessageEnvelope(type: 'SYSTEM', system: resource);

  static MessageEnvelope musicMessage(MusicMediaResource resource) =>
      MessageEnvelope(type: 'MUSIC', music: resource);

  static MessageEnvelope documentMessage(DocumentMediaResource resource) =>
      MessageEnvelope(type: 'DOCUMENT', document: resource);

  static MessageEnvelope codeMessage(CodeMediaResource resource) =>
      MessageEnvelope(type: 'CODE', code: resource);

  static MessageEnvelope pptMessage(PptMediaResource resource) =>
      MessageEnvelope(type: 'PPT', ppt: resource);

  static MessageEnvelope characterMessage(CharacterMediaResource resource) =>
      MessageEnvelope(type: 'CHARACTER', character: resource);

  static MessageEnvelope model3dMessage(Model3DMediaResource resource) =>
      MessageEnvelope(type: 'MODEL_3D', model3d: resource);

  static EventContentTransport eventTransport({
    required String type,
    String? name,
    Map<String, dynamic>? data,
    Map<String, dynamic>? metadata,
  }) {
    return EventContentTransport(
      type: uppercase(type),
      name: name,
      data: data,
      metadata: metadata,
    );
  }

  static SendMessage buildSendMessage({
    required ConversationEnvelope conversation,
    MessageEnvelope? message,
    EventContentTransport? event,
    String? uuid,
    String? replyToId,
    String? forwardFromId,
    int? clientSeq,
    String? idempotencyKey,
    Map<String, dynamic>? extra,
    bool? needReadReceipt,
  }) {
    final normalizedConversation = ConversationEnvelope(
      type: uppercase(conversation.type ?? 'SINGLE'),
      targetId: conversation.targetId,
    );
    final normalizedMessage = normalizeMessageEnvelope(message);
    final normalizedEvent = normalizeEventEnvelope(event);
    final conversationType =
        uppercase(normalizedConversation.type ?? 'SINGLE');
    final targetId = normalizedConversation.targetId;

    return SendMessage(
      version: transportVersion.toDouble(),
      conversation: normalizedConversation,
      message: normalizedMessage,
      event: normalizedEvent,
      uuid: uuid,
      type: normalizedMessage?.type ?? normalizedEvent?.type,
      content: legacyContent(message: normalizedMessage, event: normalizedEvent),
      toUserId: conversationType == 'GROUP' ? null : targetId,
      groupId: conversationType == 'GROUP' ? targetId : null,
      replyToId: replyToId,
      forwardFromId: forwardFromId,
      clientSeq: clientSeq?.toDouble(),
      idempotencyKey: idempotencyKey,
      extra: extra,
      needReadReceipt: needReadReceipt,
    );
  }

  static SendMessage normalizeSendMessage(SendMessage payload) {
    final conversation = payload.conversation == null
        ? null
        : ConversationEnvelope(
            type: uppercase(payload.conversation!.type ?? 'SINGLE'),
            targetId: payload.conversation!.targetId,
          );
    final message = normalizeMessageEnvelope(payload.message);
    final event = normalizeEventEnvelope(payload.event);
    final conversationType = uppercase(conversation?.type ?? 'SINGLE');
    final targetId = conversation?.targetId;

    return SendMessage(
      version: payload.version ?? transportVersion.toDouble(),
      conversation: conversation,
      message: message,
      event: event,
      uuid: payload.uuid,
      type: pickString(payload.type) ?? message?.type ?? event?.type,
      content: payload.content ?? legacyContent(message: message, event: event),
      fromUserId: payload.fromUserId,
      toUserId:
          payload.toUserId ?? (conversationType == 'GROUP' ? null : targetId),
      groupId:
          payload.groupId ?? (conversationType == 'GROUP' ? targetId : null),
      replyToId: payload.replyToId,
      forwardFromId: payload.forwardFromId,
      clientSeq: payload.clientSeq,
      idempotencyKey: payload.idempotencyKey,
      extra: payload.extra,
      needReadReceipt: payload.needReadReceipt,
    );
  }

  static MessageEnvelope? normalizeMessageEnvelope(MessageEnvelope? message) {
    if (message == null) {
      return null;
    }
    return MessageEnvelope(
      type: uppercase(message.type ?? 'CUSTOM'),
      text: message.text,
      image: message.image,
      audio: message.audio,
      video: message.video,
      file: message.file,
      location: message.location,
      card: message.card,
      system: message.system,
      custom: message.custom,
      music: message.music,
      document: message.document,
      code: message.code,
      ppt: message.ppt,
      character: message.character,
      model3d: message.model3d,
    );
  }

  static EventContentTransport? normalizeEventEnvelope(
    EventContentTransport? event,
  ) {
    if (event == null) {
      return null;
    }
    return EventContentTransport(
      type: uppercase(event.type ?? 'CUSTOM_EVENT'),
      name: event.name,
      data: event.data,
      metadata: event.metadata,
    );
  }

  static MessageContent? legacyContent({
    MessageEnvelope? message,
    EventContentTransport? event,
  }) {
    if (message != null) {
      return MessageContent(
        text: message.text == null
            ? null
            : TextContent(
                text: message.text!.text,
                mentions: message.text!.mentions,
              ),
        image: message.image,
        video: message.video,
        audio: message.audio,
        music: message.music,
        file: message.file,
        document: message.document,
        code: message.code,
        ppt: message.ppt,
        character: message.character,
        model3d: message.model3d,
        location: message.location == null
            ? null
            : LocationContent(
                latitude: message.location!.latitude,
                longitude: message.location!.longitude,
                address: message.location!.address,
                name: message.location!.description,
                thumbnailUrl: message.location!.thumbnailUrl,
              ),
        cardResource: message.card,
        system: message.system,
        custom: message.custom,
      );
    }

    if (event != null) {
      return MessageContent(
        event: EventContent(
          type: event.type,
          name: event.name,
          data: event.data,
          metadata: event.metadata,
        ),
      );
    }

    return null;
  }
}
