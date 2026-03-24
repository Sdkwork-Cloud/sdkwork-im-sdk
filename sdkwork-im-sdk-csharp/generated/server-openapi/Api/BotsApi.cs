using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class BotsApi
    {
        private readonly HttpClient _client;

        public BotsApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// 创建 Bot
        /// </summary>
        public async Task BotControllerCreateAsync(CreateBotDto body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/bots"), body);
        }

        /// <summary>
        /// 获取 Bot 列表
        /// </summary>
        public async Task BotControllerGetAsync(Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/bots"), query);
        }

        /// <summary>
        /// 获取 Bot 详情
        /// </summary>
        public async Task BotControllerGetByIdAsync(string id)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/bots/{id}"));
        }

        /// <summary>
        /// 更新 Bot
        /// </summary>
        public async Task BotControllerUpdateAsync(string id, UpdateBotDto body)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath($"/bots/{id}"), body);
        }

        /// <summary>
        /// 删除 Bot
        /// </summary>
        public async Task BotControllerDeleteAsync(string id)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/bots/{id}"));
        }

        /// <summary>
        /// 重新生成 Bot Token
        /// </summary>
        public async Task BotControllerRegenerateTokenAsync(string id)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/bots/{id}/regenerate-token"), null);
        }

        /// <summary>
        /// 设置 Webhook
        /// </summary>
        public async Task BotControllerSetWebhookAsync(string id, SetWebhookDto body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/bots/{id}/webhook"), body);
        }

        /// <summary>
        /// 删除 Webhook
        /// </summary>
        public async Task BotControllerDeleteWebhookAsync(string id)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/bots/{id}/webhook"));
        }
    }
}
