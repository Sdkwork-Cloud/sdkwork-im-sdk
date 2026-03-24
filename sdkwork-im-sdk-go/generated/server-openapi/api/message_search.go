package api

import (
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type MessageSearchApi struct {
    client *sdkhttp.Client
}

func NewMessageSearchApi(client *sdkhttp.Client) *MessageSearchApi {
    return &MessageSearchApi{client: client}
}

// 搜索消息
func (a *MessageSearchApi) Controller(query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/messages/search"), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 快速搜索
func (a *MessageSearchApi) ControllerQuick(query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/messages/search/quick"), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 搜索会话消息
func (a *MessageSearchApi) ControllerInConversation(query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/messages/search/conversation"), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 消息统计
func (a *MessageSearchApi) ControllerGetStats(query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/messages/search/stats"), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}
