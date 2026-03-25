export interface RtcConnectionInfoRequestDto {
  channelId?: string;
  provider?: 'volcengine' | 'tencent' | 'alibaba' | 'livekit';
  /** Role used by cloud provider ACL */
  role?: string;
  expireSeconds?: number;
  /** Whether WuKongIM realtime token should be included in the response */
  includeRealtimeToken?: boolean;
}
