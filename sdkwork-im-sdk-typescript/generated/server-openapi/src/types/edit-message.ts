import type { MessageContent } from './message-content';

export interface EditMessage {
  /** 更新后的消息内容 */
  content: MessageContent;
  /** 编辑时附带的扩展数据 */
  extra?: Record<string, unknown>;
}
