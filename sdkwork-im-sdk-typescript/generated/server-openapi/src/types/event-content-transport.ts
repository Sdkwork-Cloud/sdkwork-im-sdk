export interface EventContentTransport {
  /** 事件类型 */
  type: string;
  /** 事件名称 */
  name?: string;
  /** 事件数据 */
  data?: Record<string, unknown>;
  /** 事件元数据 */
  metadata?: Record<string, unknown>;
}
