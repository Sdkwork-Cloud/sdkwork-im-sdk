export interface BotOpenWebhookStatsResponseDto {
  /** 是否已配置 webhook */
  configured: boolean;
  /** Webhook URL */
  url?: string;
  /** 订阅的事件列表 */
  events: string[];
  /** 待重试任务数量 */
  pendingRetries: number;
}
