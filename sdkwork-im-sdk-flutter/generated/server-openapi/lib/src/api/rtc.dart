import '../http/client.dart';
import '../models.dart';
import 'paths.dart';
import '../http/response_mapper.dart';

class RtcApi {
  final HttpClient _client;
  
  RtcApi(this._client);

  /// Create RTC room
  Future<RTCRoom?> appControllerCreateRoom(CreateRtcRoomDto body) async {
    final response = await _client.post(ApiPaths.backendPath('/rtc/rooms'), body: body, contentType: 'application/json');
    return decodeResponse<RTCRoom>(response, RTCRoom.fromJson);
  }

  /// End RTC room
  Future<dynamic> appControllerEndRoom(String id) async {
    return await _client.put(ApiPaths.backendPath('/rtc/rooms/${id}/end'));
  }

  /// Get RTC room detail
  Future<RTCRoom?> appControllerGetRoomById(String id) async {
    final response = await _client.get(ApiPaths.backendPath('/rtc/rooms/${id}'));
    return decodeResponse<RTCRoom>(response, RTCRoom.fromJson);
  }

  /// Get user RTC rooms
  Future<RtcAppControllerGetRoomsByUserIdResponse?> appControllerGetRoomsByUserId(String userId) async {
    final response = await _client.get(ApiPaths.backendPath('/rtc/rooms/user/${userId}'));
    return decodeResponse<RtcAppControllerGetRoomsByUserIdResponse>(response, RtcAppControllerGetRoomsByUserIdResponse.fromJson);
  }

  /// Generate RTC token
  Future<RTCToken?> appControllerGenerateToken(GenerateRtcTokenDto body) async {
    final response = await _client.post(ApiPaths.backendPath('/rtc/tokens'), body: body, contentType: 'application/json');
    return decodeResponse<RTCToken>(response, RTCToken.fromJson);
  }

  /// Create aggregated RTC client connection info for provider bootstrap, signaling, and realtime bootstrap
  Future<RtcConnectionInfoResponseDto?> appControllerGetConnectionInfo(String id, RtcConnectionInfoRequestDto body) async {
    final response = await _client.post(ApiPaths.backendPath('/rtc/rooms/${id}/connection'), body: body, contentType: 'application/json');
    return decodeResponse<RtcConnectionInfoResponseDto>(response, RtcConnectionInfoResponseDto.fromJson);
  }

  /// Validate RTC token (POST body, standard)
  Future<RtcTokenValidationResultDto?> appControllerValidateToken(ValidateRtcTokenDto body) async {
    final response = await _client.post(ApiPaths.backendPath('/rtc/tokens/validate'), body: body, contentType: 'application/json');
    return decodeResponse<RtcTokenValidationResultDto>(response, RtcTokenValidationResultDto.fromJson);
  }

  /// Add room participant (creator only)
  Future<dynamic> appControllerAddParticipant(String id, AddRtcParticipantDto body) async {
    return await _client.post(ApiPaths.backendPath('/rtc/rooms/${id}/participants'), body: body, contentType: 'application/json');
  }

  /// Remove room participant (creator or self)
  Future<dynamic> appControllerRemoveParticipant(String id, String userId) async {
    return await _client.delete(ApiPaths.backendPath('/rtc/rooms/${id}/participants/${userId}'));
  }

  /// Get RTC provider capabilities for SDK dynamic integration
  Future<RtcProviderCapabilitiesResponseDto?> appControllerGetProviderCapabilities() async {
    final response = await _client.get(ApiPaths.backendPath('/rtc/providers/capabilities'));
    return decodeResponse<RtcProviderCapabilitiesResponseDto>(response, RtcProviderCapabilitiesResponseDto.fromJson);
  }

  /// Start cloud recording task for a room
  Future<dynamic> appControllerStartRoomRecording(String roomId, StartRtcRecordingDto body) async {
    return await _client.post(ApiPaths.backendPath('/rtc/rooms/${roomId}/recordings/start'), body: body, contentType: 'application/json');
  }

  /// Stop cloud recording task for a room
  Future<dynamic> appControllerStopRoomRecording(String roomId, StopRtcRecordingDto body) async {
    return await _client.post(ApiPaths.backendPath('/rtc/rooms/${roomId}/recordings/stop'), body: body, contentType: 'application/json');
  }

  /// Create RTC video record
  Future<dynamic> appControllerCreateVideoRecord(CreateRtcVideoRecordDto body) async {
    return await _client.post(ApiPaths.backendPath('/rtc/video-records'), body: body, contentType: 'application/json');
  }

  /// List all video records
  Future<dynamic> appControllerGetVideoRecords(Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/rtc/video-records'), params: params);
  }

  /// Get RTC video record detail
  Future<dynamic> appControllerGetVideoRecord(String id) async {
    return await _client.get(ApiPaths.backendPath('/rtc/video-records/${id}'));
  }

  /// Delete video record (soft delete)
  Future<dynamic> appControllerDeleteVideoRecord(String id) async {
    return await _client.delete(ApiPaths.backendPath('/rtc/video-records/${id}'));
  }

  /// Get room video records
  Future<dynamic> appControllerGetVideoRecordsByRoomId(String roomId) async {
    return await _client.get(ApiPaths.backendPath('/rtc/rooms/${roomId}/video-records'));
  }

  /// Get user video records
  Future<dynamic> appControllerGetVideoRecordsByUserId(String userId) async {
    return await _client.get(ApiPaths.backendPath('/rtc/users/${userId}/video-records'));
  }

  /// Update video record status
  Future<dynamic> appControllerUpdateVideoRecordStatus(String id, UpdateRtcVideoRecordStatusDto body) async {
    return await _client.put(ApiPaths.backendPath('/rtc/video-records/${id}/status'), body: body, contentType: 'application/json');
  }

  /// Update video record metadata
  Future<dynamic> appControllerUpdateVideoRecordMetadata(String id, UpdateRtcVideoRecordMetadataDto body) async {
    return await _client.put(ApiPaths.backendPath('/rtc/video-records/${id}/metadata'), body: body, contentType: 'application/json');
  }

  /// Sync video record state from cloud provider task
  Future<dynamic> appControllerSyncVideoRecord(String id, SyncRtcVideoRecordDto body) async {
    return await _client.post(ApiPaths.backendPath('/rtc/video-records/${id}/sync'), body: body, contentType: 'application/json');
  }
}
