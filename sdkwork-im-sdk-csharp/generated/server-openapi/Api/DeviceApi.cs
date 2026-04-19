using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sdkwork.Im.Sdk.Generated.Models;
using SdkHttpClient = Sdkwork.Im.Sdk.Generated.Http.HttpClient;

namespace Sdkwork.Im.Sdk.Generated.Api
{
    public class DeviceApi
    {
        private readonly SdkHttpClient _client;

        public DeviceApi(SdkHttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// Register the current device
        /// </summary>
        public async Task<RegisteredDeviceView?> RegisterAsync(RegisterDeviceRequest body)
        {
            return await _client.PostAsync<RegisteredDeviceView>(ApiPaths.ApiPath("/devices/register"), body, null, null, "application/json");
        }

        /// <summary>
        /// Get device sync feed entries
        /// </summary>
        public async Task<DeviceSyncFeedResponse?> GetDeviceSyncFeedAsync(string deviceId, Dictionary<string, object>? query = null)
        {
            return await _client.GetAsync<DeviceSyncFeedResponse>(ApiPaths.ApiPath($"/devices/{deviceId}/sync-feed"), query);
        }
    }
}

