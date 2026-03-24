using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class RtcApi
    {
        private readonly HttpClient _client;

        public RtcApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// Create RTC room
        /// </summary>
        public async Task<RTCRoom?> AppControllerCreateRoomAsync(CreateRtcRoomDto body)
        {
            return await _client.PostAsync<RTCRoom>(ApiPaths.BackendPath("/rtc/rooms"), body);
        }

        /// <summary>
        /// End RTC room
        /// </summary>
        public async Task AppControllerEndRoomAsync(string id)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath($"/rtc/rooms/{id}/end"), null);
        }

        /// <summary>
        /// Get RTC room detail
        /// </summary>
        public async Task<RTCRoom?> AppControllerGetRoomByIdAsync(string id)
        {
            return await _client.GetAsync<RTCRoom>(ApiPaths.BackendPath($"/rtc/rooms/{id}"));
        }

        /// <summary>
        /// Get user RTC rooms
        /// </summary>
        public async Task<RtcAppControllerGetRoomsByUserIdResponse?> AppControllerGetRoomsByUserIdAsync(string userId)
        {
            return await _client.GetAsync<RtcAppControllerGetRoomsByUserIdResponse>(ApiPaths.BackendPath($"/rtc/rooms/user/{userId}"));
        }

        /// <summary>
        /// Generate RTC token
        /// </summary>
        public async Task<RTCToken?> AppControllerGenerateTokenAsync(GenerateRtcTokenDto body)
        {
            return await _client.PostAsync<RTCToken>(ApiPaths.BackendPath("/rtc/tokens"), body);
        }

        /// <summary>
        /// Validate RTC token (POST body, standard)
        /// </summary>
        public async Task<RtcTokenValidationResultDto?> AppControllerValidateTokenAsync(ValidateRtcTokenDto body)
        {
            return await _client.PostAsync<RtcTokenValidationResultDto>(ApiPaths.BackendPath("/rtc/tokens/validate"), body);
        }

        /// <summary>
        /// Add room participant (creator only)
        /// </summary>
        public async Task AppControllerAddParticipantAsync(string id, AddRtcParticipantDto body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/rtc/rooms/{id}/participants"), body);
        }

        /// <summary>
        /// Remove room participant (creator or self)
        /// </summary>
        public async Task AppControllerRemoveParticipantAsync(string id, string userId)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/rtc/rooms/{id}/participants/{userId}"));
        }

        /// <summary>
        /// Get RTC provider capabilities for SDK dynamic integration
        /// </summary>
        public async Task<RtcProviderCapabilitiesResponseDto?> AppControllerGetProviderCapabilitiesAsync()
        {
            return await _client.GetAsync<RtcProviderCapabilitiesResponseDto>(ApiPaths.BackendPath("/rtc/providers/capabilities"));
        }

        /// <summary>
        /// Start cloud recording task for a room
        /// </summary>
        public async Task AppControllerStartRoomRecordingAsync(string roomId, StartRtcRecordingDto body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/rtc/rooms/{roomId}/recordings/start"), body);
        }

        /// <summary>
        /// Stop cloud recording task for a room
        /// </summary>
        public async Task AppControllerStopRoomRecordingAsync(string roomId, StopRtcRecordingDto body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/rtc/rooms/{roomId}/recordings/stop"), body);
        }

        /// <summary>
        /// Create RTC video record
        /// </summary>
        public async Task AppControllerCreateVideoRecordAsync(CreateRtcVideoRecordDto body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath("/rtc/video-records"), body);
        }

        /// <summary>
        /// List all video records
        /// </summary>
        public async Task AppControllerGetVideoRecordsAsync(Dictionary<string, object>? query = null)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath("/rtc/video-records"), query);
        }

        /// <summary>
        /// Get RTC video record detail
        /// </summary>
        public async Task AppControllerGetVideoRecordAsync(string id)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/rtc/video-records/{id}"));
        }

        /// <summary>
        /// Delete video record (soft delete)
        /// </summary>
        public async Task AppControllerDeleteVideoRecordAsync(string id)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/rtc/video-records/{id}"));
        }

        /// <summary>
        /// Get room video records
        /// </summary>
        public async Task AppControllerGetVideoRecordsByRoomIdAsync(string roomId)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/rtc/rooms/{roomId}/video-records"));
        }

        /// <summary>
        /// Get user video records
        /// </summary>
        public async Task AppControllerGetVideoRecordsByUserIdAsync(string userId)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/rtc/users/{userId}/video-records"));
        }

        /// <summary>
        /// Update video record status
        /// </summary>
        public async Task AppControllerUpdateVideoRecordStatusAsync(string id, UpdateRtcVideoRecordStatusDto body)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath($"/rtc/video-records/{id}/status"), body);
        }

        /// <summary>
        /// Update video record metadata
        /// </summary>
        public async Task AppControllerUpdateVideoRecordMetadataAsync(string id, UpdateRtcVideoRecordMetadataDto body)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath($"/rtc/video-records/{id}/metadata"), body);
        }

        /// <summary>
        /// Sync video record state from cloud provider task
        /// </summary>
        public async Task AppControllerSyncVideoRecordAsync(string id, SyncRtcVideoRecordDto body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/rtc/video-records/{id}/sync"), body);
        }
    }
}
