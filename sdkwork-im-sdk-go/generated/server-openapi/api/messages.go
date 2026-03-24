package api

import (
    "fmt"
    sdktypes "github.com/sdkwork/backend-sdk/types"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type MessagesApi struct {
    client *sdkhttp.Client
}

func NewMessagesApi(client *sdkhttp.Client) *MessagesApi {
    return &MessagesApi{client: client}
}

// 发送消息
func (a *MessagesApi) MessageControllerSend(body sdktypes.SendMessage) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/messages"), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 批量发送消息
func (a *MessagesApi) MessageControllerBatchSend(body sdktypes.BatchSendMessage) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/messages/batch"), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取用户消息列表
func (a *MessagesApi) MessageControllerGetByUserId(userId string, query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/messages/user/%s", userId)), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取群组消息列表
func (a *MessagesApi) MessageControllerGetByGroupId(groupId string, query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/messages/group/%s", groupId)), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 按序列号增量拉取会话消息
func (a *MessagesApi) MessageControllerGetHistoryBySeq(query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/messages/history/seq"), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 确认会话同步序列（支持设备维度）
func (a *MessagesApi) MessageControllerAckConversationSeq(body sdktypes.AckConversationSeqRequest) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/messages/sync/ack-seq"), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 批量确认会话同步序列（支持设备维度）
func (a *MessagesApi) MessageControllerAckConversationSeqBatch(body sdktypes.AckConversationSeqBatchRequest) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/messages/sync/ack-seq/batch"), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取消息详情
func (a *MessagesApi) MessageControllerGetById(id string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/messages/%s", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 删除消息
func (a *MessagesApi) MessageControllerDelete(id string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/messages/%s", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取消息回执详情
func (a *MessagesApi) MessageControllerGetReceipts(id string, query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/messages/%s/receipts", id)), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取消息回执统计
func (a *MessagesApi) MessageControllerGetReceiptSummary(id string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/messages/%s/receipt-summary", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取群消息未读成员列表
func (a *MessagesApi) MessageControllerGetGroupUnreadMembers(id string, query map[string]interface{}) (sdktypes.MessageUnreadMembersResponse, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/messages/%s/unread-members", id)), query, nil)
    if err != nil {
        var zero sdktypes.MessageUnreadMembersResponse
        return zero, err
    }
    return decodeResult[sdktypes.MessageUnreadMembersResponse](raw)
}

// 获取群消息已读成员列表
func (a *MessagesApi) MessageControllerGetGroupReadMembers(id string, query map[string]interface{}) (sdktypes.MessageReadMembersResponse, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/messages/%s/read-members", id)), query, nil)
    if err != nil {
        var zero sdktypes.MessageReadMembersResponse
        return zero, err
    }
    return decodeResult[sdktypes.MessageReadMembersResponse](raw)
}

// 更新消息状态
func (a *MessagesApi) MessageControllerUpdateStatus(id string, body sdktypes.UpdateMessageStatus) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/messages/%s/status", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 编辑消息内容
func (a *MessagesApi) MessageControllerEdit(id string, body sdktypes.EditMessage) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/messages/%s/content", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取消息反应汇总
func (a *MessagesApi) MessageControllerGetReactionSummary(id string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/messages/%s/reactions", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 设置消息反应
func (a *MessagesApi) MessageControllerSetReaction(id string, body sdktypes.SetMessageReaction) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/messages/%s/reactions", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 标记群消息为已读
func (a *MessagesApi) MessageControllerMarkGroupAsRead(groupId string, body sdktypes.MarkMessagesRead) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/messages/group/%s/read", groupId)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 标记消息为已读
func (a *MessagesApi) MessageControllerMarkAsRead(userId string, body sdktypes.MarkMessagesRead) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/messages/%s/read", userId)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 撤回消息
func (a *MessagesApi) MessageControllerRecall(id string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/messages/%s/recall", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 转发消息
func (a *MessagesApi) MessageControllerForward(id string, body sdktypes.ForwardMessage) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/messages/%s/forward", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 重试发送失败的消息
func (a *MessagesApi) MessageControllerRetryFailed(id string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/messages/%s/retry", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}
