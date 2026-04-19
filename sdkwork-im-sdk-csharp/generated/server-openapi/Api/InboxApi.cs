using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sdkwork.Im.Sdk.Generated.Models;
using SdkHttpClient = Sdkwork.Im.Sdk.Generated.Http.HttpClient;

namespace Sdkwork.Im.Sdk.Generated.Api
{
    public class InboxApi
    {
        private readonly SdkHttpClient _client;

        public InboxApi(SdkHttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// Get inbox entries
        /// </summary>
        public async Task<InboxResponse?> GetInboxAsync()
        {
            return await _client.GetAsync<InboxResponse>(ApiPaths.ApiPath("/inbox"));
        }
    }
}

