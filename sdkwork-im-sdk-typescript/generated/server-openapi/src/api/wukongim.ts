import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';


export class WukongimApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** Get WuKongIM connection config */
  async wukongImappControllerGetConfig(): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/wukongim/config`));
  }

/** Get WuKongIM user token */
  async wukongImappControllerGetToken(): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/wukongim/token`));
  }
}

export function createWukongimApi(client: HttpClient): WukongimApi {
  return new WukongimApi(client);
}
