import type { RtcConnectionProviderConfigDto } from './rtc-connection-provider-config-dto';
import type { RtcConnectionRealtimeDto } from './rtc-connection-realtime-dto';
import type { RtcConnectionSignalingDto } from './rtc-connection-signaling-dto';
import type { RTCRoom } from './rtcroom';
import type { RTCToken } from './rtctoken';

export interface RtcConnectionInfoResponseDto {
  room: RTCRoom;
  rtcToken: RTCToken;
  providerConfig: RtcConnectionProviderConfigDto;
  signaling: RtcConnectionSignalingDto;
  realtime: RtcConnectionRealtimeDto;
}
