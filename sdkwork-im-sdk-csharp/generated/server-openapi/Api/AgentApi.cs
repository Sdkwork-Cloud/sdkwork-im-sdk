using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class AgentApi
    {
        private readonly HttpClient _client;

        public AgentApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// Create a new agent
        /// </summary>
        public async Task ControllerCreateAsync(CreateAgent body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/agents"), body);
        }

        /// <summary>
        /// Get all agents for current user
        /// </summary>
        public async Task GetControllerGetAsync(Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/agents"), query);
        }

        /// <summary>
        /// Get agent by ID
        /// </summary>
        public async Task GetControllerGetAgentsAsync(string id)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/agents/{id}"));
        }

        /// <summary>
        /// Update agent
        /// </summary>
        public async Task ControllerUpdateAsync(string id, UpdateAgent body)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath($"/agents/{id}"), body);
        }

        /// <summary>
        /// Delete agent
        /// </summary>
        public async Task ControllerDeleteAsync(string id)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/agents/{id}"));
        }

        /// <summary>
        /// Create a new chat session
        /// </summary>
        public async Task ControllerCreateSessionAsync(string id, CreateSession body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/agents/{id}/sessions"), body);
        }

        /// <summary>
        /// Get sessions for agent
        /// </summary>
        public async Task ControllerGetSessionsAsync(string id, Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/agents/{id}/sessions"), query);
        }

        /// <summary>
        /// Get session by ID
        /// </summary>
        public async Task ControllerGetSessionAsync(string sessionId)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/agents/sessions/{sessionId}"));
        }

        /// <summary>
        /// Delete session
        /// </summary>
        public async Task ControllerDeleteSessionAsync(string sessionId)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/agents/sessions/{sessionId}"));
        }

        /// <summary>
        /// Get messages for session
        /// </summary>
        public async Task ControllerGetMessagesAsync(string sessionId, Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/agents/sessions/{sessionId}/messages"), query);
        }

        /// <summary>
        /// Send a message to agent
        /// </summary>
        public async Task ControllerSendMessageAsync(string sessionId, SendAgentMessage body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/agents/sessions/{sessionId}/messages"), body);
        }

        /// <summary>
        /// Stream message from agent
        /// </summary>
        public async Task ControllerStreamMessageAsync(string sessionId)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/agents/sessions/{sessionId}/stream"));
        }

        /// <summary>
        /// Get tools for agent
        /// </summary>
        public async Task ControllerGetToolsAsync(string id)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/agents/{id}/tools"));
        }

        /// <summary>
        /// Add tool to agent
        /// </summary>
        public async Task ControllerAddToolToAsync(string id, AddTool body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/agents/{id}/tools"), body);
        }

        /// <summary>
        /// Get skills for agent
        /// </summary>
        public async Task ControllerGetSkillsAsync(string id)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/agents/{id}/skills"));
        }

        /// <summary>
        /// Add skill to agent
        /// </summary>
        public async Task ControllerAddSkillToAsync(string id, AddSkill body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/agents/{id}/skills"), body);
        }

        /// <summary>
        /// Get all available tools
        /// </summary>
        public async Task ControllerGetAvailableToolsAsync()
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/agents/tools/available"));
        }

        /// <summary>
        /// Get all available skills
        /// </summary>
        public async Task ControllerGetAvailableSkillsAsync()
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/agents/skills/available"));
        }

        /// <summary>
        /// Start agent runtime
        /// </summary>
        public async Task ControllerStartAsync(string id)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/agents/{id}/start"), null);
        }

        /// <summary>
        /// Stop agent runtime
        /// </summary>
        public async Task ControllerStopAsync(string id)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/agents/{id}/stop"), null);
        }

        /// <summary>
        /// Reset agent
        /// </summary>
        public async Task ControllerResetAsync(string id)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/agents/{id}/reset"), null);
        }
    }
}
