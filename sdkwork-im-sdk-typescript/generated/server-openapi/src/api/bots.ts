import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';
import type { CreateBotDto, SetWebhookDto, UpdateBotDto } from '../types';


export class BotsApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** 创建 Bot */
  async botControllerCreate(body: CreateBotDto): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/bots`), body);
  }

/** 获取 Bot 列表 */
  async botControllerGet(params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/bots`), params);
  }

/** 获取 Bot 详情 */
  async botControllerGetById(id: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/bots/${id}`));
  }

/** 更新 Bot */
  async botControllerUpdate(id: string | number, body: UpdateBotDto): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/bots/${id}`), body);
  }

/** 删除 Bot */
  async botControllerDelete(id: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/bots/${id}`));
  }

/** 重新生成 Bot Token */
  async botControllerRegenerateToken(id: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/bots/${id}/regenerate-token`));
  }

/** 设置 Webhook */
  async botControllerSetWebhook(id: string | number, body: SetWebhookDto): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/bots/${id}/webhook`), body);
  }

/** 删除 Webhook */
  async botControllerDeleteWebhook(id: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/bots/${id}/webhook`));
  }
}

export function createBotsApi(client: HttpClient): BotsApi {
  return new BotsApi(client);
}
