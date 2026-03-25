export type OpenChatConversationType = 'SINGLE' | 'GROUP' | string;
export type OpenChatMessageType =
  | 'TEXT'
  | 'IMAGE'
  | 'AUDIO'
  | 'VIDEO'
  | 'FILE'
  | 'LOCATION'
  | 'CARD'
  | 'CUSTOM'
  | 'SYSTEM'
  | 'MUSIC'
  | 'DOCUMENT'
  | 'CODE'
  | 'PPT'
  | 'CHARACTER'
  | 'MODEL_3D'
  | string;
export type OpenChatConnectionState =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'error';

export interface OpenChatConversationEnvelope {
  type?: OpenChatConversationType;
  targetId?: string;
}

export interface OpenChatMessageEnvelope {
  type?: OpenChatMessageType;
  text?: Record<string, unknown>;
  image?: Record<string, unknown>;
  audio?: Record<string, unknown>;
  video?: Record<string, unknown>;
  file?: Record<string, unknown>;
  location?: Record<string, unknown>;
  card?: Record<string, unknown>;
  custom?: Record<string, unknown>;
  system?: Record<string, unknown>;
  music?: Record<string, unknown>;
  document?: Record<string, unknown>;
  code?: Record<string, unknown>;
  ppt?: Record<string, unknown>;
  character?: Record<string, unknown>;
  model3d?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface OpenChatEventTransport {
  type: string;
  name?: string;
  data?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface OpenChatSendRequest {
  version?: number;
  conversation: OpenChatConversationEnvelope;
  message?: OpenChatMessageEnvelope;
  event?: OpenChatEventTransport;
  uuid?: string;
  replyToId?: string;
  forwardFromId?: string;
  clientSeq?: number;
  idempotencyKey?: string;
  extra?: Record<string, unknown>;
  needReadReceipt?: boolean;
}

export interface OpenChatSendResult {
  accepted: true;
  payload: OpenChatSendRequest;
}

export interface OpenChatRealtimeSession {
  uid: string;
  token: string;
  wsUrl: string;
  deviceId?: string;
  deviceFlag?: number | string;
  [key: string]: unknown;
}

export interface OpenChatRealtimeMessageFrame {
  messageId?: string;
  conversation?: OpenChatConversationEnvelope;
  message: OpenChatMessageEnvelope;
  senderId?: string;
  channelId?: string;
  timestamp?: number;
  raw: Record<string, unknown>;
}

export interface OpenChatRealtimeEventFrame {
  messageId?: string;
  conversation?: OpenChatConversationEnvelope;
  event: OpenChatEventTransport;
  senderId?: string;
  channelId?: string;
  timestamp?: number;
  raw: Record<string, unknown>;
}

export interface OpenChatRealtimeAdapterLike {
  connect(session?: OpenChatRealtimeSession): Promise<OpenChatRealtimeSession>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  getSession(): OpenChatRealtimeSession | undefined;
  onMessage(listener: (frame: OpenChatRealtimeMessageFrame) => void): () => void;
  onEvent(listener: (frame: OpenChatRealtimeEventFrame) => void): () => void;
  onRaw(
    listener:
      | ((frame: OpenChatRealtimeMessageFrame) => void)
      | ((frame: OpenChatRealtimeEventFrame) => void),
  ): () => void;
  onConnectionStateChange(
    listener: (state: OpenChatConnectionState) => void,
  ): () => void;
}

export interface OpenChatBackendHttpLike {
  get<T = unknown>(
    path: string,
    params?: Record<string, unknown>,
  ): Promise<T>;
  post<T = unknown>(
    path: string,
    body?: unknown,
    params?: Record<string, unknown>,
  ): Promise<T>;
  put?<T = unknown>(
    path: string,
    body?: unknown,
    params?: Record<string, unknown>,
  ): Promise<T>;
  delete?<T = unknown>(
    path: string,
    params?: Record<string, unknown>,
  ): Promise<T>;
  request?<T = unknown>(
    path: string,
    options?: {
      method?: string;
      body?: unknown;
      params?: Record<string, unknown>;
    },
  ): Promise<T>;
}

export interface OpenChatBackendClientLike {
  setAuthToken?(token: string): unknown;
  setAccessToken?(token: string): unknown;
  http?: OpenChatBackendHttpLike;
  auth?: Record<string, (...args: unknown[]) => Promise<unknown>>;
  messages?: Record<string, (...args: unknown[]) => Promise<unknown>>;
  friends?: Record<string, (...args: unknown[]) => Promise<unknown>>;
  conversations?: Record<string, (...args: unknown[]) => Promise<unknown>>;
  groups?: Record<string, (...args: unknown[]) => Promise<unknown>>;
  contacts?: Record<string, (...args: unknown[]) => Promise<unknown>>;
  rtc?: Record<string, (...args: unknown[]) => Promise<unknown>>;
}

export interface OpenChatConversationSelector {
  conversation?: OpenChatConversationEnvelope;
  toUserId?: string;
  groupId?: string;
}

export interface OpenChatSendOptionsBase extends OpenChatConversationSelector {
  uuid?: string;
  replyToId?: string;
  forwardFromId?: string;
  clientSeq?: number;
  idempotencyKey?: string;
  extra?: Record<string, unknown>;
  needReadReceipt?: boolean;
}

export interface OpenChatSendTextOptions extends OpenChatSendOptionsBase {
  text: string;
  mentions?: string[];
  mentionAll?: boolean;
  annotations?: Record<string, unknown>;
}

export interface OpenChatSendMediaOptions<T extends Record<string, unknown>>
  extends OpenChatSendOptionsBase {
  resource: T;
}

export interface OpenChatSendUserCardOptions
  extends OpenChatSendOptionsBase {
  resource: {
    userId: string;
    nickname?: string;
    avatar?: string;
    signature?: string;
    [key: string]: unknown;
  };
}

export interface OpenChatSendCombinedOptions
  extends OpenChatSendOptionsBase {
  resources: Array<Record<string, unknown>>;
  caption?: string;
}

export interface OpenChatPublishEventOptions
  extends OpenChatSendOptionsBase {
  type: string;
  name?: string;
  data?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface OpenChatRtcSignalOptions {
  roomId: string;
  toUserId?: string;
  groupId?: string;
  sessionId?: string;
  correlationId?: string;
  payload?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  uuid?: string;
  replyToId?: string;
  forwardFromId?: string;
  clientSeq?: number;
  idempotencyKey?: string;
  extra?: Record<string, unknown>;
}

export interface OpenChatRtcConnectionRequest {
  channelId?: string;
  provider?: string;
  role?: string;
  expireSeconds?: number;
  includeRealtimeToken?: boolean;
}

export interface OpenChatRtcConversationTarget {
  conversationType: string;
  targetId: string;
}

export interface OpenChatRtcSignalingInfo {
  transport: string;
  eventType: string;
  namespace: string;
  roomId: string;
  directTargetField: string;
  broadcastConversation?: OpenChatRtcConversationTarget;
  directSignalTypes: string[];
  broadcastSignalTypes: string[];
}

export interface OpenChatRtcRealtimeInfo {
  transport: string;
  uid: string;
  wsUrl: string;
  token?: string;
  apiUrl?: string;
  managerUrl?: string;
  tcpAddr?: string;
}

export interface OpenChatRtcProviderConfig {
  provider: string;
  channelId?: string;
  appId: string;
  providerRoomId: string;
  businessRoomId: string;
  userId: string;
  token: string;
  role?: string;
  expiresAt?: string;
  endpoint?: string;
  region?: string;
  extras?: Record<string, unknown>;
}

export interface OpenChatRtcConnectionInfo {
  room?: Record<string, unknown>;
  rtcToken?: Record<string, unknown>;
  providerConfig: OpenChatRtcProviderConfig;
  signaling: OpenChatRtcSignalingInfo;
  realtime: OpenChatRtcRealtimeInfo;
}

export interface OpenChatRtcCustomSignalOptions
  extends OpenChatRtcSignalOptions {
  eventName: string;
  signalType: string;
}

export interface OpenChatRtcOfferOptions extends OpenChatRtcSignalOptions {
  toUserId: string;
  sdp: string;
}

export interface OpenChatRtcAnswerOptions extends OpenChatRtcSignalOptions {
  toUserId: string;
  sdp: string;
}

export interface OpenChatRtcIceCandidateOptions
  extends OpenChatRtcSignalOptions {
  toUserId: string;
  candidate: Record<string, unknown>;
}

export interface OpenChatAuthSession {
  user?: Record<string, unknown>;
  token?: string;
  refreshToken?: string;
  expiresIn?: number;
  realtime?: OpenChatRealtimeSession;
}

export interface OpenChatImSdkOptions {
  backendClient: OpenChatBackendClientLike;
  realtimeAdapter?: OpenChatRealtimeAdapterLike;
}

export interface OpenChatImSdkCreateOptions {
  backendClient?: OpenChatBackendClientLike;
  backendConfig?: Record<string, unknown>;
  realtimeAdapter?: OpenChatRealtimeAdapterLike;
  realtimeConfig?: Record<string, unknown>;
}
