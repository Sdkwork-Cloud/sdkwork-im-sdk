import type { AckConversationSeqItemRequest } from './ack-conversation-seq-item-request';

export interface AckConversationSeqBatchRequest {
  /** 会话 ACK 列表 */
  items: AckConversationSeqItemRequest[];
  /** 设备ID（用于多端独立同步游标） */
  deviceId?: string;
}
