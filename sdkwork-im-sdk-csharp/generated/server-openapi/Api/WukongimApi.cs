using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class WukongimApi
    {
        private readonly HttpClient _client;

        public WukongimApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// Get WuKongIM connection config
        /// </summary>
        public async Task WukongImappControllerGetConfigAsync()
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/wukongim/config"));
        }

        /// <summary>
        /// Get WuKongIM user token
        /// </summary>
        public async Task WukongImappControllerGetTokenAsync()
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/wukongim/token"), null);
        }
    }
}
