using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class MessageSearchApi
    {
        private readonly HttpClient _client;

        public MessageSearchApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// 搜索消息
        /// </summary>
        public async Task ControllerAsync(Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/messages/search"), query);
        }

        /// <summary>
        /// 快速搜索
        /// </summary>
        public async Task ControllerQuickAsync(Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/messages/search/quick"), query);
        }

        /// <summary>
        /// 搜索会话消息
        /// </summary>
        public async Task ControllerInConversationAsync(Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/messages/search/conversation"), query);
        }

        /// <summary>
        /// 消息统计
        /// </summary>
        public async Task ControllerGetStatsAsync(Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/messages/search/stats"), query);
        }
    }
}
