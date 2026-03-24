export interface CreateRtcRoomDto {
  type: 'p2p' | 'group';
  /** Participants. Creator will be auto included. */
  participants: string[];
  name?: string;
  /** Explicit channel ID (higher priority than provider) */
  channelId?: string;
  /** Preferred provider: volcengine/tencent/alibaba/livekit */
  provider?: 'volcengine' | 'tencent' | 'alibaba' | 'livekit';
  /** Optional metadata used by future AI assistant orchestration */
  aiMetadata?: Record<string, unknown>;
}
