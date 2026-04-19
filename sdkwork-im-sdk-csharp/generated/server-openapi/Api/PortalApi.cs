using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sdkwork.Im.Sdk.Generated.Models;
using SdkHttpClient = Sdkwork.Im.Sdk.Generated.Http.HttpClient;

namespace Sdkwork.Im.Sdk.Generated.Api
{
    public class PortalApi
    {
        private readonly SdkHttpClient _client;

        public PortalApi(SdkHttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// Read the tenant portal home snapshot
        /// </summary>
        public async Task<Dictionary<string, object>?> GetHomeAsync()
        {
            return await _client.GetAsync<Dictionary<string, object>>(ApiPaths.ApiPath("/portal/home"));
        }

        /// <summary>
        /// Read the tenant portal sign-in snapshot
        /// </summary>
        public async Task<Dictionary<string, object>?> GetAuthAsync()
        {
            return await _client.GetAsync<Dictionary<string, object>>(ApiPaths.ApiPath("/portal/auth"));
        }

        /// <summary>
        /// Read the current tenant workspace snapshot
        /// </summary>
        public async Task<PortalWorkspaceView?> GetWorkspaceAsync()
        {
            return await _client.GetAsync<PortalWorkspaceView>(ApiPaths.ApiPath("/portal/workspace"));
        }

        /// <summary>
        /// Read the tenant dashboard snapshot
        /// </summary>
        public async Task<Dictionary<string, object>?> GetDashboardAsync()
        {
            return await _client.GetAsync<Dictionary<string, object>>(ApiPaths.ApiPath("/portal/dashboard"));
        }

        /// <summary>
        /// Read the tenant conversations snapshot
        /// </summary>
        public async Task<Dictionary<string, object>?> GetConversationsAsync()
        {
            return await _client.GetAsync<Dictionary<string, object>>(ApiPaths.ApiPath("/portal/conversations"));
        }

        /// <summary>
        /// Read the tenant realtime snapshot
        /// </summary>
        public async Task<Dictionary<string, object>?> GetRealtimeAsync()
        {
            return await _client.GetAsync<Dictionary<string, object>>(ApiPaths.ApiPath("/portal/realtime"));
        }

        /// <summary>
        /// Read the tenant media snapshot
        /// </summary>
        public async Task<Dictionary<string, object>?> GetMediaAsync()
        {
            return await _client.GetAsync<Dictionary<string, object>>(ApiPaths.ApiPath("/portal/media"));
        }

        /// <summary>
        /// Read the tenant automation snapshot
        /// </summary>
        public async Task<Dictionary<string, object>?> GetAutomationAsync()
        {
            return await _client.GetAsync<Dictionary<string, object>>(ApiPaths.ApiPath("/portal/automation"));
        }

        /// <summary>
        /// Read the tenant governance snapshot
        /// </summary>
        public async Task<Dictionary<string, object>?> GetGovernanceAsync()
        {
            return await _client.GetAsync<Dictionary<string, object>>(ApiPaths.ApiPath("/portal/governance"));
        }
    }
}

