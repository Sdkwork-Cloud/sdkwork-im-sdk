export interface ConversationEnvelope {
  /** 会话类型，统一使用大写枚举 */
  type: 'SINGLE' | 'GROUP';
  /** 会话目标ID，单聊为用户ID，群聊为群ID */
  targetId: string;
}
