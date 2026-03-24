import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';


export class MessageSearchApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** 搜索消息 */
  async controller(params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/messages/search`), params);
  }

/** 快速搜索 */
  async controllerQuick(params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/messages/search/quick`), params);
  }

/** 搜索会话消息 */
  async controllerInConversation(params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/messages/search/conversation`), params);
  }

/** 消息统计 */
  async controllerGetStats(params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/messages/search/stats`), params);
  }
}

export function createMessageSearchApi(client: HttpClient): MessageSearchApi {
  return new MessageSearchApi(client);
}
