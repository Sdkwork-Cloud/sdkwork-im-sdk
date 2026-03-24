import Foundation

public class RtcApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// Create RTC room
    public func appControllerCreateRoom(body: CreateRtcRoomDto) async throws -> RTCRoom? {
        let response = try await client.post(ApiPaths.backendPath("/rtc/rooms"), body: body)
        return response as? RTCRoom
    }

    /// End RTC room
    public func appControllerEndRoom(id: String) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/rtc/rooms/\(id)/end"), body: nil)
    }

    /// Get RTC room detail
    public func appControllerGetRoomById(id: String) async throws -> RTCRoom? {
        let response = try await client.get(ApiPaths.backendPath("/rtc/rooms/\(id)"))
        return response as? RTCRoom
    }

    /// Get user RTC rooms
    public func appControllerGetRoomsByUserId(userId: String) async throws -> RtcAppControllerGetRoomsByUserIdResponse? {
        let response = try await client.get(ApiPaths.backendPath("/rtc/rooms/user/\(userId)"))
        return response as? RtcAppControllerGetRoomsByUserIdResponse
    }

    /// Generate RTC token
    public func appControllerGenerateToken(body: GenerateRtcTokenDto) async throws -> RTCToken? {
        let response = try await client.post(ApiPaths.backendPath("/rtc/tokens"), body: body)
        return response as? RTCToken
    }

    /// Validate RTC token (POST body, standard)
    public func appControllerValidateToken(body: ValidateRtcTokenDto) async throws -> RtcTokenValidationResultDto? {
        let response = try await client.post(ApiPaths.backendPath("/rtc/tokens/validate"), body: body)
        return response as? RtcTokenValidationResultDto
    }

    /// Add room participant (creator only)
    public func appControllerAddParticipant(id: String, body: AddRtcParticipantDto) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/rtc/rooms/\(id)/participants"), body: body)
    }

    /// Remove room participant (creator or self)
    public func appControllerRemoveParticipant(id: String, userId: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/rtc/rooms/\(id)/participants/\(userId)"))
    }

    /// Get RTC provider capabilities for SDK dynamic integration
    public func appControllerGetProviderCapabilities() async throws -> RtcProviderCapabilitiesResponseDto? {
        let response = try await client.get(ApiPaths.backendPath("/rtc/providers/capabilities"))
        return response as? RtcProviderCapabilitiesResponseDto
    }

    /// Start cloud recording task for a room
    public func appControllerStartRoomRecording(roomId: String, body: StartRtcRecordingDto) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/rtc/rooms/\(roomId)/recordings/start"), body: body)
    }

    /// Stop cloud recording task for a room
    public func appControllerStopRoomRecording(roomId: String, body: StopRtcRecordingDto) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/rtc/rooms/\(roomId)/recordings/stop"), body: body)
    }

    /// Create RTC video record
    public func appControllerCreateVideoRecord(body: CreateRtcVideoRecordDto) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/rtc/video-records"), body: body)
    }

    /// List all video records
    public func appControllerGetVideoRecords(params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/rtc/video-records"), params: params)
    }

    /// Get RTC video record detail
    public func appControllerGetVideoRecord(id: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/rtc/video-records/\(id)"))
    }

    /// Delete video record (soft delete)
    public func appControllerDeleteVideoRecord(id: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/rtc/video-records/\(id)"))
    }

    /// Get room video records
    public func appControllerGetVideoRecordsByRoomId(roomId: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/rtc/rooms/\(roomId)/video-records"))
    }

    /// Get user video records
    public func appControllerGetVideoRecordsByUserId(userId: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/rtc/users/\(userId)/video-records"))
    }

    /// Update video record status
    public func appControllerUpdateVideoRecordStatus(id: String, body: UpdateRtcVideoRecordStatusDto) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/rtc/video-records/\(id)/status"), body: body)
    }

    /// Update video record metadata
    public func appControllerUpdateVideoRecordMetadata(id: String, body: UpdateRtcVideoRecordMetadataDto) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/rtc/video-records/\(id)/metadata"), body: body)
    }

    /// Sync video record state from cloud provider task
    public func appControllerSyncVideoRecord(id: String, body: SyncRtcVideoRecordDto) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/rtc/video-records/\(id)/sync"), body: body)
    }
}
