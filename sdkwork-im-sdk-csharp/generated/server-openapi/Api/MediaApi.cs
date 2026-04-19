using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Sdkwork.Im.Sdk.Generated.Models;
using SdkHttpClient = Sdkwork.Im.Sdk.Generated.Http.HttpClient;

namespace Sdkwork.Im.Sdk.Generated.Api
{
    public class MediaApi
    {
        private readonly SdkHttpClient _client;

        public MediaApi(SdkHttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// Create a media upload record
        /// </summary>
        public async Task<MediaAsset?> CreateMediaUploadAsync(CreateUploadRequest body)
        {
            return await _client.PostAsync<MediaAsset>(ApiPaths.ApiPath("/media/uploads"), body, null, null, "application/json");
        }

        /// <summary>
        /// Complete a media upload
        /// </summary>
        public async Task<MediaAsset?> CompleteMediaUploadAsync(string mediaAssetId, CompleteUploadRequest body)
        {
            return await _client.PostAsync<MediaAsset>(ApiPaths.ApiPath($"/media/uploads/{mediaAssetId}/complete"), body, null, null, "application/json");
        }

        /// <summary>
        /// Issue a signed media download URL
        /// </summary>
        public async Task<MediaDownloadUrlResponse?> GetMediaDownloadUrlAsync(string mediaAssetId, Dictionary<string, object>? query = null)
        {
            return await _client.GetAsync<MediaDownloadUrlResponse>(ApiPaths.ApiPath($"/media/{mediaAssetId}/download-url"), query);
        }

        /// <summary>
        /// Get a media asset by id
        /// </summary>
        public async Task<MediaAsset?> GetMediaAssetAsync(string mediaAssetId)
        {
            return await _client.GetAsync<MediaAsset>(ApiPaths.ApiPath($"/media/{mediaAssetId}"));
        }

        /// <summary>
        /// Attach a ready media asset as a conversation message
        /// </summary>
        public async Task<PostMessageResult?> AttachMediaAssetAsync(string mediaAssetId, AttachMediaRequest body)
        {
            return await _client.PostAsync<PostMessageResult>(ApiPaths.ApiPath($"/media/{mediaAssetId}/attach"), body, null, null, "application/json");
        }
    }
}

