import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';
import type { BotOpenProfileResponseDto, BotOpenWebhookResultResponseDto, BotOpenWebhookStatsResponseDto, BotOpenWebhookTestEventRequestDto } from '../types';


export class BotsOpenApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** 获取当前 Bot 信息（Bot Token） */
  async botOpenControllerGetCurrent(): Promise<BotOpenProfileResponseDto> {
    return this.client.get<BotOpenProfileResponseDto>(backendApiPath(`/bots/open/me`));
  }

/** 获取当前 Bot 的 Webhook 统计（Bot Token） */
  async botOpenControllerGetWebhookStats(): Promise<BotOpenWebhookStatsResponseDto> {
    return this.client.get<BotOpenWebhookStatsResponseDto>(backendApiPath(`/bots/open/webhook/stats`));
  }

/** 触发当前 Bot 的 Webhook 测试事件（Bot Token） */
  async botOpenControllerSendWebhookTestEvent(body: BotOpenWebhookTestEventRequestDto): Promise<BotOpenWebhookResultResponseDto> {
    return this.client.post<BotOpenWebhookResultResponseDto>(backendApiPath(`/bots/open/webhook/test-event`), body);
  }
}

export function createBotsOpenApi(client: HttpClient): BotsOpenApi {
  return new BotsOpenApi(client);
}
