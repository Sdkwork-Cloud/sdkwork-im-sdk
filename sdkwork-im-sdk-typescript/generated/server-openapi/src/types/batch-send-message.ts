import type { SendMessage } from './send-message';

export interface BatchSendMessage {
  /** 消息列表 */
  messages: SendMessage[];
}
