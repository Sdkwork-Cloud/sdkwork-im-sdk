import {
  buildCustomMessageSchema,
  CRAW_CHAT_JSON_ENCODING,
  CRAW_CHAT_MESSAGE_SCHEMA_AGENT,
  CRAW_CHAT_MESSAGE_SCHEMA_AGENT_HANDOFF,
  CRAW_CHAT_MESSAGE_SCHEMA_AGENT_STATE,
  CRAW_CHAT_MESSAGE_SCHEMA_AI_TEXT,
  CRAW_CHAT_MESSAGE_SCHEMA_AI_IMAGE_GENERATION,
  CRAW_CHAT_MESSAGE_SCHEMA_AI_VIDEO_GENERATION,
  CRAW_CHAT_MESSAGE_SCHEMA_CARD,
  CRAW_CHAT_MESSAGE_SCHEMA_CONTACT,
  CRAW_CHAT_MESSAGE_SCHEMA_LINK,
  CRAW_CHAT_MESSAGE_SCHEMA_LOCATION,
  CRAW_CHAT_MESSAGE_SCHEMA_MUSIC,
  CRAW_CHAT_MESSAGE_SCHEMA_STICKER,
  CRAW_CHAT_MESSAGE_SCHEMA_TOOL_RESULT,
  CRAW_CHAT_MESSAGE_SCHEMA_VOICE,
  CRAW_CHAT_MESSAGE_SCHEMA_WORKFLOW_EVENT,
} from './message-standards.js';
import { ImSdkError } from './errors.js';
import type {
  AppendStreamFrameRequest,
  AppendTextFrameOptions,
  ContentPart,
  ImClientMessage,
  ImCreateAgentMessageOptions,
  ImCreateAgentHandoffMessageOptions,
  ImCreateAgentStateMessageOptions,
  ImCreateAiTextMessageOptions,
  ImCreateAiImageGenerationMessageOptions,
  ImCreateAiVideoGenerationMessageOptions,
  ImCreateCardMessageOptions,
  ImCreateContactMessageOptions,
  ImCreateCustomMessageOptions,
  ImCreateDataMessageOptions,
  ImCreateLinkMessageOptions,
  ImCreateLocationMessageOptions,
  ImCreateMediaMessageOptions,
  ImCreateMessageOptions,
  ImCreateMusicMessageOptions,
  ImCreateSignalMessageOptions,
  ImCreateStickerMessageOptions,
  ImCreateStructuredMessageOptions,
  ImCreateStreamReferenceMessageOptions,
  ImCreateToolResultMessageOptions,
  ImCreateVoiceMessageOptions,
  ImCreateWorkflowEventMessageOptions,
  ImMessageChannel,
  ImMessageKind,
  EditMessageRequest,
  EditTextMessageOptions,
  MediaResource,
  MediaResourceType,
  PostJsonRtcSignalOptions,
  PostMessageRequest,
  PostRtcSignalRequest,
  PostTextMessageOptions,
} from './types.js';

export const DEFAULT_MESSAGE_CHANNEL = 'conversation';
export const DEFAULT_TEXT_FRAME_ENCODING = 'text/plain; charset=utf-8';

interface ImInternalCreateRawMessageOptions {
  channel?: ImMessageChannel;
}

interface ImInternalRtcSignalEnvelope<TTransport extends string = string> {
  kind: 'rtc_signal';
  transport: TTransport;
  rtcSessionId: string | number;
  body: PostRtcSignalRequest;
}

export function buildTextMessageRequest(
  text: string,
  options: PostTextMessageOptions = {},
): PostMessageRequest {
  return {
    ...options,
    text,
  };
}

export function buildTextEditRequest(
  text: string,
  options: EditTextMessageOptions = {},
): EditMessageRequest {
  return {
    ...options,
    text,
  };
}

export function buildTextFrameRequest(
  options: AppendTextFrameOptions,
): AppendStreamFrameRequest {
  return {
    frameSeq: options.frameSeq,
    frameType: 'text',
    schemaRef: options.schemaRef,
    encoding: options.encoding ?? DEFAULT_TEXT_FRAME_ENCODING,
    payload: options.text,
    attributes: options.attributes,
  };
}

