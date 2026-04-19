import { ImAuthModule } from './auth-module.js';
import { ImConversationsModule } from './conversations-module.js';
import { ImLiveModule } from './live-module.js';
import { ImMediaModule } from './media-module.js';
import { ImMessagesModule } from './messages-module.js';
import { ImRtcModule } from './rtc-module.js';
import { ImSdkContext, resolveImClientOptions } from './sdk-context.js';
import { ImSyncModule } from './sync-module.js';
import type {
  DeviceApi,
  InboxApi,
  PortalApi,
  PresenceApi,
  RealtimeApi,
  SessionApi,
  StreamApi,
} from '#generated-sdk';
import type {
  ImClientMessage,
  ImConnectOptions,
  ImCreateAgentHandoffInput,
  ImCreateAgentInput,
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
  ImDecodedMessage,
  ImDecodableMessageBody,
  ImLiveConnection,
  ImMessageKind,
  ImMediaUploadOptions,
  ImSdkClientOptions,
  ImUploadedMediaAsset,
  ImUploadAndSendMessageOptions,
  ImUploadAndSendMessageResult,
  EditMessageRequest,
  EditTextMessageOptions,
  MessageMutationResult,
  PostMessageResult,
} from './types.js';

type ImPortalApi = Pick<
  PortalApi,
  | 'getHome'
  | 'getAuth'
  | 'getWorkspace'
  | 'getDashboard'
  | 'getConversations'
  | 'getRealtime'
  | 'getMedia'
  | 'getAutomation'
  | 'getGovernance'
>;

type ImSessionApi = Pick<SessionApi, 'resume' | 'disconnect'>;

type ImPresenceApi = Pick<PresenceApi, 'heartbeat' | 'getPresenceMe'>;

type ImRealtimeApi = Pick<
  RealtimeApi,
  'syncRealtimeSubscriptions' | 'listRealtimeEvents' | 'ackRealtimeEvents'
>;

type ImDeviceApi = Pick<DeviceApi, 'register' | 'getDeviceSyncFeed'>;

type ImInboxApi = Pick<InboxApi, 'getInbox'>;

type ImStreamApi = Pick<
  StreamApi,
  | 'open'
  | 'listStreamFrames'
  | 'appendStreamFrame'
  | 'checkpoint'
  | 'complete'
  | 'abort'
>;

export class ImSdkClient {
  private readonly context: ImSdkContext;

  readonly auth: ImAuthModule;
  readonly portal: ImPortalApi;
  readonly session: ImSessionApi;
  readonly presence: ImPresenceApi;
  readonly realtime: ImRealtimeApi;
  readonly device: ImDeviceApi;
  readonly inbox: ImInboxApi;
  readonly conversations: ImConversationsModule;
  readonly messages: ImMessagesModule;
  readonly media: ImMediaModule;
  readonly live: ImLiveModule;
  readonly sync: ImSyncModule;
  readonly stream: ImStreamApi;
  readonly rtc: ImRtcModule;

  constructor(options: ImSdkClientOptions) {
    const resolved = resolveImClientOptions(options);
    const transportClient = resolved.transportClient;
    this.context = new ImSdkContext(
      transportClient,
      resolved.transport,
      resolved.webSocketFactory,
      resolved.authToken,
    );
    this.auth = new ImAuthModule(this.context);
    this.portal = transportClient.portal;
    this.session = transportClient.session;
    this.presence = transportClient.presence;
    this.realtime = transportClient.realtime;
    this.device = transportClient.device;
    this.inbox = transportClient.inbox;
    this.conversations = new ImConversationsModule(this.context);
    this.messages = new ImMessagesModule(this.context);
    this.media = new ImMediaModule(this.context);
    this.live = new ImLiveModule(this.context);
    this.sync = new ImSyncModule(this.context);
    this.stream = transportClient.stream;
    this.rtc = new ImRtcModule(this.context);
  }

  getApiBaseUrl(): string | undefined {
    return this.context.getApiBaseUrl();
  }

  getWebSocketBaseUrl(): string | undefined {
    return this.context.getWebSocketBaseUrl();
  }

