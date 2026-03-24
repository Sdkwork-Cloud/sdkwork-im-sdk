export type OpenChatConversationType = 'SINGLE' | 'GROUP' | string;
export type OpenChatMessageType = string;
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

export interface OpenChatRealtimeSession {
  uid: string;
  token: string;
  wsUrl: string;
  deviceId?: string;
  deviceFlag?: number | string;
  [key: string]: unknown;
}

export interface OpenChatRealtimeFrameBase {
  messageId?: string;
  conversation?: OpenChatConversationEnvelope;
  senderId?: string;
  channelId?: string;
  timestamp?: number;
  raw: Record<string, unknown>;
}

export interface OpenChatRealtimeMessageFrame extends OpenChatRealtimeFrameBase {
  message: OpenChatMessageEnvelope;
}

export interface OpenChatRealtimeEventFrame extends OpenChatRealtimeFrameBase {
  event: OpenChatEventTransport;
}

export type OpenChatRealtimeFrame =
  | OpenChatRealtimeMessageFrame
  | OpenChatRealtimeEventFrame;

export type RuntimeHandler = (payload?: unknown) => void;

export interface OpenChatWukongimRuntime {
  connect?(session: OpenChatRealtimeSession): Promise<unknown> | unknown;
  disconnect?(): Promise<unknown> | unknown;
  on?(event: string, handler: RuntimeHandler): void;
  off?(event: string, handler: RuntimeHandler): void;
}

export interface OpenChatWukongimAdapterConfig {
  runtime?: OpenChatWukongimRuntime;
  runtimeFactory?:
    | (() => Promise<OpenChatWukongimRuntime>)
    | (() => OpenChatWukongimRuntime);
  session?: OpenChatRealtimeSession;
}

export interface OpenChatWukongimAdapterLike {
  connect(session?: OpenChatRealtimeSession): Promise<OpenChatRealtimeSession>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  getSession(): OpenChatRealtimeSession | undefined;
  onMessage(listener: (frame: OpenChatRealtimeMessageFrame) => void): () => void;
  onEvent(listener: (frame: OpenChatRealtimeEventFrame) => void): () => void;
  onRaw(listener: (frame: OpenChatRealtimeFrame) => void): () => void;
  onConnectionStateChange(
    listener: (state: OpenChatConnectionState) => void,
  ): () => void;
}
