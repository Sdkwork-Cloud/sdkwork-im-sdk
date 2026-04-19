using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sdkwork.Im.Sdk.Generated.Models;
using SdkHttpClient = Sdkwork.Im.Sdk.Generated.Http.HttpClient;

namespace Sdkwork.Im.Sdk.Generated.Api
{
    public class ConversationApi
    {
        private readonly SdkHttpClient _client;

        public ConversationApi(SdkHttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// Create a conversation
        /// </summary>
        public async Task<CreateConversationResult?> CreateConversationAsync(CreateConversationRequest body)
        {
            return await _client.PostAsync<CreateConversationResult>(ApiPaths.ApiPath("/conversations"), body, null, null, "application/json");
        }

        /// <summary>
        /// Create an agent dialog conversation
        /// </summary>
        public async Task<CreateConversationResult?> CreateAgentDialogAsync(CreateAgentDialogRequest body)
        {
            return await _client.PostAsync<CreateConversationResult>(ApiPaths.ApiPath("/conversations/agent-dialogs"), body, null, null, "application/json");
        }

        /// <summary>
        /// Create an agent handoff conversation
        /// </summary>
        public async Task<CreateConversationResult?> CreateAgentHandoffAsync(CreateAgentHandoffRequest body)
        {
            return await _client.PostAsync<CreateConversationResult>(ApiPaths.ApiPath("/conversations/agent-handoffs"), body, null, null, "application/json");
        }

        /// <summary>
        /// Create a system channel conversation
        /// </summary>
        public async Task<CreateConversationResult?> CreateSystemChannelAsync(CreateSystemChannelRequest body)
        {
            return await _client.PostAsync<CreateConversationResult>(ApiPaths.ApiPath("/conversations/system-channels"), body, null, null, "application/json");
        }

        /// <summary>
        /// Get projected conversation summary
        /// </summary>
        public async Task<ConversationSummaryView?> GetConversationSummaryAsync(string conversationId)
        {
            return await _client.GetAsync<ConversationSummaryView>(ApiPaths.ApiPath($"/conversations/{conversationId}"));
        }

        /// <summary>
        /// Get current agent handoff state
        /// </summary>
        public async Task<AgentHandoffStateView?> GetAgentHandoffStateAsync(string conversationId)
        {
            return await _client.GetAsync<AgentHandoffStateView>(ApiPaths.ApiPath($"/conversations/{conversationId}/agent-handoff"));
        }

        /// <summary>
        /// Accept an agent handoff
        /// </summary>
        public async Task<AgentHandoffStateView?> AcceptAgentHandoffAsync(string conversationId)
        {
            return await _client.PostAsync<AgentHandoffStateView>(ApiPaths.ApiPath($"/conversations/{conversationId}/agent-handoff/accept"), null);
        }

        /// <summary>
        /// Resolve an accepted agent handoff
        /// </summary>
        public async Task<AgentHandoffStateView?> ResolveAgentHandoffAsync(string conversationId)
        {
            return await _client.PostAsync<AgentHandoffStateView>(ApiPaths.ApiPath($"/conversations/{conversationId}/agent-handoff/resolve"), null);
        }

        /// <summary>
        /// Close an agent handoff
        /// </summary>
        public async Task<AgentHandoffStateView?> CloseAgentHandoffAsync(string conversationId)
        {
            return await _client.PostAsync<AgentHandoffStateView>(ApiPaths.ApiPath($"/conversations/{conversationId}/agent-handoff/close"), null);
        }

        /// <summary>
        /// List members in a conversation
        /// </summary>
        public async Task<ListMembersResponse?> ListConversationMembersAsync(string conversationId)
        {
            return await _client.GetAsync<ListMembersResponse>(ApiPaths.ApiPath($"/conversations/{conversationId}/members"));
        }

        /// <summary>
        /// Add a member to a conversation
        /// </summary>
        public async Task<ConversationMember?> AddConversationMemberAsync(string conversationId, AddConversationMemberRequest body)
        {
            return await _client.PostAsync<ConversationMember>(ApiPaths.ApiPath($"/conversations/{conversationId}/members/add"), body, null, null, "application/json");
        }

        /// <summary>
        /// Remove a member from a conversation
        /// </summary>
        public async Task<ConversationMember?> RemoveConversationMemberAsync(string conversationId, RemoveConversationMemberRequest body)
        {
            return await _client.PostAsync<ConversationMember>(ApiPaths.ApiPath($"/conversations/{conversationId}/members/remove"), body, null, null, "application/json");
        }

        /// <summary>
        /// Transfer conversation ownership
        /// </summary>
        public async Task<TransferConversationOwnerResult?> TransferConversationOwnerAsync(string conversationId, TransferConversationOwnerRequest body)
        {
            return await _client.PostAsync<TransferConversationOwnerResult>(ApiPaths.ApiPath($"/conversations/{conversationId}/members/transfer-owner"), body, null, null, "application/json");
        }

        /// <summary>
        /// Change a conversation member role
        /// </summary>
        public async Task<ChangeConversationMemberRoleResult?> ChangeConversationMemberRoleAsync(string conversationId, ChangeConversationMemberRoleRequest body)
        {
            return await _client.PostAsync<ChangeConversationMemberRoleResult>(ApiPaths.ApiPath($"/conversations/{conversationId}/members/change-role"), body, null, null, "application/json");
        }

        /// <summary>
        /// Leave a conversation
        /// </summary>
        public async Task<ConversationMember?> LeaveAsync(string conversationId)
        {
            return await _client.PostAsync<ConversationMember>(ApiPaths.ApiPath($"/conversations/{conversationId}/members/leave"), null);
        }

        /// <summary>
        /// Get the current member read cursor
        /// </summary>
        public async Task<ConversationReadCursorView?> GetConversationReadCursorAsync(string conversationId)
        {
            return await _client.GetAsync<ConversationReadCursorView>(ApiPaths.ApiPath($"/conversations/{conversationId}/read-cursor"));
        }

        /// <summary>
        /// Update the current member read cursor
        /// </summary>
        public async Task<ConversationReadCursorView?> UpdateConversationReadCursorAsync(string conversationId, UpdateReadCursorRequest body)
        {
            return await _client.PostAsync<ConversationReadCursorView>(ApiPaths.ApiPath($"/conversations/{conversationId}/read-cursor"), body, null, null, "application/json");
        }

        /// <summary>
        /// List projected conversation timeline entries
        /// </summary>
        public async Task<TimelineResponse?> ListConversationMessagesAsync(string conversationId)
        {
            return await _client.GetAsync<TimelineResponse>(ApiPaths.ApiPath($"/conversations/{conversationId}/messages"));
        }

        /// <summary>
        /// Post a standard conversation message
        /// </summary>
        public async Task<PostMessageResult?> PostConversationMessageAsync(string conversationId, PostMessageRequest body)
        {
            return await _client.PostAsync<PostMessageResult>(ApiPaths.ApiPath($"/conversations/{conversationId}/messages"), body, null, null, "application/json");
        }

        /// <summary>
        /// Publish a message into a system channel conversation
        /// </summary>
        public async Task<PostMessageResult?> PublishSystemChannelMessageAsync(string conversationId, PostMessageRequest body)
        {
            return await _client.PostAsync<PostMessageResult>(ApiPaths.ApiPath($"/conversations/{conversationId}/system-channel/publish"), body, null, null, "application/json");
        }
    }
}

