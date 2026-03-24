export interface BotOpenWebhookResultResponseDto {
  /** 是否发送成功 */
  success: boolean;
  /** Webhook 响应状态码 */
  statusCode?: number;
  /** 错误信息 */
  error?: string;
  /** 重试次数 */
  retryCount: number;
  /** 耗时（毫秒） */
  latency: number;
}
