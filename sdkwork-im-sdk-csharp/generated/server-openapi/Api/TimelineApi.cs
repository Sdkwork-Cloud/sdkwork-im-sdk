using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class TimelineApi
    {
        private readonly HttpClient _client;

        public TimelineApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// Create a timeline post
        /// </summary>
        public async Task ControllerCreatePostAsync(CreateTimelinePostDto body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/timeline/posts"), body);
        }

        /// <summary>
        /// Get timeline feed
        /// </summary>
        public async Task ControllerGetFeedAsync(Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/timeline/feed"), query);
        }

        /// <summary>
        /// Get timeline post detail
        /// </summary>
        public async Task ControllerGetPostAsync(string postId)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/timeline/posts/{postId}"));
        }

        /// <summary>
        /// Delete own timeline post
        /// </summary>
        public async Task ControllerDeletePostAsync(string postId)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/timeline/posts/{postId}"));
        }

        /// <summary>
        /// Get user timeline posts
        /// </summary>
        public async Task ControllerGetUserPostsAsync(string userId, Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/timeline/users/{userId}/posts"), query);
        }

        /// <summary>
        /// Like or unlike timeline post
        /// </summary>
        public async Task ControllerToggleLikeAsync(string postId, ToggleTimelineLikeDto body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/timeline/posts/{postId}/likes"), body);
        }
    }
}
