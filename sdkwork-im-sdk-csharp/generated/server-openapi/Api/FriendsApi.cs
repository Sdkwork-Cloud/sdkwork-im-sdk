using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class FriendsApi
    {
        private readonly HttpClient _client;

        public FriendsApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// Send friend request
        /// </summary>
        public async Task<FriendControllerSendRequestResponse?> FriendControllerSendRequestAsync(SendFriendRequestDto body)
        {
            return await _client.PostAsync<FriendControllerSendRequestResponse>(ApiPaths.BackendPath("/friends/request"), body);
        }

        /// <summary>
        /// Accept friend request
        /// </summary>
        public async Task<FriendControllerAcceptRequestResponse?> FriendControllerAcceptRequestAsync(string id)
        {
            return await _client.PostAsync<FriendControllerAcceptRequestResponse>(ApiPaths.BackendPath($"/friends/request/{id}/accept"), null);
        }

        /// <summary>
        /// Reject friend request
        /// </summary>
        public async Task<FriendControllerRejectRequestResponse?> FriendControllerRejectRequestAsync(string id)
        {
            return await _client.PostAsync<FriendControllerRejectRequestResponse>(ApiPaths.BackendPath($"/friends/request/{id}/reject"), null);
        }

        /// <summary>
        /// Cancel friend request
        /// </summary>
        public async Task<FriendControllerCancelRequestResponse?> FriendControllerCancelRequestAsync(string id)
        {
            return await _client.DeleteAsync<FriendControllerCancelRequestResponse>(ApiPaths.BackendPath($"/friends/request/{id}"));
        }

        /// <summary>
        /// Remove friend
        /// </summary>
        public async Task<FriendControllerRemoveResponse?> FriendControllerRemoveAsync(string friendId)
        {
            return await _client.DeleteAsync<FriendControllerRemoveResponse>(ApiPaths.BackendPath($"/friends/{friendId}"));
        }

        /// <summary>
        /// Get friend requests
        /// </summary>
        public async Task<FriendControllerGetRequestsResponse?> FriendControllerGetRequestsAsync(Dictionary<string, object>? query = null)
        {
            return await _client.GetAsync<FriendControllerGetRequestsResponse>(ApiPaths.BackendPath("/friends/requests"), query);
        }

        /// <summary>
        /// Get sent friend requests
        /// </summary>
        public async Task<FriendControllerGetSentRequestsResponse?> FriendControllerGetSentRequestsAsync()
        {
            return await _client.GetAsync<FriendControllerGetSentRequestsResponse>(ApiPaths.BackendPath("/friends/requests/sent"));
        }

        /// <summary>
        /// Get friends list
        /// </summary>
        public async Task<FriendControllerGetResponse?> FriendControllerGetAsync()
        {
            return await _client.GetAsync<FriendControllerGetResponse>(ApiPaths.BackendPath("/friends"));
        }

        /// <summary>
        /// Check friendship status
        /// </summary>
        public async Task<FriendControllerCheckFriendshipResponse?> FriendControllerCheckFriendshipAsync(string friendId)
        {
            return await _client.GetAsync<FriendControllerCheckFriendshipResponse>(ApiPaths.BackendPath($"/friends/{friendId}/check"));
        }

        /// <summary>
        /// Block friend
        /// </summary>
        public async Task<FriendControllerBlockResponse?> FriendControllerBlockAsync(string friendId)
        {
            return await _client.PostAsync<FriendControllerBlockResponse>(ApiPaths.BackendPath($"/friends/{friendId}/block"), null);
        }

        /// <summary>
        /// Unblock friend
        /// </summary>
        public async Task<FriendControllerUnblockResponse?> FriendControllerUnblockAsync(string friendId)
        {
            return await _client.PostAsync<FriendControllerUnblockResponse>(ApiPaths.BackendPath($"/friends/{friendId}/unblock"), null);
        }

        /// <summary>
        /// Check if blocked
        /// </summary>
        public async Task<FriendControllerCheckBlockedResponse?> FriendControllerCheckBlockedAsync(string friendId)
        {
            return await _client.GetAsync<FriendControllerCheckBlockedResponse>(ApiPaths.BackendPath($"/friends/{friendId}/blocked"));
        }
    }
}
