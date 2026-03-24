package api

import (
    "fmt"
    sdktypes "github.com/sdkwork/backend-sdk/types"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type ThirdPartyApi struct {
    client *sdkhttp.Client
}

func NewThirdPartyApi(client *sdkhttp.Client) *ThirdPartyApi {
    return &ThirdPartyApi{client: client}
}

// 发送第三方平台消息
func (a *ThirdPartyApi) ControllerSendMessage(platform string, body string) (sdktypes.ThirdPartyMessage, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/third-party/%s/messages", platform)), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.ThirdPartyMessage
        return zero, err
    }
    return decodeResult[sdktypes.ThirdPartyMessage](raw)
}

// 获取第三方平台消息状态
func (a *ThirdPartyApi) ControllerGetMessageStatus(platform string, id string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/third-party/%s/messages/%s/status", platform, id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 同步第三方平台联系人
func (a *ThirdPartyApi) ControllerSyncContacts(platform string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/third-party/%s/contacts/sync", platform)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取第三方平台联系人
func (a *ThirdPartyApi) ControllerGetContact(platform string, query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/third-party/%s/contacts", platform)), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}