export function buildJsonRtcSignalRequest(
  signalType: string,
  options: PostJsonRtcSignalOptions,
): PostRtcSignalRequest {
  return {
    signalType,
    schemaRef: options.schemaRef,
    signalingStreamId: options.signalingStreamId,
    payload: JSON.stringify(options.payload ?? null, null, options.pretty ? 2 : 0),
  };
}

export function buildClientMessage<TKind extends ImMessageKind>(
  kind: TKind,
  conversationId: string | number,
  body: PostMessageRequest,
  options: ImInternalCreateRawMessageOptions = {},
): ImClientMessage<TKind> {
  return {
    kind,
    target: {
      conversationId,
      channel: resolveMessageChannel(options.channel),
    },
    body,
  };
}

export function buildTextClientMessage(
  conversationId: string | number,
  text: string,
  options: ImCreateMessageOptions = {},
): ImClientMessage<'text'> {
  const { channel, ...messageOptions } = options;
  return buildClientMessage(
    'text',
    conversationId,
    buildTextMessageRequest(text, messageOptions),
    { channel },
  );
}

export function buildMediaMessageRequest(
  mediaType: MediaResourceType,
  options: ImCreateMediaMessageOptions,
): PostMessageRequest {
  const {
    channel: _channel,
    text,
    mediaAssetId,
    resource,
    schemaRef,
    encoding,
    payload,
    ...messageOptions
  } = options;

  return {
    ...messageOptions,
    text,
    parts: [
      buildMediaContentPart(mediaType, {
        mediaAssetId,
        resource,
        schemaRef,
        encoding,
        payload,
      }),
    ],
  };
}

export function buildMediaClientMessage<TKind extends 'image' | 'video' | 'audio' | 'file'>(
  kind: TKind,
  conversationId: string | number,
  options: ImCreateMediaMessageOptions,
): ImClientMessage<TKind> {
  return buildClientMessage(
    kind,
    conversationId,
    buildMediaMessageRequest(kind, options),
    { channel: options.channel },
  );
}

export function buildDataMessageRequest(
  options: ImCreateDataMessageOptions,
): PostMessageRequest {
  const {
    channel: _channel,
    text,
    schemaRef,
    encoding,
    payload,
    ...messageOptions
  } = options;

  return {
    ...messageOptions,
    text,
    parts: [
      omitUndefined({
        kind: 'data',
        schemaRef,
        encoding,
        payload,
      }) as ContentPart,
    ],
  };
}

export function buildDataClientMessage(
  conversationId: string | number,
  options: ImCreateDataMessageOptions,
): ImClientMessage<'data'> {
  return buildClientMessage(
    'data',
    conversationId,
    buildDataMessageRequest(options),
    { channel: options.channel },
  );
}

export function buildSignalMessageRequest(
  options: ImCreateSignalMessageOptions,
): PostMessageRequest {
  const {
    channel: _channel,
    text,
    signalType,
    schemaRef,
    encoding,
    payload,
    state,
    ...messageOptions
  } = options;

  return {
    ...messageOptions,
    text,
    parts: [
      omitUndefined({
        kind: 'signal',
        signalType,
        schemaRef,
        encoding,
        payload,
        state,
      }) as ContentPart,
    ],
  };
}

export function buildSignalClientMessage(
  conversationId: string | number,
  options: ImCreateSignalMessageOptions,
): ImClientMessage<'signal'> {
  return buildClientMessage(
    'signal',
    conversationId,
    buildSignalMessageRequest(options),
    { channel: options.channel },
  );
}

export function buildStreamReferenceMessageRequest(
  options: ImCreateStreamReferenceMessageOptions,
): PostMessageRequest {
  const {
    channel: _channel,
    text,
    streamId,
    streamType,
    state,
    ...messageOptions
  } = options;

  return {
    ...messageOptions,
    text,
    parts: [
      omitUndefined({
        kind: 'stream_ref',
        streamId: String(streamId),
        streamType,
        state,
      }) as ContentPart,
    ],
  };
}

