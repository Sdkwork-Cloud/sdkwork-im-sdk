using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class BotsOpenApi
    {
        private readonly HttpClient _client;

        public BotsOpenApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// 获取当前 Bot 信息（Bot Token）
        /// </summary>
        public async Task<BotOpenProfileResponseDto?> BotOpenControllerGetCurrentAsync()
        {
            return await _client.GetAsync<BotOpenProfileResponseDto>(ApiPaths.BackendPath("/bots/open/me"));
        }

        /// <summary>
        /// 获取当前 Bot 的 Webhook 统计（Bot Token）
        /// </summary>
        public async Task<BotOpenWebhookStatsResponseDto?> BotOpenControllerGetWebhookStatsAsync()
        {
            return await _client.GetAsync<BotOpenWebhookStatsResponseDto>(ApiPaths.BackendPath("/bots/open/webhook/stats"));
        }

        /// <summary>
        /// 触发当前 Bot 的 Webhook 测试事件（Bot Token）
        /// </summary>
        public async Task<BotOpenWebhookResultResponseDto?> BotOpenControllerSendWebhookTestEventAsync(BotOpenWebhookTestEventRequestDto body)
        {
            return await _client.PostAsync<BotOpenWebhookResultResponseDto>(ApiPaths.BackendPath("/bots/open/webhook/test-event"), body);
        }
    }
}
