using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sdkwork.Im.Sdk.Generated.Models;
using SdkHttpClient = Sdkwork.Im.Sdk.Generated.Http.HttpClient;

namespace Sdkwork.Im.Sdk.Generated.Api
{
    public class StreamApi
    {
        private readonly SdkHttpClient _client;

        public StreamApi(SdkHttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// Open a stream session
        /// </summary>
        public async Task<StreamSession?> OpenAsync(OpenStreamRequest body)
        {
            return await _client.PostAsync<StreamSession>(ApiPaths.ApiPath("/streams"), body, null, null, "application/json");
        }

        /// <summary>
        /// List stream frames
        /// </summary>
        public async Task<StreamFrameWindow?> ListStreamFramesAsync(string streamId, Dictionary<string, object>? query = null)
        {
            return await _client.GetAsync<StreamFrameWindow>(ApiPaths.ApiPath($"/streams/{streamId}/frames"), query);
        }

        /// <summary>
        /// Append a frame to a stream
        /// </summary>
        public async Task<StreamFrame?> AppendStreamFrameAsync(string streamId, AppendStreamFrameRequest body)
        {
            return await _client.PostAsync<StreamFrame>(ApiPaths.ApiPath($"/streams/{streamId}/frames"), body, null, null, "application/json");
        }

        /// <summary>
        /// Checkpoint a stream session
        /// </summary>
        public async Task<StreamSession?> CheckpointAsync(string streamId, CheckpointStreamRequest body)
        {
            return await _client.PostAsync<StreamSession>(ApiPaths.ApiPath($"/streams/{streamId}/checkpoint"), body, null, null, "application/json");
        }

        /// <summary>
        /// Complete a stream session
        /// </summary>
        public async Task<StreamSession?> CompleteAsync(string streamId, CompleteStreamRequest body)
        {
            return await _client.PostAsync<StreamSession>(ApiPaths.ApiPath($"/streams/{streamId}/complete"), body, null, null, "application/json");
        }

        /// <summary>
        /// Abort a stream session
        /// </summary>
        public async Task<StreamSession?> AbortAsync(string streamId, AbortStreamRequest body)
        {
            return await _client.PostAsync<StreamSession>(ApiPaths.ApiPath($"/streams/{streamId}/abort"), body, null, null, "application/json");
        }
    }
}

