package api

import (
    "fmt"
    sdktypes "github.com/sdkwork/backend-sdk/types"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type ConversationsApi struct {
    client *sdkhttp.Client
}

func NewConversationsApi(client *sdkhttp.Client) *ConversationsApi {
    return &ConversationsApi{client: client}
}

// 创建会话
func (a *ConversationsApi) ConversationControllerCreate(body sdktypes.ConversationControllerCreateRequest) (sdktypes.Conversation, error) {
    raw, err := a.client.Post(BackendApiPath("/conversations"), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.Conversation
        return zero, err
    }
    return decodeResult[sdktypes.Conversation](raw)
}

// 获取用户的会话列表
func (a *ConversationsApi) ConversationControllerGetByUserId(query map[string]interface{}) (sdktypes.ConversationControllerGetByUserIdResponse, error) {
    raw, err := a.client.Get(BackendApiPath("/conversations"), query, nil)
    if err != nil {
        var zero sdktypes.ConversationControllerGetByUserIdResponse
        return zero, err
    }
    return decodeResult[sdktypes.ConversationControllerGetByUserIdResponse](raw)
}

// 获取会话同步状态
func (a *ConversationsApi) ConversationControllerGetSyncState(query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/conversations/sync-state"), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 批量获取会话同步状态
func (a *ConversationsApi) ConversationControllerGetSyncStates(body sdktypes.ConversationControllerGetSyncStatesRequest) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/conversations/sync-state/batch"), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 删除设备会话读游标
func (a *ConversationsApi) ConversationControllerDeleteDeviceSyncState(deviceId string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/conversations/sync-state/device/%s", deviceId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取设备会话游标摘要
func (a *ConversationsApi) ConversationControllerGetDeviceSyncStateSummaries(query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/conversations/sync-state/devices"), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 清理失活设备会话游标
func (a *ConversationsApi) ConversationControllerDeleteStaleDeviceSyncStates(query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath("/conversations/sync-state/devices/stale"), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取用户与特定目标的会话
func (a *ConversationsApi) ConversationControllerGetByTarget(targetId string, query map[string]interface{}) (sdktypes.Conversation, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/conversations/target/%s", targetId)), query, nil)
    if err != nil {
        var zero sdktypes.Conversation
        return zero, err
    }
    return decodeResult[sdktypes.Conversation](raw)
}

// 获取未读消息总数
func (a *ConversationsApi) ConversationControllerGetTotalUnreadCount() (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/conversations/unread-total/me"), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取会话详情
func (a *ConversationsApi) ConversationControllerGetById(id string) (sdktypes.Conversation, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/conversations/%s", id)), nil, nil)
    if err != nil {
        var zero sdktypes.Conversation
        return zero, err
    }
    return decodeResult[sdktypes.Conversation](raw)
}

// 更新会话
func (a *ConversationsApi) ConversationControllerUpdate(id string, body sdktypes.ConversationControllerUpdateRequest) (sdktypes.Conversation, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/conversations/%s", id)), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.Conversation
        return zero, err
    }
    return decodeResult[sdktypes.Conversation](raw)
}

// 删除会话
func (a *ConversationsApi) ConversationControllerDelete(id string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/conversations/%s", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 置顶/取消置顶会话
func (a *ConversationsApi) ConversationControllerPin(id string, body sdktypes.ConversationControllerPinRequest) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/conversations/%s/pin", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 设置免打扰
func (a *ConversationsApi) ConversationControllerMute(id string, body sdktypes.ConversationControllerMuteRequest) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/conversations/%s/mute", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 清空未读消息数
func (a *ConversationsApi) ConversationControllerClearUnreadCount(id string) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/conversations/%s/read", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 批量删除会话
func (a *ConversationsApi) ConversationControllerBatchDelete() (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath("/conversations/batch"), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}
