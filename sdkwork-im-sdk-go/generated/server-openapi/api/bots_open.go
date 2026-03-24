package api

import (
    sdktypes "github.com/sdkwork/backend-sdk/types"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type BotsOpenApi struct {
    client *sdkhttp.Client
}

func NewBotsOpenApi(client *sdkhttp.Client) *BotsOpenApi {
    return &BotsOpenApi{client: client}
}

// 获取当前 Bot 信息（Bot Token）
func (a *BotsOpenApi) BotOpenControllerGetCurrent() (sdktypes.BotOpenProfileResponseDto, error) {
    raw, err := a.client.Get(BackendApiPath("/bots/open/me"), nil, nil)
    if err != nil {
        var zero sdktypes.BotOpenProfileResponseDto
        return zero, err
    }
    return decodeResult[sdktypes.BotOpenProfileResponseDto](raw)
}

// 获取当前 Bot 的 Webhook 统计（Bot Token）
func (a *BotsOpenApi) BotOpenControllerGetWebhookStats() (sdktypes.BotOpenWebhookStatsResponseDto, error) {
    raw, err := a.client.Get(BackendApiPath("/bots/open/webhook/stats"), nil, nil)
    if err != nil {
        var zero sdktypes.BotOpenWebhookStatsResponseDto
        return zero, err
    }
    return decodeResult[sdktypes.BotOpenWebhookStatsResponseDto](raw)
}

// 触发当前 Bot 的 Webhook 测试事件（Bot Token）
func (a *BotsOpenApi) BotOpenControllerSendWebhookTestEvent(body sdktypes.BotOpenWebhookTestEventRequestDto) (sdktypes.BotOpenWebhookResultResponseDto, error) {
    raw, err := a.client.Post(BackendApiPath("/bots/open/webhook/test-event"), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.BotOpenWebhookResultResponseDto
        return zero, err
    }
    return decodeResult[sdktypes.BotOpenWebhookResultResponseDto](raw)
}
