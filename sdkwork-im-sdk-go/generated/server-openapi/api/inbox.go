package api

import (
    sdktypes "github.com/sdkwork/im-sdk-generated/types"
    sdkhttp "github.com/sdkwork/im-sdk-generated/http"
)

type InboxApi struct {
    client *sdkhttp.Client
}

func NewInboxApi(client *sdkhttp.Client) *InboxApi {
    return &InboxApi{client: client}
}

// Get inbox entries
func (a *InboxApi) GetInbox() (sdktypes.InboxResponse, error) {
    raw, err := a.client.Get(ApiPath("/inbox"), nil, nil)
    if err != nil {
        var zero sdktypes.InboxResponse
        return zero, err
    }
    return decodeResult[sdktypes.InboxResponse](raw)
}

