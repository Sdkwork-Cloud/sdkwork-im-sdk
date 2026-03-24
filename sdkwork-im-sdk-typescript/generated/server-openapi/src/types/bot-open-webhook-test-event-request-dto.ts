export interface BotOpenWebhookTestEventRequestDto {
  /** 事件类型，不传则默认 bot.webhook.test */
  eventType?: string;
  /** 测试事件负载 */
  data?: Record<string, unknown>;
}
