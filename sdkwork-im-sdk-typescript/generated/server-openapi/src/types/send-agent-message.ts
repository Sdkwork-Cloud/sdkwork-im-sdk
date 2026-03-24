export interface SendAgentMessage {
  /** 消息内容 */
  content: string;
  /** 是否流式输出 */
  stream?: boolean;
}
