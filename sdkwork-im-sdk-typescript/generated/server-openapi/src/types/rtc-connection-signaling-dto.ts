import type { RtcConnectionConversationTargetDto } from './rtc-connection-conversation-target-dto';

export interface RtcConnectionSignalingDto {
  transport: 'WUKONGIM_EVENT';
  eventType: 'RTC_SIGNAL';
  namespace: 'rtc';
  /** Business room id used for RTC signaling routing */
  roomId: string;
  /** Field name used for direct peer routing when sending one-to-one RTC signaling events */
  directTargetField: string;
  broadcastConversation: RtcConnectionConversationTargetDto;
  /** RTC signaling types that should be routed directly to a peer */
  directSignalTypes: 'offer' | 'answer' | 'ice-candidate'[];
  /** RTC signaling/event types that should be broadcast to the room conversation */
  broadcastSignalTypes: 'join' | 'leave' | 'publish' | 'unpublish'[];
}
