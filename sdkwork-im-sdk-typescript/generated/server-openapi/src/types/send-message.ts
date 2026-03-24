import type { ConversationEnvelope } from './conversation-envelope';
import type { EventContentTransport } from './event-content-transport';
import type { MessageContent } from './message-content';
import type { MessageEnvelope } from './message-envelope';

export interface SendMessage {
  /** 协议版本，新协议建议使用 2 */
  version?: number;
  /** 会话信息 */
  conversation?: ConversationEnvelope;
  /** 消息内容载体 */
  message?: MessageEnvelope;
  /** 事件内容 */
  event?: EventContentTransport;
  /** 消息UUID（客户端生成，用于去重） */
  uuid?: string;
  /** 消息类型 */
  type: 'text' | 'image' | 'audio' | 'video' | 'file' | 'location' | 'card' | 'custom' | 'system' | 'music' | 'document' | 'code' | 'ppt' | 'character' | 'model_3d';
  /** 消息内容，根据type不同结构不同 */
  content: MessageContent;
  /** 发送者用户ID */
  fromUserId: string;
  /** 接收者用户ID（单聊时必填） */
  toUserId?: string;
  /** 群组ID（群聊时必填） */
  groupId?: string;
  /** 回复的消息ID */
  replyToId?: string;
  /** 转发来源消息ID */
  forwardFromId?: string;
  /** 客户端序列号（用于消息去重） */
  clientSeq?: number;
  /** 幂等键（推荐，支持通过幂等键稳定推导 clientSeq） */
  idempotencyKey?: string;
  /** 扩展数据 */
  extra?: Record<string, unknown>;
  /** 是否需要已读回执 */
  needReadReceipt?: boolean;
}
