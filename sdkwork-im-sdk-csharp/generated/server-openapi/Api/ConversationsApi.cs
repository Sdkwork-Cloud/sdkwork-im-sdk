using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class ConversationsApi
    {
        private readonly HttpClient _client;

        public ConversationsApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// 创建会话
        /// </summary>
        public async Task<Conversation?> ConversationControllerCreateAsync(ConversationControllerCreateRequest body)
        {
            return await _client.PostAsync<Conversation>(ApiPaths.BackendPath("/conversations"), body);
        }

        /// <summary>
        /// 获取用户的会话列表
        /// </summary>
        public async Task<ConversationControllerGetByUserIdResponse?> ConversationControllerGetByUserIdAsync(Dictionary<string, object>? query = null)
        {
            return await _client.GetAsync<ConversationControllerGetByUserIdResponse>(ApiPaths.BackendPath("/conversations"), query);
        }

        /// <summary>
        /// 获取会话同步状态
        /// </summary>
        public async Task ConversationControllerGetSyncStateAsync(Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/conversations/sync-state"), query);
        }

        /// <summary>
        /// 批量获取会话同步状态
        /// </summary>
        public async Task ConversationControllerGetSyncStatesAsync(ConversationControllerGetSyncStatesRequest body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/conversations/sync-state/batch"), body);
        }

        /// <summary>
        /// 删除设备会话读游标
        /// </summary>
        public async Task ConversationControllerDeleteDeviceSyncStateAsync(string deviceId)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/conversations/sync-state/device/{deviceId}"));
        }

        /// <summary>
        /// 获取设备会话游标摘要
        /// </summary>
        public async Task ConversationControllerGetDeviceSyncStateSummariesAsync(Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/conversations/sync-state/devices"), query);
        }

        /// <summary>
        /// 清理失活设备会话游标
        /// </summary>
        public async Task ConversationControllerDeleteStaleDeviceSyncStatesAsync(Dictionary<string, object>? query = null)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath("/conversations/sync-state/devices/stale"), query);
        }

        /// <summary>
        /// 获取用户与特定目标的会话
        /// </summary>
        public async Task<Conversation?> ConversationControllerGetByTargetAsync(string targetId, Dictionary<string, object>? query = null)
        {
            return await _client.GetAsync<Conversation>(ApiPaths.BackendPath($"/conversations/target/{targetId}"), query);
        }

        /// <summary>
        /// 获取未读消息总数
        /// </summary>
        public async Task ConversationControllerGetTotalUnreadCountAsync()
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/conversations/unread-total/me"));
        }

        /// <summary>
        /// 获取会话详情
        /// </summary>
        public async Task<Conversation?> ConversationControllerGetByIdAsync(string id)
        {
            return await _client.GetAsync<Conversation>(ApiPaths.BackendPath($"/conversations/{id}"));
        }

        /// <summary>
        /// 更新会话
        /// </summary>
        public async Task<Conversation?> ConversationControllerUpdateAsync(string id, ConversationControllerUpdateRequest body)
        {
            return await _client.PutAsync<Conversation>(ApiPaths.BackendPath($"/conversations/{id}"), body);
        }

        /// <summary>
        /// 删除会话
        /// </summary>
        public async Task ConversationControllerDeleteAsync(string id)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/conversations/{id}"));
        }

        /// <summary>
        /// 置顶/取消置顶会话
        /// </summary>
        public async Task ConversationControllerPinAsync(string id, ConversationControllerPinRequest body)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath($"/conversations/{id}/pin"), body);
        }

        /// <summary>
        /// 设置免打扰
        /// </summary>
        public async Task ConversationControllerMuteAsync(string id, ConversationControllerMuteRequest body)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath($"/conversations/{id}/mute"), body);
        }

        /// <summary>
        /// 清空未读消息数
        /// </summary>
        public async Task ConversationControllerClearUnreadCountAsync(string id)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath($"/conversations/{id}/read"), null);
        }

        /// <summary>
        /// 批量删除会话
        /// </summary>
        public async Task ConversationControllerBatchDeleteAsync()
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath("/conversations/batch"));
        }
    }
}