export function buildStreamReferenceClientMessage(
  conversationId: string | number,
  options: ImCreateStreamReferenceMessageOptions,
): ImClientMessage<'stream_ref'> {
  return buildClientMessage(
    'stream_ref',
    conversationId,
    buildStreamReferenceMessageRequest(options),
    { channel: options.channel },
  );
}

export function buildLocationClientMessage(
  conversationId: string | number,
  options: ImCreateLocationMessageOptions,
): ImClientMessage<'location'> {
  return buildStructuredDataClientMessage(
    'location',
    conversationId,
    CRAW_CHAT_MESSAGE_SCHEMA_LOCATION,
    {
      latitude: options.latitude,
      longitude: options.longitude,
      name: options.name,
      address: options.address,
      mapUrl: options.mapUrl,
    },
    options,
  );
}

export function buildLinkClientMessage(
  conversationId: string | number,
  options: ImCreateLinkMessageOptions,
): ImClientMessage<'link'> {
  return buildStructuredDataClientMessage(
    'link',
    conversationId,
    CRAW_CHAT_MESSAGE_SCHEMA_LINK,
    {
      title: options.title,
      url: options.url,
      description: options.description,
      imageUrl: options.imageUrl,
      siteName: options.siteName,
    },
    options,
  );
}

export function buildCardClientMessage(
  conversationId: string | number,
  options: ImCreateCardMessageOptions,
): ImClientMessage<'card'> {
  return buildStructuredDataClientMessage(
    'card',
    conversationId,
    CRAW_CHAT_MESSAGE_SCHEMA_CARD,
    {
      title: options.title,
      subtitle: options.subtitle,
      imageUrl: options.imageUrl,
      actions: options.actions ?? [],
    },
    options,
  );
}

export function buildMusicClientMessage(
  conversationId: string | number,
  options: ImCreateMusicMessageOptions,
): ImClientMessage<'music'> {
  return buildStructuredDataClientMessage(
    'music',
    conversationId,
    CRAW_CHAT_MESSAGE_SCHEMA_MUSIC,
    {
      title: options.title,
      artist: options.artist,
      album: options.album,
      url: options.url,
      coverUrl: options.coverUrl,
      durationSeconds: options.durationSeconds,
    },
    options,
  );
}

export function buildContactClientMessage(
  conversationId: string | number,
  options: ImCreateContactMessageOptions,
): ImClientMessage<'contact'> {
  return buildStructuredDataClientMessage(
    'contact',
    conversationId,
    CRAW_CHAT_MESSAGE_SCHEMA_CONTACT,
    {
      displayName: options.displayName,
      avatarUrl: options.avatarUrl,
      description: options.description,
      profileUrl: options.profileUrl,
      contactId: options.contactId,
    },
    options,
  );
}

export function buildStickerClientMessage(
  conversationId: string | number,
  options: ImCreateStickerMessageOptions,
): ImClientMessage<'sticker'> {
  return buildStructuredMediaClientMessage(
    'sticker',
    'image',
    conversationId,
    CRAW_CHAT_MESSAGE_SCHEMA_STICKER,
    {
      stickerId: options.stickerId,
      packId: options.packId,
      emoji: options.emoji,
    },
    options,
  );
}

export function buildVoiceClientMessage(
  conversationId: string | number,
  options: ImCreateVoiceMessageOptions,
): ImClientMessage<'voice'> {
  return buildStructuredMediaClientMessage(
    'voice',
    'audio',
    conversationId,
    CRAW_CHAT_MESSAGE_SCHEMA_VOICE,
    {
      durationSeconds: options.durationSeconds,
      transcription: options.transcription,
      waveform: options.waveform,
    },
    options,
  );
}

export function buildAgentClientMessage(
  conversationId: string | number,
  options: ImCreateAgentMessageOptions,
): ImClientMessage<'agent'> {
  return buildStructuredDataClientMessage(
    'agent',
    conversationId,
    CRAW_CHAT_MESSAGE_SCHEMA_AGENT,
    {
      agentId: options.agentId,
      agentName: options.agentName,
      stage: options.stage,
      status: options.status,
      capabilities: options.capabilities,
    },
    options,
  );
}

