export interface AckConversationSeqItemRequest {
  /** 目标ID（用户ID或群组ID） */
  targetId: string;
  /** 会话类型 */
  type: 'single' | 'group';
  /** 确认到的序列号 */
  ackSeq: number;
}
