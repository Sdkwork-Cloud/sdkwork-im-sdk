import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';
import type { UpdateProfileDto } from '../types';


export class UsersApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** 获取当前用户信息 */
  async userControllerGetCurrent(): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/users/me`));
  }

/** 获取用户详情 */
  async userControllerGetById(id: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/users/${id}`));
  }

/** 更新用户资料 */
  async userControllerUpdate(id: string | number, body: UpdateProfileDto): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/users/${id}`), body);
  }

/** 搜索用户 */
  async userControllerSearch(params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/users`), params);
  }
}

export function createUsersApi(client: HttpClient): UsersApi {
  return new UsersApi(client);
}
