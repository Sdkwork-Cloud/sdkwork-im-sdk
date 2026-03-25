export type RTCCanonicalProvider = 'volcengine' | 'tencent' | 'alibaba' | 'livekit';
export type RTCDateValue = string | Date;
export type RTCRecordStatus = 'recording' | 'completed' | 'failed' | 'processing';
export type RTCRecordSyncStatus = 'pending' | 'synced' | 'failed';

export enum RTCRoomType {
  P2P = 'p2p',
  GROUP = 'group',
}

export interface RTCRoom {
  id: string;
  uuid?: string;
  name?: string;
  type: RTCRoomType;
  creatorId: string;
  participants: string[];
  status: 'active' | 'ended';
  channelId?: string;
  provider?: RTCCanonicalProvider;
  externalRoomId?: string;
  aiEnabled?: boolean;
  aiMetadata?: Record<string, any>;
  startedAt: RTCDateValue;
  endedAt?: RTCDateValue;
}

export interface RTCToken {
  id: string;
  uuid?: string;
  roomId: string;
  userId: string;
  channelId?: string;
  provider?: RTCCanonicalProvider;
  token: string;
  role?: string;
  metadata?: Record<string, any>;
  expiresAt: RTCDateValue;
  createdAt: RTCDateValue;
}

export interface RTCTokenValidationResult {
  valid: boolean;
  roomId?: string;
  userId?: string;
  provider?: RTCCanonicalProvider;
  channelId?: string;
  role?: string;
  expiresAt?: RTCDateValue;
}

export interface RTCVideoRecord {
  id: string;
  uuid?: string;
  roomId: string;
  channelId?: string;
  provider?: RTCCanonicalProvider;
  externalTaskId?: string;
  userId?: string;
  fileName?: string;
  filePath?: string;
  fileType?: string;
  fileSize?: number;
  startTime: RTCDateValue;
  endTime?: RTCDateValue;
  status: RTCRecordStatus;
  syncStatus?: RTCRecordSyncStatus;
  lastSyncedAt?: RTCDateValue;
  metadata?: Record<string, any>;
  errorMessage?: string;
  syncError?: string;
  createdAt: RTCDateValue;
  updatedAt: RTCDateValue;
}

export interface CreateRTCRoomParams {
  type: RTCRoomType;
  participants: string[];
  name?: string;
  channelId?: string;
  provider?: RTCCanonicalProvider;
  aiMetadata?: Record<string, any>;
}

export interface GenerateRTCTokenParams {
  roomId: string;
  userId?: string;
  channelId?: string;
  provider?: RTCCanonicalProvider;
  role?: string;
  expireSeconds?: number;
}

export interface CreateVideoRecordParams {
  roomId: string;
  userId?: string;
  fileName?: string;
  filePath?: string;
  fileType?: string;
  fileSize?: number;
  startTime: RTCDateValue;
  endTime?: RTCDateValue;
  status?: RTCRecordStatus;
  metadata?: Record<string, any>;
}

export interface StartRTCRecordingParams {
  taskId?: string;
  metadata?: Record<string, any>;
}

export interface StopRTCRecordingParams {
  recordId?: string;
  taskId?: string;
  metadata?: Record<string, any>;
}

export interface SyncRTCVideoRecordParams {
  roomId?: string;
  taskId?: string;
}

export interface UpdateVideoRecordStatusParams {
  status: RTCRecordStatus;
  errorMessage?: string;
}

export interface VideoRecordListQuery {
  limit?: number;
  offset?: number;
  status?: RTCRecordStatus;
  syncStatus?: RTCRecordSyncStatus;
}

export interface RTCProviderCapabilityItem {
  provider: RTCCanonicalProvider;
  configured: boolean;
  channelId?: string;
  supportsRecording: boolean;
  tokenStrategies: string[];
  supportsControlPlaneDelegate: boolean;
}

export interface RTCProviderCapabilitiesResponse {
  defaultProvider: RTCCanonicalProvider;
  recommendedPrimary?: RTCCanonicalProvider;
  fallbackOrder: RTCCanonicalProvider[];
  activeProviders: RTCCanonicalProvider[];
  providers: RTCProviderCapabilityItem[];
}

export interface RTCConnectionInfoParams {
  channelId?: string;
  provider?: RTCCanonicalProvider;
  role?: string;
  expireSeconds?: number;
  includeRealtimeToken?: boolean;
}

export interface RTCConnectionConversationTarget {
  conversationType: 'GROUP';
  targetId: string;
}

export interface RTCConnectionSignalingInfo {
  transport: 'WUKONGIM_EVENT';
  eventType: 'RTC_SIGNAL';
  namespace: 'rtc';
  roomId: string;
  directTargetField: string;
  broadcastConversation: RTCConnectionConversationTarget;
  directSignalTypes: Array<'offer' | 'answer' | 'ice-candidate'>;
  broadcastSignalTypes: Array<'join' | 'leave' | 'publish' | 'unpublish'>;
}

export interface RTCConnectionRealtimeInfo {
  transport: 'WUKONGIM';
  uid: string;
  wsUrl: string;
  token?: string;
  apiUrl?: string;
  managerUrl?: string;
  tcpAddr?: string;
}

export interface RTCConnectionProviderConfig {
  provider: RTCCanonicalProvider;
  channelId?: string;
  appId: string;
  providerRoomId: string;
  businessRoomId: string;
  userId: string;
  token: string;
  role?: string;
  expiresAt?: RTCDateValue;
  endpoint?: string;
  region?: string;
  extras?: Record<string, any>;
}

export interface RTCConnectionInfo {
  room: RTCRoom;
  rtcToken: RTCToken;
  providerConfig: RTCConnectionProviderConfig;
  signaling: RTCConnectionSignalingInfo;
  realtime: RTCConnectionRealtimeInfo;
}
