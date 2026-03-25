import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';
import type { AddRtcParticipantDto, CreateRtcRoomDto, CreateRtcVideoRecordDto, GenerateRtcTokenDto, RtcAppControllerGetRoomsByUserIdResponse, RtcConnectionInfoRequestDto, RtcConnectionInfoResponseDto, RtcProviderCapabilitiesResponseDto, RTCRoom, RTCToken, RtcTokenValidationResultDto, StartRtcRecordingDto, StopRtcRecordingDto, SyncRtcVideoRecordDto, UpdateRtcVideoRecordMetadataDto, UpdateRtcVideoRecordStatusDto, ValidateRtcTokenDto } from '../types';


export class RtcApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** Create RTC room */
  async appControllerCreateRoom(body: CreateRtcRoomDto): Promise<RTCRoom> {
    return this.client.post<RTCRoom>(backendApiPath(`/rtc/rooms`), body);
  }

/** End RTC room */
  async appControllerEndRoom(id: string | number): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/rtc/rooms/${id}/end`));
  }

/** Get RTC room detail */
  async appControllerGetRoomById(id: string | number): Promise<RTCRoom> {
    return this.client.get<RTCRoom>(backendApiPath(`/rtc/rooms/${id}`));
  }

/** Get user RTC rooms */
  async appControllerGetRoomsByUserId(userId: string | number): Promise<RtcAppControllerGetRoomsByUserIdResponse> {
    return this.client.get<RtcAppControllerGetRoomsByUserIdResponse>(backendApiPath(`/rtc/rooms/user/${userId}`));
  }

/** Generate RTC token */
  async appControllerGenerateToken(body: GenerateRtcTokenDto): Promise<RTCToken> {
    return this.client.post<RTCToken>(backendApiPath(`/rtc/tokens`), body);
  }

/** Create aggregated RTC client connection info for provider bootstrap, signaling, and realtime bootstrap */
  async appControllerGetConnectionInfo(id: string | number, body: RtcConnectionInfoRequestDto): Promise<RtcConnectionInfoResponseDto> {
    return this.client.post<RtcConnectionInfoResponseDto>(backendApiPath(`/rtc/rooms/${id}/connection`), body);
  }

/** Validate RTC token (POST body, standard) */
  async appControllerValidateToken(body: ValidateRtcTokenDto): Promise<RtcTokenValidationResultDto> {
    return this.client.post<RtcTokenValidationResultDto>(backendApiPath(`/rtc/tokens/validate`), body);
  }

/** Add room participant (creator only) */
  async appControllerAddParticipant(id: string | number, body: AddRtcParticipantDto): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/rtc/rooms/${id}/participants`), body);
  }

/** Remove room participant (creator or self) */
  async appControllerRemoveParticipant(id: string | number, userId: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/rtc/rooms/${id}/participants/${userId}`));
  }

/** Get RTC provider capabilities for SDK dynamic integration */
  async appControllerGetProviderCapabilities(): Promise<RtcProviderCapabilitiesResponseDto> {
    return this.client.get<RtcProviderCapabilitiesResponseDto>(backendApiPath(`/rtc/providers/capabilities`));
  }

/** Start cloud recording task for a room */
  async appControllerStartRoomRecording(roomId: string | number, body: StartRtcRecordingDto): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/rtc/rooms/${roomId}/recordings/start`), body);
  }

/** Stop cloud recording task for a room */
  async appControllerStopRoomRecording(roomId: string | number, body: StopRtcRecordingDto): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/rtc/rooms/${roomId}/recordings/stop`), body);
  }

/** Create RTC video record */
  async appControllerCreateVideoRecord(body: CreateRtcVideoRecordDto): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/rtc/video-records`), body);
  }

/** List all video records */
  async appControllerGetVideoRecords(params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/rtc/video-records`), params);
  }

/** Get RTC video record detail */
  async appControllerGetVideoRecord(id: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/rtc/video-records/${id}`));
  }

/** Delete video record (soft delete) */
  async appControllerDeleteVideoRecord(id: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/rtc/video-records/${id}`));
  }

/** Get room video records */
  async appControllerGetVideoRecordsByRoomId(roomId: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/rtc/rooms/${roomId}/video-records`));
  }

/** Get user video records */
  async appControllerGetVideoRecordsByUserId(userId: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/rtc/users/${userId}/video-records`));
  }

/** Update video record status */
  async appControllerUpdateVideoRecordStatus(id: string | number, body: UpdateRtcVideoRecordStatusDto): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/rtc/video-records/${id}/status`), body);
  }

/** Update video record metadata */
  async appControllerUpdateVideoRecordMetadata(id: string | number, body: UpdateRtcVideoRecordMetadataDto): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/rtc/video-records/${id}/metadata`), body);
  }

/** Sync video record state from cloud provider task */
  async appControllerSyncVideoRecord(id: string | number, body: SyncRtcVideoRecordDto): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/rtc/video-records/${id}/sync`), body);
  }
}

export function createRtcApi(client: HttpClient): RtcApi {
  return new RtcApi(client);
}
