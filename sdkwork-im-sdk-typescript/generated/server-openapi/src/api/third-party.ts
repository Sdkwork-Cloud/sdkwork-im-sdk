import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';
import type { ThirdPartyMessage } from '../types';


export class ThirdPartyApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** 发送第三方平台消息 */
  async controllerSendMessage(platform: string | number, body: string): Promise<ThirdPartyMessage> {
    return this.client.post<ThirdPartyMessage>(backendApiPath(`/third-party/${platform}/messages`), body);
  }

/** 获取第三方平台消息状态 */
  async controllerGetMessageStatus(platform: string | number, id: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/third-party/${platform}/messages/${id}/status`));
  }

/** 同步第三方平台联系人 */
  async controllerSyncContacts(platform: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/third-party/${platform}/contacts/sync`));
  }

/** 获取第三方平台联系人 */
  async controllerGetContact(platform: string | number, params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/third-party/${platform}/contacts`), params);
  }
}

export function createThirdPartyApi(client: HttpClient): ThirdPartyApi {
  return new ThirdPartyApi(client);
}
