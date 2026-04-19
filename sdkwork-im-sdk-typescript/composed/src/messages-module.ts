import {
  buildAgentClientMessage,
  buildAgentHandoffClientMessage,
  buildAgentStateClientMessage,
  buildAiImageGenerationClientMessage,
  buildAiTextClientMessage,
  buildAiVideoGenerationClientMessage,
  buildCardClientMessage,
  buildContactClientMessage,
  buildCustomClientMessage,
  buildDataClientMessage,
  buildLinkClientMessage,
  buildLocationClientMessage,
  buildMediaClientMessage,
  buildMusicClientMessage,
  buildSignalClientMessage,
  buildStickerClientMessage,
  buildStreamReferenceClientMessage,
  buildTextClientMessage,
  buildToolResultClientMessage,
  buildVoiceClientMessage,
  buildWorkflowEventClientMessage,
  buildTextEditRequest,
} from './builders.js';
import { decodeMessageBody } from './message-codec.js';
import { performPresignedMediaUpload } from './media-upload-runtime.js';
import type {
  ImClientMessage,
  ImCreateAgentInput,
  ImCreateAgentHandoffInput,
  ImCreateAgentStateInput,
  ImCreateAiImageGenerationInput,
  ImCreateAiTextInput,
  ImCreateAiVideoGenerationInput,
  ImCreateCardInput,
  ImCreateContactInput,
  ImCreateCustomInput,
  ImCreateDataInput,
  ImCreateLinkInput,
  ImCreateLocationInput,
  ImCreateMediaInput,
  ImCreateMusicInput,
  ImCreateSignalInput,
  ImCreateStickerInput,
  ImCreateStreamReferenceInput,
  ImCreateTextInput,
  ImCreateToolResultInput,
  ImCreateVoiceInput,
  ImCreateWorkflowEventInput,
  ImDecodableMessageBody,
  ImDecodedMessage,
  ImMessageKind,
  ImUploadAndSendMessageOptions,
  ImUploadAndSendMessageResult,
  EditMessageRequest,
  EditTextMessageOptions,
  MessageMutationResult,
  PostMessageResult,
} from './types.js';
import type { ImSdkContext } from './sdk-context.js';

export class ImMessagesModule {
  constructor(private readonly context: ImSdkContext) {}

  createText(
    input: ImCreateTextInput,
  ): ImClientMessage<'text'> {
    return buildTextClientMessage(
      input.conversationId,
      input.text,
      withoutConversationId(input),
    );
  }

  createImage(
    input: ImCreateMediaInput,
  ): ImClientMessage<'image'> {
    return buildMediaClientMessage('image', input.conversationId, withoutConversationId(input));
  }

  createVideo(
    input: ImCreateMediaInput,
  ): ImClientMessage<'video'> {
    return buildMediaClientMessage('video', input.conversationId, withoutConversationId(input));
  }

  createAudio(
    input: ImCreateMediaInput,
  ): ImClientMessage<'audio'> {
    return buildMediaClientMessage('audio', input.conversationId, withoutConversationId(input));
  }

  createFile(
    input: ImCreateMediaInput,
  ): ImClientMessage<'file'> {
    return buildMediaClientMessage('file', input.conversationId, withoutConversationId(input));
  }

  createData(
    input: ImCreateDataInput,
  ): ImClientMessage<'data'> {
    return buildDataClientMessage(input.conversationId, withoutConversationId(input));
  }

  createSignal(
    input: ImCreateSignalInput,
  ): ImClientMessage<'signal'> {
    return buildSignalClientMessage(input.conversationId, withoutConversationId(input));
  }

  createStreamReference(
    input: ImCreateStreamReferenceInput,
  ): ImClientMessage<'stream_ref'> {
    return buildStreamReferenceClientMessage(
      input.conversationId,
      withoutConversationId(input),
    );
  }

  createLocation(
    input: ImCreateLocationInput,
  ): ImClientMessage<'location'> {
    return buildLocationClientMessage(input.conversationId, withoutConversationId(input));
  }

  createLink(
    input: ImCreateLinkInput,
  ): ImClientMessage<'link'> {
    return buildLinkClientMessage(input.conversationId, withoutConversationId(input));
  }

  createCard(
    input: ImCreateCardInput,
  ): ImClientMessage<'card'> {
    return buildCardClientMessage(input.conversationId, withoutConversationId(input));
  }

