export interface UpdateMessageStatus {
  /** 消息状态 */
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed' | 'recalled';
}
