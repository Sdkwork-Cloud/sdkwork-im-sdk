using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class ThirdPartyApi
    {
        private readonly HttpClient _client;

        public ThirdPartyApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// 发送第三方平台消息
        /// </summary>
        public async Task<ThirdPartyMessage?> ControllerSendMessageAsync(string platform, string body)
        {
            return await _client.PostAsync<ThirdPartyMessage>(ApiPaths.BackendPath($"/third-party/{platform}/messages"), body);
        }

        /// <summary>
        /// 获取第三方平台消息状态
        /// </summary>
        public async Task ControllerGetMessageStatusAsync(string platform, string id)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/third-party/{platform}/messages/{id}/status"));
        }

        /// <summary>
        /// 同步第三方平台联系人
        /// </summary>
        public async Task ControllerSyncContactsAsync(string platform)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/third-party/{platform}/contacts/sync"), null);
        }

        /// <summary>
        /// 获取第三方平台联系人
        /// </summary>
        public async Task ControllerGetContactAsync(string platform, Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/third-party/{platform}/contacts"), query);
        }
    }
}