  createMusic(
    input: ImCreateMusicInput,
  ): ImClientMessage<'music'> {
    return buildMusicClientMessage(input.conversationId, withoutConversationId(input));
  }

  createContact(
    input: ImCreateContactInput,
  ): ImClientMessage<'contact'> {
    return buildContactClientMessage(input.conversationId, withoutConversationId(input));
  }

  createSticker(
    input: ImCreateStickerInput,
  ): ImClientMessage<'sticker'> {
    return buildStickerClientMessage(input.conversationId, withoutConversationId(input));
  }

  createVoice(
    input: ImCreateVoiceInput,
  ): ImClientMessage<'voice'> {
    return buildVoiceClientMessage(input.conversationId, withoutConversationId(input));
  }

  createAgent(
    input: ImCreateAgentInput,
  ): ImClientMessage<'agent'> {
    return buildAgentClientMessage(input.conversationId, withoutConversationId(input));
  }

  createAgentState(
    input: ImCreateAgentStateInput,
  ): ImClientMessage<'agent_state'> {
    return buildAgentStateClientMessage(input.conversationId, withoutConversationId(input));
  }

  createAgentHandoff(
    input: ImCreateAgentHandoffInput,
  ): ImClientMessage<'agent_handoff'> {
    return buildAgentHandoffClientMessage(input.conversationId, withoutConversationId(input));
  }

  createCustom(
    input: ImCreateCustomInput,
  ): ImClientMessage<'custom'> {
    return buildCustomClientMessage(input.conversationId, withoutConversationId(input));
  }

  createAiText(
    input: ImCreateAiTextInput,
  ): ImClientMessage<'ai_text'> {
    return buildAiTextClientMessage(input.conversationId, withoutConversationId(input));
  }

  createAiImageGeneration(
    input: ImCreateAiImageGenerationInput,
  ): ImClientMessage<'ai_image_generation'> {
    return buildAiImageGenerationClientMessage(
      input.conversationId,
      withoutConversationId(input),
    );
  }

  createAiVideoGeneration(
    input: ImCreateAiVideoGenerationInput,
  ): ImClientMessage<'ai_video_generation'> {
    return buildAiVideoGenerationClientMessage(
      input.conversationId,
      withoutConversationId(input),
    );
  }

  createToolResult(
    input: ImCreateToolResultInput,
  ): ImClientMessage<'tool_result'> {
    return buildToolResultClientMessage(input.conversationId, withoutConversationId(input));
  }

  createWorkflowEvent(
    input: ImCreateWorkflowEventInput,
  ): ImClientMessage<'workflow_event'> {
    return buildWorkflowEventClientMessage(input.conversationId, withoutConversationId(input));
  }

  decode(body: ImDecodableMessageBody): ImDecodedMessage {
    return decodeMessageBody(body);
  }

  send<TKind extends ImMessageKind>(
    message: ImClientMessage<TKind>,
  ): Promise<PostMessageResult> {
    if (message.target.channel === 'system') {
      return this.context.transportClient.conversation.publishSystemChannelMessage(
        message.target.conversationId,
        message.body,
      );
    }

    return this.context.transportClient.conversation.postConversationMessage(
      message.target.conversationId,
      message.body,
    );
  }

  async uploadAndSend<TKind extends ImMessageKind>(
    options: ImUploadAndSendMessageOptions<TKind>,
  ): Promise<ImUploadAndSendMessageResult<TKind>> {
    const uploaded = await performPresignedMediaUpload(this.context, options.upload);
    const message = options.createMessage(uploaded);
    const delivery = await this.send(message);

    return {
      ...uploaded,
      message,
      delivery,
    };
  }

  edit(
    messageId: string | number,
    body: EditMessageRequest,
  ): Promise<MessageMutationResult> {
    return this.context.transportClient.message.edit(messageId, body);
  }

  editText(
    messageId: string | number,
    text: string,
    options: EditTextMessageOptions = {},
  ): Promise<MessageMutationResult> {
    return this.edit(messageId, buildTextEditRequest(text, options));
  }

  recall(messageId: string | number): Promise<MessageMutationResult> {
    return this.context.transportClient.message.recall(messageId);
  }
}

function withoutConversationId<T extends { conversationId: string | number }>(
  input: T,
): Omit<T, 'conversationId'> {
  const { conversationId: _conversationId, ...rest } = input;
  return rest;
}
