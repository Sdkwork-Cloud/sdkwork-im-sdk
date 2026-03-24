export interface RtcTokenValidationResultDto {
  /** Whether token is valid */
  valid: boolean;
  /** Room ID bound in token */
  roomId?: string;
  /** User ID bound in token */
  userId?: string;
  /** Resolved RTC provider */
  provider?: 'volcengine' | 'tencent' | 'alibaba' | 'livekit';
  /** Bound RTC channel ID */
  channelId?: string;
  /** Token role */
  role?: string;
  /** Token expiration timestamp */
  expiresAt?: string;
}
