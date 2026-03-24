package api

import (
    "fmt"
    sdktypes "github.com/sdkwork/backend-sdk/types"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type RtcApi struct {
    client *sdkhttp.Client
}

func NewRtcApi(client *sdkhttp.Client) *RtcApi {
    return &RtcApi{client: client}
}

// Create RTC room
func (a *RtcApi) AppControllerCreateRoom(body sdktypes.CreateRtcRoomDto) (sdktypes.RTCRoom, error) {
    raw, err := a.client.Post(BackendApiPath("/rtc/rooms"), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.RTCRoom
        return zero, err
    }
    return decodeResult[sdktypes.RTCRoom](raw)
}

// End RTC room
func (a *RtcApi) AppControllerEndRoom(id string) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/rtc/rooms/%s/end", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get RTC room detail
func (a *RtcApi) AppControllerGetRoomById(id string) (sdktypes.RTCRoom, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/rtc/rooms/%s", id)), nil, nil)
    if err != nil {
        var zero sdktypes.RTCRoom
        return zero, err
    }
    return decodeResult[sdktypes.RTCRoom](raw)
}

// Get user RTC rooms
func (a *RtcApi) AppControllerGetRoomsByUserId(userId string) (sdktypes.RtcAppControllerGetRoomsByUserIdResponse, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/rtc/rooms/user/%s", userId)), nil, nil)
    if err != nil {
        var zero sdktypes.RtcAppControllerGetRoomsByUserIdResponse
        return zero, err
    }
    return decodeResult[sdktypes.RtcAppControllerGetRoomsByUserIdResponse](raw)
}

// Generate RTC token
func (a *RtcApi) AppControllerGenerateToken(body sdktypes.GenerateRtcTokenDto) (sdktypes.RTCToken, error) {
    raw, err := a.client.Post(BackendApiPath("/rtc/tokens"), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.RTCToken
        return zero, err
    }
    return decodeResult[sdktypes.RTCToken](raw)
}

// Validate RTC token (POST body, standard)
func (a *RtcApi) AppControllerValidateToken(body sdktypes.ValidateRtcTokenDto) (sdktypes.RtcTokenValidationResultDto, error) {
    raw, err := a.client.Post(BackendApiPath("/rtc/tokens/validate"), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.RtcTokenValidationResultDto
        return zero, err
    }
    return decodeResult[sdktypes.RtcTokenValidationResultDto](raw)
}

// Add room participant (creator only)
func (a *RtcApi) AppControllerAddParticipant(id string, body sdktypes.AddRtcParticipantDto) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/rtc/rooms/%s/participants", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Remove room participant (creator or self)
func (a *RtcApi) AppControllerRemoveParticipant(id string, userId string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/rtc/rooms/%s/participants/%s", id, userId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get RTC provider capabilities for SDK dynamic integration
func (a *RtcApi) AppControllerGetProviderCapabilities() (sdktypes.RtcProviderCapabilitiesResponseDto, error) {
    raw, err := a.client.Get(BackendApiPath("/rtc/providers/capabilities"), nil, nil)
    if err != nil {
        var zero sdktypes.RtcProviderCapabilitiesResponseDto
        return zero, err
    }
    return decodeResult[sdktypes.RtcProviderCapabilitiesResponseDto](raw)
}

// Start cloud recording task for a room
func (a *RtcApi) AppControllerStartRoomRecording(roomId string, body sdktypes.StartRtcRecordingDto) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/rtc/rooms/%s/recordings/start", roomId)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Stop cloud recording task for a room
func (a *RtcApi) AppControllerStopRoomRecording(roomId string, body sdktypes.StopRtcRecordingDto) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/rtc/rooms/%s/recordings/stop", roomId)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Create RTC video record
func (a *RtcApi) AppControllerCreateVideoRecord(body sdktypes.CreateRtcVideoRecordDto) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/rtc/video-records"), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// List all video records
func (a *RtcApi) AppControllerGetVideoRecords(query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/rtc/video-records"), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get RTC video record detail
func (a *RtcApi) AppControllerGetVideoRecord(id string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/rtc/video-records/%s", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Delete video record (soft delete)
func (a *RtcApi) AppControllerDeleteVideoRecord(id string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/rtc/video-records/%s", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get room video records
func (a *RtcApi) AppControllerGetVideoRecordsByRoomId(roomId string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/rtc/rooms/%s/video-records", roomId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get user video records
func (a *RtcApi) AppControllerGetVideoRecordsByUserId(userId string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/rtc/users/%s/video-records", userId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Update video record status
func (a *RtcApi) AppControllerUpdateVideoRecordStatus(id string, body sdktypes.UpdateRtcVideoRecordStatusDto) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/rtc/video-records/%s/status", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Update video record metadata
func (a *RtcApi) AppControllerUpdateVideoRecordMetadata(id string, body sdktypes.UpdateRtcVideoRecordMetadataDto) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/rtc/video-records/%s/metadata", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Sync video record state from cloud provider task
func (a *RtcApi) AppControllerSyncVideoRecord(id string, body sdktypes.SyncRtcVideoRecordDto) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/rtc/video-records/%s/sync", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}
