from typing import Any, Dict, List, Optional
from ..http_client import HttpClient
from ..models import AddRtcParticipantDto, CreateRtcRoomDto, CreateRtcVideoRecordDto, GenerateRtcTokenDto, RtcAppControllerGetRoomsByUserIdResponse, RtcProviderCapabilitiesResponseDto, RTCRoom, RTCToken, RtcTokenValidationResultDto, StartRtcRecordingDto, StopRtcRecordingDto, SyncRtcVideoRecordDto, UpdateRtcVideoRecordMetadataDto, UpdateRtcVideoRecordStatusDto, ValidateRtcTokenDto

class RtcApi:
    """rtc API client."""
    
    def __init__(self, client: HttpClient):
        self._client = client

    def app_controller_create_room(self, body: CreateRtcRoomDto) -> RTCRoom:
        """Create RTC room"""
        return self._client.post(f"/im/v3/rtc/rooms", json=body)

    def app_controller_end_room(self, id: str) -> None:
        """End RTC room"""
        return self._client.put(f"/im/v3/rtc/rooms/{id}/end")

    def app_controller_get_room_by_id(self, id: str) -> RTCRoom:
        """Get RTC room detail"""
        return self._client.get(f"/im/v3/rtc/rooms/{id}")

    def app_controller_get_rooms_by_user_id(self, userId: str) -> RtcAppControllerGetRoomsByUserIdResponse:
        """Get user RTC rooms"""
        return self._client.get(f"/im/v3/rtc/rooms/user/{userId}")

    def app_controller_generate_token(self, body: GenerateRtcTokenDto) -> RTCToken:
        """Generate RTC token"""
        return self._client.post(f"/im/v3/rtc/tokens", json=body)

    def app_controller_validate_token(self, body: ValidateRtcTokenDto) -> RtcTokenValidationResultDto:
        """Validate RTC token (POST body, standard)"""
        return self._client.post(f"/im/v3/rtc/tokens/validate", json=body)

    def app_controller_add_participant(self, id: str, body: AddRtcParticipantDto) -> None:
        """Add room participant (creator only)"""
        return self._client.post(f"/im/v3/rtc/rooms/{id}/participants", json=body)

    def app_controller_remove_participant(self, id: str, userId: str) -> None:
        """Remove room participant (creator or self)"""
        return self._client.delete(f"/im/v3/rtc/rooms/{id}/participants/{userId}")

    def app_controller_get_provider_capabilities(self) -> RtcProviderCapabilitiesResponseDto:
        """Get RTC provider capabilities for SDK dynamic integration"""
        return self._client.get(f"/im/v3/rtc/providers/capabilities")

    def app_controller_start_room_recording(self, roomId: str, body: StartRtcRecordingDto) -> None:
        """Start cloud recording task for a room"""
        return self._client.post(f"/im/v3/rtc/rooms/{roomId}/recordings/start", json=body)

    def app_controller_stop_room_recording(self, roomId: str, body: StopRtcRecordingDto) -> None:
        """Stop cloud recording task for a room"""
        return self._client.post(f"/im/v3/rtc/rooms/{roomId}/recordings/stop", json=body)

    def app_controller_create_video_record(self, body: CreateRtcVideoRecordDto) -> None:
        """Create RTC video record"""
        return self._client.post(f"/im/v3/rtc/video-records", json=body)

    def app_controller_get_video_records(self, params: Optional[Dict[str, Any]] = None) -> None:
        """List all video records"""
        return self._client.get(f"/im/v3/rtc/video-records", params=params)

    def app_controller_get_video_record(self, id: str) -> None:
        """Get RTC video record detail"""
        return self._client.get(f"/im/v3/rtc/video-records/{id}")

    def app_controller_delete_video_record(self, id: str) -> None:
        """Delete video record (soft delete)"""
        return self._client.delete(f"/im/v3/rtc/video-records/{id}")

    def app_controller_get_video_records_by_room_id(self, roomId: str) -> None:
        """Get room video records"""
        return self._client.get(f"/im/v3/rtc/rooms/{roomId}/video-records")

    def app_controller_get_video_records_by_user_id(self, userId: str) -> None:
        """Get user video records"""
        return self._client.get(f"/im/v3/rtc/users/{userId}/video-records")

    def app_controller_update_video_record_status(self, id: str, body: UpdateRtcVideoRecordStatusDto) -> None:
        """Update video record status"""
        return self._client.put(f"/im/v3/rtc/video-records/{id}/status", json=body)

    def app_controller_update_video_record_metadata(self, id: str, body: UpdateRtcVideoRecordMetadataDto) -> None:
        """Update video record metadata"""
        return self._client.put(f"/im/v3/rtc/video-records/{id}/metadata", json=body)

    def app_controller_sync_video_record(self, id: str, body: SyncRtcVideoRecordDto) -> None:
        """Sync video record state from cloud provider task"""
        return self._client.post(f"/im/v3/rtc/video-records/{id}/sync", json=body)
