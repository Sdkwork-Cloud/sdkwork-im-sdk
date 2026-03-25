export interface RtcConnectionProviderConfigDto {
  provider: 'volcengine' | 'tencent' | 'alibaba' | 'livekit';
  channelId?: string;
  /** Provider client appId/sdkAppId/serverUrl identity exposed to the client SDK */
  appId: string;
  /** Provider-side room identifier used by the RTC media SDK when joining the room */
  providerRoomId: string;
  /** Business room identifier used by OpenChat app APIs and signaling */
  businessRoomId: string;
  userId: string;
  token: string;
  role?: string;
  expiresAt?: string;
  endpoint?: string;
  region?: string;
  /** Sanitized client-safe provider extension configuration for future SDK expansion */
  extras?: Record<string, unknown>;
}
