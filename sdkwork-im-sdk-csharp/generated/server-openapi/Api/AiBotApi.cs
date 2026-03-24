using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class AiBotApi
    {
        private readonly HttpClient _client;

        public AiBotApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// Create a new AI Bot
        /// </summary>
        public async Task AibotControllerCreateBotAsync(AibotControllerCreateBotRequest body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/ai-bots"), body);
        }

        /// <summary>
        /// Get all AI Bots
        /// </summary>
        public async Task AibotControllerGetBotsAsync()
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/ai-bots"));
        }

        /// <summary>
        /// Get an AI Bot by ID
        /// </summary>
        public async Task AibotControllerGetBotAsync(string id)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/ai-bots/{id}"));
        }

        /// <summary>
        /// Update an AI Bot
        /// </summary>
        public async Task AibotControllerUpdateBotAsync(string id, AibotControllerUpdateBotRequest body)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath($"/ai-bots/{id}"), body);
        }

        /// <summary>
        /// Delete an AI Bot
        /// </summary>
        public async Task AibotControllerDeleteBotAsync(string id)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/ai-bots/{id}"));
        }

        /// <summary>
        /// Activate an AI Bot
        /// </summary>
        public async Task AibotControllerActivateBotAsync(string id)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/ai-bots/{id}/activate"), null);
        }

        /// <summary>
        /// Deactivate an AI Bot
        /// </summary>
        public async Task AibotControllerDeactivateBotAsync(string id)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/ai-bots/{id}/deactivate"), null);
        }

        /// <summary>
        /// Process a message with AI Bot
        /// </summary>
        public async Task AibotControllerProcessMessageAsync(string id, AibotControllerProcessMessageRequest body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/ai-bots/{id}/messages"), body);
        }
    }
}
