export interface ForwardMessage {
  /** 原消息ID */
  messageId: string;
  /** 转发目标用户ID列表 */
  toUserIds: string[];
  /** 转发目标群组ID列表 */
  toGroupIds?: string[];
}
