package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class RtcApi {
    private final HttpClient client;
    
    public RtcApi(HttpClient client) {
        this.client = client;
    }

    /** Create RTC room */
    public RTCRoom appControllerCreateRoom(CreateRtcRoomDto body) throws Exception {
        return (RTCRoom) client.post(ApiPaths.backendPath("/rtc/rooms"), body);
    }

    /** End RTC room */
    public Void appControllerEndRoom(String id) throws Exception {
        client.put(ApiPaths.backendPath("/rtc/rooms/" + id + "/end"), null);
        return null;
    }

    /** Get RTC room detail */
    public RTCRoom appControllerGetRoomById(String id) throws Exception {
        return (RTCRoom) client.get(ApiPaths.backendPath("/rtc/rooms/" + id + ""));
    }

    /** Get user RTC rooms */
    public RtcAppControllerGetRoomsByUserIdResponse appControllerGetRoomsByUserId(String userId) throws Exception {
        return (RtcAppControllerGetRoomsByUserIdResponse) client.get(ApiPaths.backendPath("/rtc/rooms/user/" + userId + ""));
    }

    /** Generate RTC token */
    public RTCToken appControllerGenerateToken(GenerateRtcTokenDto body) throws Exception {
        return (RTCToken) client.post(ApiPaths.backendPath("/rtc/tokens"), body);
    }

    /** Validate RTC token (POST body, standard) */
    public RtcTokenValidationResultDto appControllerValidateToken(ValidateRtcTokenDto body) throws Exception {
        return (RtcTokenValidationResultDto) client.post(ApiPaths.backendPath("/rtc/tokens/validate"), body);
    }

    /** Add room participant (creator only) */
    public Void appControllerAddParticipant(String id, AddRtcParticipantDto body) throws Exception {
        client.post(ApiPaths.backendPath("/rtc/rooms/" + id + "/participants"), body);
        return null;
    }

    /** Remove room participant (creator or self) */
    public Void appControllerRemoveParticipant(String id, String userId) throws Exception {
        client.delete(ApiPaths.backendPath("/rtc/rooms/" + id + "/participants/" + userId + ""));
        return null;
    }

    /** Get RTC provider capabilities for SDK dynamic integration */
    public RtcProviderCapabilitiesResponseDto appControllerGetProviderCapabilities() throws Exception {
        return (RtcProviderCapabilitiesResponseDto) client.get(ApiPaths.backendPath("/rtc/providers/capabilities"));
    }

    /** Start cloud recording task for a room */
    public Void appControllerStartRoomRecording(String roomId, StartRtcRecordingDto body) throws Exception {
        client.post(ApiPaths.backendPath("/rtc/rooms/" + roomId + "/recordings/start"), body);
        return null;
    }

    /** Stop cloud recording task for a room */
    public Void appControllerStopRoomRecording(String roomId, StopRtcRecordingDto body) throws Exception {
        client.post(ApiPaths.backendPath("/rtc/rooms/" + roomId + "/recordings/stop"), body);
        return null;
    }

    /** Create RTC video record */
    public Void appControllerCreateVideoRecord(CreateRtcVideoRecordDto body) throws Exception {
        client.post(ApiPaths.backendPath("/rtc/video-records"), body);
        return null;
    }

    /** List all video records */
    public Void appControllerGetVideoRecords(Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/rtc/video-records"), params);
        return null;
    }

    /** Get RTC video record detail */
    public Void appControllerGetVideoRecord(String id) throws Exception {
        client.get(ApiPaths.backendPath("/rtc/video-records/" + id + ""));
        return null;
    }

    /** Delete video record (soft delete) */
    public Void appControllerDeleteVideoRecord(String id) throws Exception {
        client.delete(ApiPaths.backendPath("/rtc/video-records/" + id + ""));
        return null;
    }

    /** Get room video records */
    public Void appControllerGetVideoRecordsByRoomId(String roomId) throws Exception {
        client.get(ApiPaths.backendPath("/rtc/rooms/" + roomId + "/video-records"));
        return null;
    }

    /** Get user video records */
    public Void appControllerGetVideoRecordsByUserId(String userId) throws Exception {
        client.get(ApiPaths.backendPath("/rtc/users/" + userId + "/video-records"));
        return null;
    }

    /** Update video record status */
    public Void appControllerUpdateVideoRecordStatus(String id, UpdateRtcVideoRecordStatusDto body) throws Exception {
        client.put(ApiPaths.backendPath("/rtc/video-records/" + id + "/status"), body);
        return null;
    }

    /** Update video record metadata */
    public Void appControllerUpdateVideoRecordMetadata(String id, UpdateRtcVideoRecordMetadataDto body) throws Exception {
        client.put(ApiPaths.backendPath("/rtc/video-records/" + id + "/metadata"), body);
        return null;
    }

    /** Sync video record state from cloud provider task */
    public Void appControllerSyncVideoRecord(String id, SyncRtcVideoRecordDto body) throws Exception {
        client.post(ApiPaths.backendPath("/rtc/video-records/" + id + "/sync"), body);
        return null;
    }
}
