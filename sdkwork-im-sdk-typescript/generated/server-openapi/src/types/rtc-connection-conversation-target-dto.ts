export interface RtcConnectionConversationTargetDto {
  conversationType: 'GROUP';
  /** Conversation targetId used for room-scoped broadcast events */
  targetId: string;
}
