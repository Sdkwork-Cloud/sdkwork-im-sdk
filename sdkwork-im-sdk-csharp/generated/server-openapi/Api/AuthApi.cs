using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sdkwork.Im.Sdk.Generated.Models;
using SdkHttpClient = Sdkwork.Im.Sdk.Generated.Http.HttpClient;

namespace Sdkwork.Im.Sdk.Generated.Api
{
    public class AuthApi
    {
        private readonly SdkHttpClient _client;

        public AuthApi(SdkHttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// Sign in to the tenant portal
        /// </summary>
        public async Task<PortalLoginResponse?> LoginAsync(PortalLoginRequest body)
        {
            return await _client.PostAsync<PortalLoginResponse>(ApiPaths.ApiPath("/auth/login"), body, null, null, "application/json");
        }

        /// <summary>
        /// Read the current portal session
        /// </summary>
        public async Task<PortalMeResponse?> MeAsync()
        {
            return await _client.GetAsync<PortalMeResponse>(ApiPaths.ApiPath("/auth/me"));
        }
    }
}

