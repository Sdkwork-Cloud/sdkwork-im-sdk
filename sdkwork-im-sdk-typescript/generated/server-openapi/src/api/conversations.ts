import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';
import type { Conversation, ConversationControllerCreateRequest, ConversationControllerGetByUserIdResponse, ConversationControllerGetSyncStatesRequest, ConversationControllerMuteRequest, ConversationControllerPinRequest, ConversationControllerUpdateRequest } from '../types';


export class ConversationsApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** 创建会话 */
  async conversationControllerCreate(body: ConversationControllerCreateRequest): Promise<Conversation> {
    return this.client.post<Conversation>(backendApiPath(`/conversations`), body);
  }

/** 获取用户的会话列表 */
  async conversationControllerGetByUserId(params?: QueryParams): Promise<ConversationControllerGetByUserIdResponse> {
    return this.client.get<ConversationControllerGetByUserIdResponse>(backendApiPath(`/conversations`), params);
  }

/** 获取会话同步状态 */
  async conversationControllerGetSyncState(params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/conversations/sync-state`), params);
  }

/** 批量获取会话同步状态 */
  async conversationControllerGetSyncStates(body: ConversationControllerGetSyncStatesRequest): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/conversations/sync-state/batch`), body);
  }

/** 删除设备会话读游标 */
  async conversationControllerDeleteDeviceSyncState(deviceId: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/conversations/sync-state/device/${deviceId}`));
  }

/** 获取设备会话游标摘要 */
  async conversationControllerGetDeviceSyncStateSummaries(params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/conversations/sync-state/devices`), params);
  }

/** 清理失活设备会话游标 */
  async conversationControllerDeleteStaleDeviceSyncStates(params?: QueryParams): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/conversations/sync-state/devices/stale`), params);
  }

/** 获取用户与特定目标的会话 */
  async conversationControllerGetByTarget(targetId: string | number, params?: QueryParams): Promise<Conversation> {
    return this.client.get<Conversation>(backendApiPath(`/conversations/target/${targetId}`), params);
  }

/** 获取未读消息总数 */
  async conversationControllerGetTotalUnreadCount(): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/conversations/unread-total/me`));
  }

/** 获取会话详情 */
  async conversationControllerGetById(id: string | number): Promise<Conversation> {
    return this.client.get<Conversation>(backendApiPath(`/conversations/${id}`));
  }

/** 更新会话 */
  async conversationControllerUpdate(id: string | number, body: ConversationControllerUpdateRequest): Promise<Conversation> {
    return this.client.put<Conversation>(backendApiPath(`/conversations/${id}`), body);
  }

/** 删除会话 */
  async conversationControllerDelete(id: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/conversations/${id}`));
  }

/** 置顶/取消置顶会话 */
  async conversationControllerPin(id: string | number, body: ConversationControllerPinRequest): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/conversations/${id}/pin`), body);
  }

/** 设置免打扰 */
  async conversationControllerMute(id: string | number, body: ConversationControllerMuteRequest): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/conversations/${id}/mute`), body);
  }

/** 清空未读消息数 */
  async conversationControllerClearUnreadCount(id: string | number): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/conversations/${id}/read`));
  }

/** 批量删除会话 */
  async conversationControllerBatchDelete(): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/conversations/batch`));
  }
}

export function createConversationsApi(client: HttpClient): ConversationsApi {
  return new ConversationsApi(client);
}
