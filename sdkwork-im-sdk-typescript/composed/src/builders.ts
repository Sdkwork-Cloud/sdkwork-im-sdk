import type {
  OpenChatConversationEnvelope,
  OpenChatEventTransport,
  OpenChatMessageEnvelope,
  OpenChatSendRequest,
} from './types';

export const OPENCHAT_IM_TRANSPORT_VERSION = 2;

function uppercase(value: string): string {
  return value.trim().toUpperCase();
}

export function normalizeConversationEnvelope(
  conversation: OpenChatConversationEnvelope,
): OpenChatConversationEnvelope {
  return {
    ...conversation,
    ...(typeof conversation.type === 'string'
      ? { type: uppercase(conversation.type) }
      : {}),
  };
}

export function normalizeMessageEnvelope(
  message?: OpenChatMessageEnvelope,
): OpenChatMessageEnvelope | undefined {
  if (!message) {
    return undefined;
  }
  return {
    ...message,
    ...(typeof message.type === 'string'
      ? { type: uppercase(message.type) }
      : {}),
  };
}

export function normalizeEventTransport(
  event?: OpenChatEventTransport,
): OpenChatEventTransport | undefined {
  if (!event) {
    return undefined;
  }
  return {
    ...event,
    ...(typeof event.type === 'string' ? { type: uppercase(event.type) } : {}),
  };
}

export function normalizeSendRequest(
  payload: OpenChatSendRequest,
): OpenChatSendRequest {
  const normalizedMessage = normalizeMessageEnvelope(payload.message);
  const normalizedEvent = normalizeEventTransport(payload.event);

  return {
    ...payload,
    version:
      typeof payload.version === 'number' && Number.isFinite(payload.version)
        ? payload.version
        : OPENCHAT_IM_TRANSPORT_VERSION,
    conversation: normalizeConversationEnvelope(payload.conversation),
    ...(normalizedMessage ? { message: normalizedMessage } : {}),
    ...(normalizedEvent ? { event: normalizedEvent } : {}),
  };
}

export class ImMessageBuilder {
  static conversationSingle(targetId: string): OpenChatConversationEnvelope {
    return {
      type: 'SINGLE',
      targetId,
    };
  }

  static conversationGroup(targetId: string): OpenChatConversationEnvelope {
    return {
      type: 'GROUP',
      targetId,
    };
  }

  static text(
    text: string,
    options: {
      mentions?: string[];
      annotations?: Record<string, unknown>;
    } = {},
  ): OpenChatMessageEnvelope {
    return {
      type: 'TEXT',
      text: {
        text,
        ...(options.mentions?.length ? { mentions: options.mentions } : {}),
        ...(options.annotations ? { annotations: options.annotations } : {}),
      },
    };
  }

  static image(resource: Record<string, unknown>): OpenChatMessageEnvelope {
    return {
      type: 'IMAGE',
      image: { ...resource },
    };
  }

  static audio(resource: Record<string, unknown>): OpenChatMessageEnvelope {
    return {
      type: 'AUDIO',
      audio: { ...resource },
    };
  }

  static video(resource: Record<string, unknown>): OpenChatMessageEnvelope {
    return {
      type: 'VIDEO',
      video: { ...resource },
    };
  }

  static file(resource: Record<string, unknown>): OpenChatMessageEnvelope {
    return {
      type: 'FILE',
      file: { ...resource },
    };
  }

  static location(resource: Record<string, unknown>): OpenChatMessageEnvelope {
    return {
      type: 'LOCATION',
      location: { ...resource },
    };
  }

  static card(resource: Record<string, unknown>): OpenChatMessageEnvelope {
    return {
      type: 'CARD',
      card: { ...resource },
    };
  }

  static custom(resource: Record<string, unknown>): OpenChatMessageEnvelope {
    return {
      type: 'CUSTOM',
      custom: { ...resource },
    };
  }

  static system(resource: Record<string, unknown>): OpenChatMessageEnvelope {
    return {
      type: 'SYSTEM',
      system: { ...resource },
    };
  }

  static music(resource: Record<string, unknown>): OpenChatMessageEnvelope {
    return {
      type: 'MUSIC',
      music: { ...resource },
    };
  }

  static document(resource: Record<string, unknown>): OpenChatMessageEnvelope {
    return {
      type: 'DOCUMENT',
      document: { ...resource },
    };
  }

  static code(resource: Record<string, unknown>): OpenChatMessageEnvelope {
    return {
      type: 'CODE',
      code: { ...resource },
    };
  }

