export interface GenerateRtcTokenDto {
  roomId: string;
  /** Optional, defaults to current user */
  userId?: string;
  channelId?: string;
  provider?: 'volcengine' | 'tencent' | 'alibaba' | 'livekit';
  /** Role used by cloud provider ACL */
  role?: string;
  expireSeconds?: number;
}
