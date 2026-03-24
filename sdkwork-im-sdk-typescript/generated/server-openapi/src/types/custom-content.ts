export interface CustomContent {
  /** 自定义消息类型标识 */
  customType: string;
  /** 自定义消息数据 */
  data?: Record<string, unknown>;
}
