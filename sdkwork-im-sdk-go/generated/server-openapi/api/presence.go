package api

import (
    sdktypes "github.com/sdkwork/im-sdk-generated/types"
    sdkhttp "github.com/sdkwork/im-sdk-generated/http"
)

type PresenceApi struct {
    client *sdkhttp.Client
}

func NewPresenceApi(client *sdkhttp.Client) *PresenceApi {
    return &PresenceApi{client: client}
}

// Refresh device presence
func (a *PresenceApi) Heartbeat(body sdktypes.PresenceDeviceRequest) (sdktypes.PresenceSnapshotView, error) {
    raw, err := a.client.Post(ApiPath("/presence/heartbeat"), body, nil, nil, "application/json")
    if err != nil {
        var zero sdktypes.PresenceSnapshotView
        return zero, err
    }
    return decodeResult[sdktypes.PresenceSnapshotView](raw)
}

// Get current presence
func (a *PresenceApi) GetPresenceMe() (sdktypes.PresenceSnapshotView, error) {
    raw, err := a.client.Get(ApiPath("/presence/me"), nil, nil)
    if err != nil {
        var zero sdktypes.PresenceSnapshotView
        return zero, err
    }
    return decodeResult[sdktypes.PresenceSnapshotView](raw)
}

