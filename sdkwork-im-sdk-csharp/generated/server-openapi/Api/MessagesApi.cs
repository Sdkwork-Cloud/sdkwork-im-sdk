using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class MessagesApi
    {
        private readonly HttpClient _client;

        public MessagesApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// 发送消息
        /// </summary>
        public async Task MessageControllerSendAsync(SendMessage body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/messages"), body);
        }

        /// <summary>
        /// 批量发送消息
        /// </summary>
        public async Task MessageControllerBatchSendAsync(BatchSendMessage body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/messages/batch"), body);
        }

        /// <summary>
        /// 获取用户消息列表
        /// </summary>
        public async Task MessageControllerGetByUserIdAsync(string userId, Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/messages/user/{userId}"), query);
        }

        /// <summary>
        /// 获取群组消息列表
        /// </summary>
        public async Task MessageControllerGetByGroupIdAsync(string groupId, Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/messages/group/{groupId}"), query);
        }

        /// <summary>
        /// 按序列号增量拉取会话消息
        /// </summary>
        public async Task MessageControllerGetHistoryBySeqAsync(Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/messages/history/seq"), query);
        }

        /// <summary>
        /// 确认会话同步序列（支持设备维度）
        /// </summary>
        public async Task MessageControllerAckConversationSeqAsync(AckConversationSeqRequest body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/messages/sync/ack-seq"), body);
        }

        /// <summary>
        /// 批量确认会话同步序列（支持设备维度）
        /// </summary>
        public async Task MessageControllerAckConversationSeqBatchAsync(AckConversationSeqBatchRequest body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/messages/sync/ack-seq/batch"), body);
        }

        /// <summary>
        /// 获取消息详情
        /// </summary>
        public async Task MessageControllerGetByIdAsync(string id)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/messages/{id}"));
        }

        /// <summary>
        /// 删除消息
        /// </summary>
        public async Task MessageControllerDeleteAsync(string id)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/messages/{id}"));
        }

        /// <summary>
        /// 获取消息回执详情
        /// </summary>
        public async Task MessageControllerGetReceiptsAsync(string id, Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/messages/{id}/receipts"), query);
        }

        /// <summary>
        /// 获取消息回执统计
        /// </summary>
        public async Task MessageControllerGetReceiptSummaryAsync(string id)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/messages/{id}/receipt-summary"));
        }

        /// <summary>
        /// 获取群消息未读成员列表
        /// </summary>
        public async Task<MessageUnreadMembersResponse?> MessageControllerGetGroupUnreadMembersAsync(string id, Dictionary<string, object>? query = null)
        {
            return await _client.GetAsync<MessageUnreadMembersResponse>(ApiPaths.BackendPath($"/messages/{id}/unread-members"), query);
        }

        /// <summary>
        /// 获取群消息已读成员列表
        /// </summary>
        public async Task<MessageReadMembersResponse?> MessageControllerGetGroupReadMembersAsync(string id, Dictionary<string, object>? query = null)
        {
            return await _client.GetAsync<MessageReadMembersResponse>(ApiPaths.BackendPath($"/messages/{id}/read-members"), query);
        }

        /// <summary>
        /// 更新消息状态
        /// </summary>
        public async Task MessageControllerUpdateStatusAsync(string id, UpdateMessageStatus body)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath($"/messages/{id}/status"), body);
        }

        /// <summary>
        /// 编辑消息内容
        /// </summary>
        public async Task MessageControllerEditAsync(string id, EditMessage body)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath($"/messages/{id}/content"), body);
        }

        /// <summary>
        /// 获取消息反应汇总
        /// </summary>
        public async Task MessageControllerGetReactionSummaryAsync(string id)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/messages/{id}/reactions"));
        }

        /// <summary>
        /// 设置消息反应
        /// </summary>
        public async Task MessageControllerSetReactionAsync(string id, SetMessageReaction body)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath($"/messages/{id}/reactions"), body);
        }

        /// <summary>
        /// 标记群消息为已读
        /// </summary>
        public async Task MessageControllerMarkGroupAsReadAsync(string groupId, MarkMessagesRead body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/messages/group/{groupId}/read"), body);
        }

        /// <summary>
        /// 标记消息为已读
        /// </summary>
        public async Task MessageControllerMarkAsReadAsync(string userId, MarkMessagesRead body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/messages/{userId}/read"), body);
        }

        /// <summary>
        /// 撤回消息
        /// </summary>
        public async Task MessageControllerRecallAsync(string id)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/messages/{id}/recall"), null);
        }

        /// <summary>
        /// 转发消息
        /// </summary>
        public async Task MessageControllerForwardAsync(string id, ForwardMessage body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/messages/{id}/forward"), body);
        }

        /// <summary>
        /// 重试发送失败的消息
        /// </summary>
        public async Task MessageControllerRetryFailedAsync(string id)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/messages/{id}/retry"), null);
        }
    }
}