  static ppt(resource: Record<string, unknown>): OpenChatMessageEnvelope {
    return {
      type: 'PPT',
      ppt: { ...resource },
    };
  }

  static character(resource: Record<string, unknown>): OpenChatMessageEnvelope {
    return {
      type: 'CHARACTER',
      character: { ...resource },
    };
  }

  static model3d(resource: Record<string, unknown>): OpenChatMessageEnvelope {
    return {
      type: 'MODEL_3D',
      model3d: { ...resource },
    };
  }

  static buildSendRequest(options: {
    conversation: OpenChatConversationEnvelope;
    message: OpenChatMessageEnvelope;
    uuid?: string;
    replyToId?: string;
    forwardFromId?: string;
    clientSeq?: number;
    idempotencyKey?: string;
    extra?: Record<string, unknown>;
    needReadReceipt?: boolean;
  }): OpenChatSendRequest {
    return {
      version: OPENCHAT_IM_TRANSPORT_VERSION,
      conversation: options.conversation,
      message: options.message,
      ...(options.uuid ? { uuid: options.uuid } : {}),
      ...(options.replyToId ? { replyToId: options.replyToId } : {}),
      ...(options.forwardFromId
        ? { forwardFromId: options.forwardFromId }
        : {}),
      ...(typeof options.clientSeq === 'number'
        ? { clientSeq: options.clientSeq }
        : {}),
      ...(options.idempotencyKey
        ? { idempotencyKey: options.idempotencyKey }
        : {}),
      ...(options.extra ? { extra: options.extra } : {}),
      ...(typeof options.needReadReceipt === 'boolean'
        ? { needReadReceipt: options.needReadReceipt }
        : {}),
    };
  }
}

export class ImEventBuilder {
  static custom(event: OpenChatEventTransport): OpenChatEventTransport {
    return normalizeEventTransport({
      type: event.type,
      ...(event.name ? { name: event.name } : {}),
      ...(event.data ? { data: { ...event.data } } : {}),
      ...(event.metadata ? { metadata: { ...event.metadata } } : {}),
    }) as OpenChatEventTransport;
  }

  static rtcSignal(options: {
    name: string;
    roomId: string;
    signalType: string;
    toUserId?: string;
    sessionId?: string;
    correlationId?: string;
    payload?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
  }): OpenChatEventTransport {
    return {
      type: 'RTC_SIGNAL',
      name: options.name,
      data: {
        roomId: options.roomId,
        ...(options.toUserId ? { toUserId: options.toUserId } : {}),
        signalType: options.signalType,
        ...(options.sessionId ? { sessionId: options.sessionId } : {}),
        ...(options.payload ? { payload: options.payload } : {}),
      },
      metadata: {
        namespace: 'rtc',
        version: 1,
        roomId: options.roomId,
        ...(options.correlationId
          ? { correlationId: options.correlationId }
          : {}),
        ...(options.metadata ? options.metadata : {}),
      },
    };
  }

  static gameEvent(options: {
    name: string;
    data?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
  }): OpenChatEventTransport {
    return {
      type: 'GAME_EVENT',
      name: options.name,
      ...(options.data ? { data: { ...options.data } } : {}),
      metadata: {
        namespace: 'game',
        version: 1,
        ...(options.metadata ? options.metadata : {}),
      },
    };
  }

  static buildSendRequest(options: {
    conversation: OpenChatConversationEnvelope;
    event: OpenChatEventTransport;
    uuid?: string;
    replyToId?: string;
    forwardFromId?: string;
    clientSeq?: number;
    idempotencyKey?: string;
    extra?: Record<string, unknown>;
    needReadReceipt?: boolean;
  }): OpenChatSendRequest {
    return {
      version: OPENCHAT_IM_TRANSPORT_VERSION,
      conversation: options.conversation,
      event: options.event,
      ...(options.uuid ? { uuid: options.uuid } : {}),
      ...(options.replyToId ? { replyToId: options.replyToId } : {}),
      ...(options.forwardFromId
        ? { forwardFromId: options.forwardFromId }
        : {}),
      ...(typeof options.clientSeq === 'number'
        ? { clientSeq: options.clientSeq }
        : {}),
      ...(options.idempotencyKey
        ? { idempotencyKey: options.idempotencyKey }
        : {}),
      ...(options.extra ? { extra: options.extra } : {}),
      ...(typeof options.needReadReceipt === 'boolean'
        ? { needReadReceipt: options.needReadReceipt }
        : {}),
    };
  }
}