  resolveRealtimeWebSocketUrl(path?: string): string | undefined {
    return this.context.resolveRealtimeWebSocketUrl(path);
  }

  createTextMessage(input: ImCreateTextInput) {
    return this.messages.createText(input);
  }

  createImageMessage(input: ImCreateMediaInput) {
    return this.messages.createImage(input);
  }

  createVideoMessage(input: ImCreateMediaInput) {
    return this.messages.createVideo(input);
  }

  createAudioMessage(input: ImCreateMediaInput) {
    return this.messages.createAudio(input);
  }

  createFileMessage(input: ImCreateMediaInput) {
    return this.messages.createFile(input);
  }

  createDataMessage(input: ImCreateDataInput) {
    return this.messages.createData(input);
  }

  createSignalMessage(input: ImCreateSignalInput) {
    return this.messages.createSignal(input);
  }

  createStreamReferenceMessage(input: ImCreateStreamReferenceInput) {
    return this.messages.createStreamReference(input);
  }

  createLocationMessage(input: ImCreateLocationInput) {
    return this.messages.createLocation(input);
  }

  createLinkMessage(input: ImCreateLinkInput) {
    return this.messages.createLink(input);
  }

  createCardMessage(input: ImCreateCardInput) {
    return this.messages.createCard(input);
  }

  createMusicMessage(input: ImCreateMusicInput) {
    return this.messages.createMusic(input);
  }

  createContactMessage(input: ImCreateContactInput) {
    return this.messages.createContact(input);
  }

  createStickerMessage(input: ImCreateStickerInput) {
    return this.messages.createSticker(input);
  }

  createVoiceMessage(input: ImCreateVoiceInput) {
    return this.messages.createVoice(input);
  }

  createAgentMessage(input: ImCreateAgentInput) {
    return this.messages.createAgent(input);
  }

  createAgentStateMessage(input: ImCreateAgentStateInput) {
    return this.messages.createAgentState(input);
  }

  createAgentHandoffMessage(input: ImCreateAgentHandoffInput) {
    return this.messages.createAgentHandoff(input);
  }

  createCustomMessage(input: ImCreateCustomInput) {
    return this.messages.createCustom(input);
  }

  createAiTextMessage(input: ImCreateAiTextInput) {
    return this.messages.createAiText(input);
  }

  createAiImageGenerationMessage(input: ImCreateAiImageGenerationInput) {
    return this.messages.createAiImageGeneration(input);
  }

  createAiVideoGenerationMessage(input: ImCreateAiVideoGenerationInput) {
    return this.messages.createAiVideoGeneration(input);
  }

  createToolResultMessage(input: ImCreateToolResultInput) {
    return this.messages.createToolResult(input);
  }

  createWorkflowEventMessage(input: ImCreateWorkflowEventInput) {
    return this.messages.createWorkflowEvent(input);
  }

  decodeMessage(body: ImDecodableMessageBody): ImDecodedMessage {
    return this.messages.decode(body);
  }

  send<TKind extends ImMessageKind>(
    message: ImClientMessage<TKind>,
  ): Promise<PostMessageResult> {
    return this.messages.send(message);
  }

  upload(options: ImMediaUploadOptions): Promise<ImUploadedMediaAsset> {
    return this.media.upload(options);
  }

  uploadAndSendMessage<TKind extends ImMessageKind>(
    options: ImUploadAndSendMessageOptions<TKind>,
  ): Promise<ImUploadAndSendMessageResult<TKind>> {
    return this.messages.uploadAndSend(options);
  }

  editMessage(
    messageId: string | number,
    body: EditMessageRequest,
  ): Promise<MessageMutationResult> {
    return this.messages.edit(messageId, body);
  }

  editTextMessage(
    messageId: string | number,
    text: string,
    options: EditTextMessageOptions = {},
  ): Promise<MessageMutationResult> {
    return this.messages.editText(messageId, text, options);
  }

  recallMessage(messageId: string | number): Promise<MessageMutationResult> {
    return this.messages.recall(messageId);
  }

  connect(options: ImConnectOptions = {}): Promise<ImLiveConnection> {
    return this.live.connect(options);
  }
}

export default ImSdkClient;