export function buildAgentStateClientMessage(
  conversationId: string | number,
  options: ImCreateAgentStateMessageOptions,
): ImClientMessage<'agent_state'> {
  return buildStructuredDataClientMessage(
    'agent_state',
    conversationId,
    CRAW_CHAT_MESSAGE_SCHEMA_AGENT_STATE,
    {
      agentId: options.agentId,
      agentName: options.agentName,
      stage: options.stage,
      status: options.status,
      capabilities: options.capabilities,
    },
    options,
  );
}

export function buildAgentHandoffClientMessage(
  conversationId: string | number,
  options: ImCreateAgentHandoffMessageOptions,
): ImClientMessage<'agent_handoff'> {
  return buildStructuredDataClientMessage(
    'agent_handoff',
    conversationId,
    CRAW_CHAT_MESSAGE_SCHEMA_AGENT_HANDOFF,
    {
      handoffId: options.handoffId,
      fromAgentId: options.fromAgentId,
      fromAgentName: options.fromAgentName,
      toAgentId: options.toAgentId,
      toAgentName: options.toAgentName,
      reason: options.reason,
      status: options.status,
    },
    options,
  );
}

export function buildCustomClientMessage(
  conversationId: string | number,
  options: ImCreateCustomMessageOptions,
): ImClientMessage<'custom'> {
  return buildStructuredDataClientMessage(
    'custom',
    conversationId,
    buildCustomMessageSchema(options.customType),
    options.data ?? null,
    options,
  );
}

export function buildAiTextClientMessage(
  conversationId: string | number,
  options: ImCreateAiTextMessageOptions,
): ImClientMessage<'ai_text'> {
  return buildStructuredDataClientMessage(
    'ai_text',
    conversationId,
    CRAW_CHAT_MESSAGE_SCHEMA_AI_TEXT,
    {
      prompt: options.prompt,
      status: options.status,
      model: options.model,
      revisedPrompt: options.revisedPrompt,
    },
    options,
  );
}

export function buildAiImageGenerationClientMessage(
  conversationId: string | number,
  options: ImCreateAiImageGenerationMessageOptions,
): ImClientMessage<'ai_image_generation'> {
  return buildStructuredMediaClientMessage(
    'ai_image_generation',
    'image',
    conversationId,
    CRAW_CHAT_MESSAGE_SCHEMA_AI_IMAGE_GENERATION,
    {
      prompt: options.prompt,
      status: options.status,
      model: options.model,
      revisedPrompt: options.revisedPrompt,
    },
    options,
  );
}

export function buildToolResultClientMessage(
  conversationId: string | number,
  options: ImCreateToolResultMessageOptions,
): ImClientMessage<'tool_result'> {
  return buildStructuredDataClientMessage(
    'tool_result',
    conversationId,
    CRAW_CHAT_MESSAGE_SCHEMA_TOOL_RESULT,
    {
      toolName: options.toolName,
      invocationId: options.invocationId,
      status: options.status,
      output: options.output,
      error: options.error,
    },
    options,
  );
}

export function buildWorkflowEventClientMessage(
  conversationId: string | number,
  options: ImCreateWorkflowEventMessageOptions,
): ImClientMessage<'workflow_event'> {
  return buildStructuredDataClientMessage(
    'workflow_event',
    conversationId,
    CRAW_CHAT_MESSAGE_SCHEMA_WORKFLOW_EVENT,
    {
      workflowId: options.workflowId,
      eventName: options.eventName,
      stage: options.stage,
      status: options.status,
      data: options.data,
    },
    options,
  );
}

export function buildAiVideoGenerationClientMessage(
  conversationId: string | number,
  options: ImCreateAiVideoGenerationMessageOptions,
): ImClientMessage<'ai_video_generation'> {
  return buildStructuredMediaClientMessage(
    'ai_video_generation',
    'video',
    conversationId,
    CRAW_CHAT_MESSAGE_SCHEMA_AI_VIDEO_GENERATION,
    {
      prompt: options.prompt,
      status: options.status,
      model: options.model,
      durationSeconds: options.durationSeconds,
    },
    options,
  );
}

