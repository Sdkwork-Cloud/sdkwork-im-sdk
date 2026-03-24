package api

import (
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type WukongimApi struct {
    client *sdkhttp.Client
}

func NewWukongimApi(client *sdkhttp.Client) *WukongimApi {
    return &WukongimApi{client: client}
}

// Get WuKongIM connection config
func (a *WukongimApi) WukongImappControllerGetConfig() (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/wukongim/config"), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get WuKongIM user token
func (a *WukongimApi) WukongImappControllerGetToken() (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/wukongim/token"), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}
