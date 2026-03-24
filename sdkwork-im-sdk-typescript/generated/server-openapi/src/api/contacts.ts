import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';
import type { Contact, ContactControllerAddTagRequest, ContactControllerCreateRequest, ContactControllerGetByUserIdResponse, ContactControllerSearchResponse, ContactControllerSetFavoriteRequest, ContactControllerSetRemarkRequest, ContactControllerUpdateRequest } from '../types';


export class ContactsApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** 创建联系人 */
  async contactControllerCreate(body: ContactControllerCreateRequest): Promise<Contact> {
    return this.client.post<Contact>(backendApiPath(`/contacts`), body);
  }

/** 获取用户的联系人列表 */
  async contactControllerGetByUserId(params?: QueryParams): Promise<ContactControllerGetByUserIdResponse> {
    return this.client.get<ContactControllerGetByUserIdResponse>(backendApiPath(`/contacts`), params);
  }

/** 获取联系人详情 */
  async contactControllerGetById(id: string | number): Promise<Contact> {
    return this.client.get<Contact>(backendApiPath(`/contacts/${id}`));
  }

/** 更新联系人 */
  async contactControllerUpdate(id: string | number, body: ContactControllerUpdateRequest): Promise<Contact> {
    return this.client.put<Contact>(backendApiPath(`/contacts/${id}`), body);
  }

/** 删除联系人 */
  async contactControllerDelete(id: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/contacts/${id}`));
  }

/** 批量删除联系人 */
  async contactControllerBatchDelete(): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/contacts/batch`));
  }

/** 设置/取消收藏 */
  async contactControllerSetFavorite(id: string | number, body: ContactControllerSetFavoriteRequest): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/contacts/${id}/favorite`), body);
  }

/** 设置备注 */
  async contactControllerSetRemark(id: string | number, body: ContactControllerSetRemarkRequest): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/contacts/${id}/remark`), body);
  }

/** 添加标签 */
  async contactControllerAddTag(id: string | number, body: ContactControllerAddTagRequest): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/contacts/${id}/tags`), body);
  }

/** 移除标签 */
  async contactControllerRemoveTag(id: string | number, tag: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/contacts/${id}/tags/${tag}`));
  }

/** 搜索联系人 */
  async contactControllerSearch(userId: string | number, params?: QueryParams): Promise<ContactControllerSearchResponse> {
    return this.client.get<ContactControllerSearchResponse>(backendApiPath(`/contacts/search/${userId}`), params);
  }

/** 获取联系人统计 */
  async contactControllerGetStats(userId: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/contacts/stats/${userId}`));
  }
}

export function createContactsApi(client: HttpClient): ContactsApi {
  return new ContactsApi(client);
}
