package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class RtcApi(private val client: HttpClient) {

    /** Create RTC room */
    suspend fun appControllerCreateRoom(body: CreateRtcRoomDto): RTCRoom? {
        return client.post(ApiPaths.backendPath("/rtc/rooms"), body) as? RTCRoom
    }

    /** End RTC room */
    suspend fun appControllerEndRoom(id: String): Unit {
        client.put(ApiPaths.backendPath("/rtc/rooms/$id/end"), null)
    }

    /** Get RTC room detail */
    suspend fun appControllerGetRoomById(id: String): RTCRoom? {
        return client.get(ApiPaths.backendPath("/rtc/rooms/$id")) as? RTCRoom
    }

    /** Get user RTC rooms */
    suspend fun appControllerGetRoomsByUserId(userId: String): RtcAppControllerGetRoomsByUserIdResponse? {
        return client.get(ApiPaths.backendPath("/rtc/rooms/user/$userId")) as? RtcAppControllerGetRoomsByUserIdResponse
    }

    /** Generate RTC token */
    suspend fun appControllerGenerateToken(body: GenerateRtcTokenDto): RTCToken? {
        return client.post(ApiPaths.backendPath("/rtc/tokens"), body) as? RTCToken
    }

    /** Validate RTC token (POST body, standard) */
    suspend fun appControllerValidateToken(body: ValidateRtcTokenDto): RtcTokenValidationResultDto? {
        return client.post(ApiPaths.backendPath("/rtc/tokens/validate"), body) as? RtcTokenValidationResultDto
    }

    /** Add room participant (creator only) */
    suspend fun appControllerAddParticipant(id: String, body: AddRtcParticipantDto): Unit {
        client.post(ApiPaths.backendPath("/rtc/rooms/$id/participants"), body)
    }

    /** Remove room participant (creator or self) */
    suspend fun appControllerRemoveParticipant(id: String, userId: String): Unit {
        client.delete(ApiPaths.backendPath("/rtc/rooms/$id/participants/$userId"))
    }

    /** Get RTC provider capabilities for SDK dynamic integration */
    suspend fun appControllerGetProviderCapabilities(): RtcProviderCapabilitiesResponseDto? {
        return client.get(ApiPaths.backendPath("/rtc/providers/capabilities")) as? RtcProviderCapabilitiesResponseDto
    }

    /** Start cloud recording task for a room */
    suspend fun appControllerStartRoomRecording(roomId: String, body: StartRtcRecordingDto): Unit {
        client.post(ApiPaths.backendPath("/rtc/rooms/$roomId/recordings/start"), body)
    }

    /** Stop cloud recording task for a room */
    suspend fun appControllerStopRoomRecording(roomId: String, body: StopRtcRecordingDto): Unit {
        client.post(ApiPaths.backendPath("/rtc/rooms/$roomId/recordings/stop"), body)
    }

    /** Create RTC video record */
    suspend fun appControllerCreateVideoRecord(body: CreateRtcVideoRecordDto): Unit {
        client.post(ApiPaths.backendPath("/rtc/video-records"), body)
    }

    /** List all video records */
    suspend fun appControllerGetVideoRecords(params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/rtc/video-records"), params)
    }

    /** Get RTC video record detail */
    suspend fun appControllerGetVideoRecord(id: String): Unit {
        client.get(ApiPaths.backendPath("/rtc/video-records/$id"))
    }

    /** Delete video record (soft delete) */
    suspend fun appControllerDeleteVideoRecord(id: String): Unit {
        client.delete(ApiPaths.backendPath("/rtc/video-records/$id"))
    }

    /** Get room video records */
    suspend fun appControllerGetVideoRecordsByRoomId(roomId: String): Unit {
        client.get(ApiPaths.backendPath("/rtc/rooms/$roomId/video-records"))
    }

    /** Get user video records */
    suspend fun appControllerGetVideoRecordsByUserId(userId: String): Unit {
        client.get(ApiPaths.backendPath("/rtc/users/$userId/video-records"))
    }

    /** Update video record status */
    suspend fun appControllerUpdateVideoRecordStatus(id: String, body: UpdateRtcVideoRecordStatusDto): Unit {
        client.put(ApiPaths.backendPath("/rtc/video-records/$id/status"), body)
    }

    /** Update video record metadata */
    suspend fun appControllerUpdateVideoRecordMetadata(id: String, body: UpdateRtcVideoRecordMetadataDto): Unit {
        client.put(ApiPaths.backendPath("/rtc/video-records/$id/metadata"), body)
    }

    /** Sync video record state from cloud provider task */
    suspend fun appControllerSyncVideoRecord(id: String, body: SyncRtcVideoRecordDto): Unit {
        client.post(ApiPaths.backendPath("/rtc/video-records/$id/sync"), body)
    }
}
