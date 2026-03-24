export interface SystemContent {
  /** 系统消息类型 */
  type: string;
  /** 系统消息内容 */
  data?: Record<string, unknown>;
}
