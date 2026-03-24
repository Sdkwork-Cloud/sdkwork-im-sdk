using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class AgentMemoryApi
    {
        private readonly HttpClient _client;

        public AgentMemoryApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// Get memories for agent
        /// </summary>
        public async Task MemoryControllerGetMemoriesAsync(string agentId, Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/agents/{agentId}/memory"), query);
        }

        /// <summary>
        /// Store a memory
        /// </summary>
        public async Task MemoryControllerStoreAsync(string agentId, StoreMemoryDto body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/agents/{agentId}/memory"), body);
        }

        /// <summary>
        /// Search memories
        /// </summary>
        public async Task MemoryControllerSearchMemoriesAsync(string agentId, Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/agents/{agentId}/memory/search"), query);
        }

        /// <summary>
        /// Semantic search memories
        /// </summary>
        public async Task MemoryControllerSemanticSearchAsync(string agentId, Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/agents/{agentId}/memory/semantic-search"), query);
        }

        /// <summary>
        /// Get memory statistics
        /// </summary>
        public async Task MemoryControllerGetStatsAsync(string agentId)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/agents/{agentId}/memory/stats"));
        }

        /// <summary>
        /// Get conversation history
        /// </summary>
        public async Task MemoryControllerGetHistoryAsync(string agentId, string sessionId, Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/agents/{agentId}/memory/sessions/{sessionId}/history"), query);
        }

        /// <summary>
        /// Summarize session
        /// </summary>
        public async Task MemoryControllerSummarizeSessionAsync(string agentId, string sessionId)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/agents/{agentId}/memory/sessions/{sessionId}/summarize"), null);
        }

        /// <summary>
        /// Delete a memory
        /// </summary>
        public async Task MemoryControllerDeleteAsync(string agentId, string memoryId)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/agents/{agentId}/memory/{memoryId}"));
        }

        /// <summary>
        /// Clear session memories
        /// </summary>
        public async Task MemoryControllerClearSessionAsync(string agentId, string sessionId)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/agents/{agentId}/memory/sessions/{sessionId}"));
        }

        /// <summary>
        /// Consolidate memories
        /// </summary>
        public async Task MemoryControllerConsolidateAsync(string agentId)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/agents/{agentId}/memory/consolidate"), null);
        }

        /// <summary>
        /// Get knowledge documents
        /// </summary>
        public async Task MemoryControllerGetKnowledgeDocumentsAsync(string agentId)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/agents/{agentId}/memory/knowledge"));
        }

        /// <summary>
        /// Add knowledge document
        /// </summary>
        public async Task MemoryControllerAddKnowledgeDocumentAsync(string agentId, AddKnowledgeDocumentDto body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/agents/{agentId}/memory/knowledge"), body);
        }

        /// <summary>
        /// Search knowledge
        /// </summary>
        public async Task MemoryControllerSearchKnowledgeAsync(string agentId, Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/agents/{agentId}/memory/knowledge/search"), query);
        }

        /// <summary>
        /// Get knowledge statistics
        /// </summary>
        public async Task MemoryControllerGetKnowledgeStatsAsync(string agentId)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/agents/{agentId}/memory/knowledge/stats"));
        }

        /// <summary>
        /// Get knowledge document
        /// </summary>
        public async Task MemoryControllerGetKnowledgeDocumentAsync(string agentId, string documentId)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/agents/{agentId}/memory/knowledge/{documentId}"));
        }

        /// <summary>
        /// Delete knowledge document
        /// </summary>
        public async Task MemoryControllerDeleteKnowledgeDocumentAsync(string agentId, string documentId)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/agents/{agentId}/memory/knowledge/{documentId}"));
        }

        /// <summary>
        /// Get document chunks
        /// </summary>
        public async Task MemoryControllerGetDocumentChunksAsync(string agentId, string documentId)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/agents/{agentId}/memory/knowledge/{documentId}/chunks"));
        }
    }
}
