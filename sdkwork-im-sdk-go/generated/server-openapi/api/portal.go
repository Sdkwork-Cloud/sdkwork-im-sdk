package api

import (
    sdktypes "github.com/sdkwork/im-sdk-generated/types"
    sdkhttp "github.com/sdkwork/im-sdk-generated/http"
)

type PortalApi struct {
    client *sdkhttp.Client
}

func NewPortalApi(client *sdkhttp.Client) *PortalApi {
    return &PortalApi{client: client}
}

// Read the tenant portal home snapshot
func (a *PortalApi) GetHome() (sdktypes.PortalSnapshot, error) {
    raw, err := a.client.Get(ApiPath("/portal/home"), nil, nil)
    if err != nil {
        var zero sdktypes.PortalSnapshot
        return zero, err
    }
    return decodeResult[sdktypes.PortalSnapshot](raw)
}

// Read the tenant portal sign-in snapshot
func (a *PortalApi) GetAuth() (sdktypes.PortalSnapshot, error) {
    raw, err := a.client.Get(ApiPath("/portal/auth"), nil, nil)
    if err != nil {
        var zero sdktypes.PortalSnapshot
        return zero, err
    }
    return decodeResult[sdktypes.PortalSnapshot](raw)
}

// Read the current tenant workspace snapshot
func (a *PortalApi) GetWorkspace() (sdktypes.PortalWorkspaceView, error) {
    raw, err := a.client.Get(ApiPath("/portal/workspace"), nil, nil)
    if err != nil {
        var zero sdktypes.PortalWorkspaceView
        return zero, err
    }
    return decodeResult[sdktypes.PortalWorkspaceView](raw)
}

// Read the tenant dashboard snapshot
func (a *PortalApi) GetDashboard() (sdktypes.PortalSnapshot, error) {
    raw, err := a.client.Get(ApiPath("/portal/dashboard"), nil, nil)
    if err != nil {
        var zero sdktypes.PortalSnapshot
        return zero, err
    }
    return decodeResult[sdktypes.PortalSnapshot](raw)
}

// Read the tenant conversations snapshot
func (a *PortalApi) GetConversations() (sdktypes.PortalSnapshot, error) {
    raw, err := a.client.Get(ApiPath("/portal/conversations"), nil, nil)
    if err != nil {
        var zero sdktypes.PortalSnapshot
        return zero, err
    }
    return decodeResult[sdktypes.PortalSnapshot](raw)
}

// Read the tenant realtime snapshot
func (a *PortalApi) GetRealtime() (sdktypes.PortalSnapshot, error) {
    raw, err := a.client.Get(ApiPath("/portal/realtime"), nil, nil)
    if err != nil {
        var zero sdktypes.PortalSnapshot
        return zero, err
    }
    return decodeResult[sdktypes.PortalSnapshot](raw)
}

// Read the tenant media snapshot
func (a *PortalApi) GetMedia() (sdktypes.PortalSnapshot, error) {
    raw, err := a.client.Get(ApiPath("/portal/media"), nil, nil)
    if err != nil {
        var zero sdktypes.PortalSnapshot
        return zero, err
    }
    return decodeResult[sdktypes.PortalSnapshot](raw)
}

// Read the tenant automation snapshot
func (a *PortalApi) GetAutomation() (sdktypes.PortalSnapshot, error) {
    raw, err := a.client.Get(ApiPath("/portal/automation"), nil, nil)
    if err != nil {
        var zero sdktypes.PortalSnapshot
        return zero, err
    }
    return decodeResult[sdktypes.PortalSnapshot](raw)
}

// Read the tenant governance snapshot
func (a *PortalApi) GetGovernance() (sdktypes.PortalSnapshot, error) {
    raw, err := a.client.Get(ApiPath("/portal/governance"), nil, nil)
    if err != nil {
        var zero sdktypes.PortalSnapshot
        return zero, err
    }
    return decodeResult[sdktypes.PortalSnapshot](raw)
}

