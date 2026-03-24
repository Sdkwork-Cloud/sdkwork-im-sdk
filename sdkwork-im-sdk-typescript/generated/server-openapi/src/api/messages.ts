import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';
import type { AckConversationSeqBatchRequest, AckConversationSeqRequest, BatchSendMessage, EditMessage, ForwardMessage, MarkMessagesRead, MessageReadMembersResponse, MessageUnreadMembersResponse, SendMessage, SetMessageReaction, UpdateMessageStatus } from '../types';


export class MessagesApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** 发送消息 */
  async messageControllerSend(body: SendMessage): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/messages`), body);
  }

/** 批量发送消息 */
  async messageControllerBatchSend(body: BatchSendMessage): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/messages/batch`), body);
  }

/** 获取用户消息列表 */
  async messageControllerGetByUserId(userId: string | number, params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/messages/user/${userId}`), params);
  }

/** 获取群组消息列表 */
  async messageControllerGetByGroupId(groupId: string | number, params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/messages/group/${groupId}`), params);
  }

/** 按序列号增量拉取会话消息 */
  async messageControllerGetHistoryBySeq(params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/messages/history/seq`), params);
  }

/** 确认会话同步序列（支持设备维度） */
  async messageControllerAckConversationSeq(body: AckConversationSeqRequest): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/messages/sync/ack-seq`), body);
  }

/** 批量确认会话同步序列（支持设备维度） */
  async messageControllerAckConversationSeqBatch(body: AckConversationSeqBatchRequest): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/messages/sync/ack-seq/batch`), body);
  }

/** 获取消息详情 */
  async messageControllerGetById(id: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/messages/${id}`));
  }

/** 删除消息 */
  async messageControllerDelete(id: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/messages/${id}`));
  }

/** 获取消息回执详情 */
  async messageControllerGetReceipts(id: string | number, params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/messages/${id}/receipts`), params);
  }

/** 获取消息回执统计 */
  async messageControllerGetReceiptSummary(id: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/messages/${id}/receipt-summary`));
  }

/** 获取群消息未读成员列表 */
  async messageControllerGetGroupUnreadMembers(id: string | number, params?: QueryParams): Promise<MessageUnreadMembersResponse> {
    return this.client.get<MessageUnreadMembersResponse>(backendApiPath(`/messages/${id}/unread-members`), params);
  }

/** 获取群消息已读成员列表 */
  async messageControllerGetGroupReadMembers(id: string | number, params?: QueryParams): Promise<MessageReadMembersResponse> {
    return this.client.get<MessageReadMembersResponse>(backendApiPath(`/messages/${id}/read-members`), params);
  }

/** 更新消息状态 */
  async messageControllerUpdateStatus(id: string | number, body: UpdateMessageStatus): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/messages/${id}/status`), body);
  }

/** 编辑消息内容 */
  async messageControllerEdit(id: string | number, body: EditMessage): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/messages/${id}/content`), body);
  }

/** 获取消息反应汇总 */
  async messageControllerGetReactionSummary(id: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/messages/${id}/reactions`));
  }

/** 设置消息反应 */
  async messageControllerSetReaction(id: string | number, body: SetMessageReaction): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/messages/${id}/reactions`), body);
  }

/** 标记群消息为已读 */
  async messageControllerMarkGroupAsRead(groupId: string | number, body: MarkMessagesRead): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/messages/group/${groupId}/read`), body);
  }

/** 标记消息为已读 */
  async messageControllerMarkAsRead(userId: string | number, body: MarkMessagesRead): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/messages/${userId}/read`), body);
  }

/** 撤回消息 */
  async messageControllerRecall(id: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/messages/${id}/recall`));
  }

/** 转发消息 */
  async messageControllerForward(id: string | number, body: ForwardMessage): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/messages/${id}/forward`), body);
  }

/** 重试发送失败的消息 */
  async messageControllerRetryFailed(id: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/messages/${id}/retry`));
  }
}

export function createMessagesApi(client: HttpClient): MessagesApi {
  return new MessagesApi(client);
}
