package api

import (
    "fmt"
    sdktypes "github.com/sdkwork/backend-sdk/types"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type BotsApi struct {
    client *sdkhttp.Client
}

func NewBotsApi(client *sdkhttp.Client) *BotsApi {
    return &BotsApi{client: client}
}

// 创建 Bot
func (a *BotsApi) BotControllerCreate(body sdktypes.CreateBotDto) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/bots"), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取 Bot 列表
func (a *BotsApi) BotControllerGet(query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/bots"), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取 Bot 详情
func (a *BotsApi) BotControllerGetById(id string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/bots/%s", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 更新 Bot
func (a *BotsApi) BotControllerUpdate(id string, body sdktypes.UpdateBotDto) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/bots/%s", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 删除 Bot
func (a *BotsApi) BotControllerDelete(id string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/bots/%s", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 重新生成 Bot Token
func (a *BotsApi) BotControllerRegenerateToken(id string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/bots/%s/regenerate-token", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 设置 Webhook
func (a *BotsApi) BotControllerSetWebhook(id string, body sdktypes.SetWebhookDto) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/bots/%s/webhook", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 删除 Webhook
func (a *BotsApi) BotControllerDeleteWebhook(id string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/bots/%s/webhook", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}
