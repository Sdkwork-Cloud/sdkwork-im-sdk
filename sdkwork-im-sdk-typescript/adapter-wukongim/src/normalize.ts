import type {
  OpenChatConversationEnvelope,
  OpenChatEventTransport,
  OpenChatMessageEnvelope,
  OpenChatRealtimeEventFrame,
  OpenChatRealtimeFrame,
  OpenChatRealtimeMessageFrame,
} from './types';

const MESSAGE_RESOURCE_KEYS = [
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function normalizeUnknownRecord(value: unknown): Record<string, unknown> | undefined {
  if (isRecord(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = parseJson(value);
    return isRecord(parsed) ? parsed : undefined;
  }
  return undefined;
}

function pickString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }
  return undefined;
}

function pickNumber(...values: unknown[]): number | undefined {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === 'string' && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }
  return undefined;
}

function uppercase(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) {
    return undefined;
  }
  return value.trim().toUpperCase();
}

function findVersionedPayload(
  raw: Record<string, unknown>,
): Record<string, unknown> | undefined {
  const candidates: Array<unknown> = [
    raw,
    raw.content,
    raw.payload,
    raw.data,
    raw.message,
    raw.body,
  ];

  for (const candidate of candidates) {
    const record = normalizeUnknownRecord(candidate);
    if (!record) {
      continue;
    }
    if (record.conversation && (record.message || record.event)) {
      return record;
    }
    const nestedContent = normalizeUnknownRecord(record.content);
    if (nestedContent?.conversation && (nestedContent.message || nestedContent.event)) {
      return nestedContent;
    }
  }

  return undefined;
}

function normalizeConversation(
  candidate: unknown,
  raw: Record<string, unknown>,
): OpenChatConversationEnvelope | undefined {
  const record = normalizeUnknownRecord(candidate);
  if (record) {
    return {
      type: uppercase(record.type) ?? 'SINGLE',
      targetId:
        pickString(record.targetId, record.channelId, raw.channelId, raw.channelID) ??
        undefined,
    };
  }

  const inferredTargetId = pickString(raw.channelId, raw.channelID);
  if (!inferredTargetId) {
    return undefined;
  }

  const channelType = pickString(raw.channelType, raw.channel_type);
  const channelTypeNumber = pickNumber(raw.channelType);

  return {
    type:
      channelType === 'group' || channelTypeNumber === 2 ? 'GROUP' : 'SINGLE',
    targetId: inferredTargetId,
  };
}

function normalizeMessageEnvelope(candidate: unknown): OpenChatMessageEnvelope | undefined {
  const record = normalizeUnknownRecord(candidate);
  if (!record) {
    return undefined;
  }

  const normalized: OpenChatMessageEnvelope = {};
  const type = uppercase(record.type);
  if (type) {
    normalized.type = type;
  }

  for (const key of MESSAGE_RESOURCE_KEYS) {
    const value = normalizeUnknownRecord(record[key]);
    if (value) {
      normalized[key] = value;
    }
  }

  if (!normalized.type) {
    const inferredKey = MESSAGE_RESOURCE_KEYS.find((key) => normalized[key]);
    if (inferredKey) {
      normalized.type = inferredKey.toUpperCase();
    }
  }

  return normalized.type ? normalized : undefined;
}

function normalizeEventTransport(candidate: unknown): OpenChatEventTransport | undefined {
  const record = normalizeUnknownRecord(candidate);
  if (!record) {
    return undefined;
  }

  const type = pickString(record.type);
  if (!type) {
    return undefined;
  }

  return {
    type,
    name: pickString(record.name),
    data: normalizeUnknownRecord(record.data),
    metadata: normalizeUnknownRecord(record.metadata),
  };
}

export function normalizeRealtimeFrame(payload: unknown): OpenChatRealtimeFrame | undefined {
  const raw = normalizeUnknownRecord(payload);
  if (!raw) {
    return undefined;
  }

  const transport = findVersionedPayload(raw);
  if (!transport) {
    return undefined;
  }

  const base = {
    messageId: pickString(raw.messageId, raw.messageID, raw.id),
    conversation: normalizeConversation(transport.conversation, raw),
    senderId: pickString(raw.fromUid, raw.fromUID, raw.fromUserId, raw.senderId),
    channelId: pickString(raw.channelId, raw.channelID),
    timestamp: pickNumber(raw.timestamp, raw.createdAt),
    raw,
  };

  const message = normalizeMessageEnvelope(transport.message);
  if (message) {
    return {
      ...base,
      message,
    } as OpenChatRealtimeMessageFrame;
  }

  const event = normalizeEventTransport(transport.event);
  if (event) {
    return {
      ...base,
      event,
    } as OpenChatRealtimeEventFrame;
  }

  return undefined;
}
