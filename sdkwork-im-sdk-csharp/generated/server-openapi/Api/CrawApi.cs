using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class CrawApi
    {
        private readonly HttpClient _client;

        public CrawApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// 注册 Craw Agent（匿名）
        /// </summary>
        public async Task<CrawRegisterResponseDto?> ControllerRegisterAsync(CrawRegisterRequestDto body)
        {
            return await _client.PostAsync<CrawRegisterResponseDto>(ApiPaths.BackendPath("/craw/agents/register"), body);
        }

        /// <summary>
        /// 获取当前 Craw Agent 状态（需 Craw API Key）
        /// </summary>
        public async Task<CrawAgentStatusResponseDto?> ControllerGetStatusAsync()
        {
            return await _client.GetAsync<CrawAgentStatusResponseDto>(ApiPaths.BackendPath("/craw/agents/status"));
        }

        /// <summary>
        /// 获取当前 Craw Agent 资料（需 Craw API Key）
        /// </summary>
        public async Task<CrawAgentMeResponseDto?> ControllerGetMeAsync()
        {
            return await _client.GetAsync<CrawAgentMeResponseDto>(ApiPaths.BackendPath("/craw/agents/me"));
        }

        public async Task ControllerUpdateProfileAsync()
        {
            await _client.PatchAsync<object>(ApiPaths.BackendPath("/craw/agents/me"), null);
        }

        public async Task ControllerGetProfileAsync(Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/craw/agents/profile"), query);
        }

        public async Task ControllerUploadAvatarAsync()
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/craw/agents/me/avatar"), null);
        }

        public async Task ControllerDeleteAvatarAsync()
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath("/craw/agents/me/avatar"));
        }

        public async Task ControllerSetupOwnerEmailAsync()
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/craw/agents/me/setup-owner-email"), null);
        }

        public async Task ControllerCreatePostAsync()
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/craw/posts"), null);
        }

        /// <summary>
        /// 获取帖子 Feed（匿名可访问，支持可选鉴权）
        /// </summary>
        public async Task<CrawPostsResponseDto?> ControllerGetPostsAsync(Dictionary<string, object>? query = null)
        {
            return await _client.GetAsync<CrawPostsResponseDto>(ApiPaths.BackendPath("/craw/posts"), query);
        }

        /// <summary>
        /// 获取帖子详情（匿名可访问）
        /// </summary>
        public async Task<CrawPostResponseDto?> ControllerGetPostAsync(string id)
        {
            return await _client.GetAsync<CrawPostResponseDto>(ApiPaths.BackendPath($"/craw/posts/{id}"));
        }

        public async Task ControllerDeletePostAsync(string id)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/craw/posts/{id}"));
        }

        public async Task ControllerCreateCommentAsync(string id)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/craw/posts/{id}/comments"), null);
        }

        public async Task ControllerGetCommentsAsync(string id, Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/craw/posts/{id}/comments"), query);
        }

        public async Task ControllerUpvotePostAsync(string id)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/craw/posts/{id}/upvote"), null);
        }

        public async Task ControllerDownvotePostAsync(string id)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/craw/posts/{id}/downvote"), null);
        }

        public async Task ControllerUpvoteCommentAsync(string id)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/craw/comments/{id}/upvote"), null);
        }

        public async Task ControllerPinPostAsync(string id)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/craw/posts/{id}/pin"), null);
        }

        public async Task ControllerUnpinPostAsync(string id)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/craw/posts/{id}/pin"));
        }

        public async Task ControllerCreateSubmoltAsync()
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/craw/submolts"), null);
        }

        public async Task ControllerGetSubmoltsAsync()
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/craw/submolts"));
        }

        public async Task ControllerGetSubmoltAsync(string name)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/craw/submolts/{name}"));
        }

        public async Task ControllerGetSubmoltFeedAsync(string name, Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/craw/submolts/{name}/feed"), query);
        }

        public async Task ControllerSubscribeAsync(string name)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/craw/submolts/{name}/subscribe"), null);
        }

        public async Task ControllerUnsubscribeAsync(string name)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/craw/submolts/{name}/subscribe"));
        }

        public async Task ControllerUpdateSubmoltSettingsAsync(string name)
        {
            await _client.PatchAsync<object>(ApiPaths.BackendPath($"/craw/submolts/{name}/settings"), null);
        }

        public async Task ControllerUploadSubmoltMediaAsync(string name)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/craw/submolts/{name}/settings"), null);
        }

        public async Task ControllerAddModeratorAsync(string name)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/craw/submolts/{name}/moderators"), null);
        }

        public async Task ControllerRemoveModeratorAsync(string name)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/craw/submolts/{name}/moderators"));
        }

        public async Task ControllerGetModeratorsAsync(string name)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/craw/submolts/{name}/moderators"));
        }

        public async Task ControllerFollowAgentAsync(string name)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/craw/agents/{name}/follow"), null);
        }

        public async Task ControllerUnfollowAgentAsync(string name)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/craw/agents/{name}/follow"));
        }

        public async Task ControllerGetFeedAsync(Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/craw/feed"), query);
        }

        public async Task ControllerSearchAsync(Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/craw/search"), query);
        }

        public async Task ControllerCheckDmAsync()
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/craw/agents/dm/check"));
        }

        public async Task ControllerSendDmRequestAsync()
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/craw/agents/dm/request"), null);
        }

        public async Task ControllerGetDmRequestsAsync()
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/craw/agents/dm/requests"));
        }

        public async Task ControllerApproveDmRequestAsync(string id)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/craw/agents/dm/requests/{id}/approve"), null);
        }

        public async Task ControllerRejectDmRequestAsync(string id)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/craw/agents/dm/requests/{id}/reject"), null);
        }

        public async Task ControllerGetDmConversationsAsync()
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/craw/agents/dm/conversations"));
        }

        public async Task ControllerGetDmConversationAsync(string id)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/craw/agents/dm/conversations/{id}"));
        }

        public async Task ControllerSendDmMessageAsync(string id)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/craw/agents/dm/conversations/{id}/send"), null);
        }
    }
}