export function buildJsonRtcSignalEnvelope(
  rtcSessionId: string | number,
  signalType: string,
  options: PostJsonRtcSignalOptions,
): ImInternalRtcSignalEnvelope<'json'> {
  return {
    kind: 'rtc_signal',
    transport: 'json',
    rtcSessionId,
    body: buildJsonRtcSignalRequest(signalType, options),
  };
}

function buildMediaContentPart(
  mediaType: MediaResourceType,
  options: {
    mediaAssetId?: string | number;
    resource?: MediaResource;
    schemaRef?: string;
    encoding?: string;
    payload?: string;
  },
): ContentPart {
  if (options.mediaAssetId == null && !options.resource) {
    throw new ImSdkError(
      'media_reference_required',
      `${mediaType} message requires mediaAssetId or resource`,
      {
        mediaType,
      },
    );
  }

  return omitUndefined({
    kind: 'media',
    schemaRef: options.schemaRef,
    encoding: options.encoding,
    payload: options.payload,
    mediaAssetId:
      options.mediaAssetId != null ? String(options.mediaAssetId) : undefined,
    resource: options.resource
      ? {
          ...options.resource,
          type: mediaType,
        }
      : {
          type: mediaType,
        },
  }) as ContentPart;
}

function buildStructuredDataClientMessage<TKind extends ImMessageKind>(
  kind: TKind,
  conversationId: string | number,
  schemaRef: string,
  payload: unknown,
  options: ImCreateStructuredMessageOptions,
): ImClientMessage<TKind> {
  return buildClientMessage(
    kind,
    conversationId,
    buildStructuredDataMessageRequest(schemaRef, payload, options),
    { channel: options.channel },
  );
}

function buildStructuredDataMessageRequest(
  schemaRef: string,
  payload: unknown,
  options: ImCreateStructuredMessageOptions,
): PostMessageRequest {
  const { text } = options;

  return {
    ...pickMessageRequestOptions(options),
    text,
    parts: [buildJsonDataContentPart(schemaRef, payload)],
  };
}

function buildStructuredMediaClientMessage<TKind extends ImMessageKind>(
  kind: TKind,
  mediaType: MediaResourceType,
  conversationId: string | number,
  schemaRef: string,
  payload: unknown,
  options:
    | ImCreateStickerMessageOptions
    | ImCreateVoiceMessageOptions
    | ImCreateAiImageGenerationMessageOptions
    | ImCreateAiVideoGenerationMessageOptions,
): ImClientMessage<TKind> {
  return buildClientMessage(
    kind,
    conversationId,
    buildStructuredMediaMessageRequest(mediaType, schemaRef, payload, options),
    { channel: options.channel },
  );
}

function buildStructuredMediaMessageRequest(
  mediaType: MediaResourceType,
  schemaRef: string,
  payload: unknown,
  options:
    | ImCreateStickerMessageOptions
    | ImCreateVoiceMessageOptions
    | ImCreateAiImageGenerationMessageOptions
    | ImCreateAiVideoGenerationMessageOptions,
): PostMessageRequest {
  const { text, mediaAssetId, resource } = options;

  return {
    ...pickMessageRequestOptions(options),
    text,
    parts: [
      buildJsonDataContentPart(schemaRef, payload),
      buildMediaContentPart(mediaType, {
        mediaAssetId,
        resource,
      }),
    ],
  };
}

function buildJsonDataContentPart(schemaRef: string, payload: unknown): ContentPart {
  return {
    kind: 'data',
    schemaRef,
    encoding: CRAW_CHAT_JSON_ENCODING,
    payload: JSON.stringify(payload ?? null),
  };
}

function pickMessageRequestOptions(
  options: ImCreateMessageOptions,
): Omit<PostMessageRequest, 'text' | 'parts'> {
  return omitUndefined({
    clientMsgId: options.clientMsgId,
    summary: options.summary,
    renderHints: options.renderHints,
  });
}

function resolveMessageChannel(
  channel?: ImMessageChannel,
): ImMessageChannel {
  return channel ?? DEFAULT_MESSAGE_CHANNEL;
}

function omitUndefined<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined),
  ) as T;
}
