package api

import (
    "fmt"
    sdktypes "github.com/sdkwork/backend-sdk/types"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type AiBotApi struct {
    client *sdkhttp.Client
}

func NewAiBotApi(client *sdkhttp.Client) *AiBotApi {
    return &AiBotApi{client: client}
}

// Create a new AI Bot
func (a *AiBotApi) AibotControllerCreateBot(body sdktypes.AibotControllerCreateBotRequest) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/ai-bots"), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get all AI Bots
func (a *AiBotApi) AibotControllerGetBots() (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/ai-bots"), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get an AI Bot by ID
func (a *AiBotApi) AibotControllerGetBot(id string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/ai-bots/%s", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Update an AI Bot
func (a *AiBotApi) AibotControllerUpdateBot(id string, body sdktypes.AibotControllerUpdateBotRequest) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/ai-bots/%s", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Delete an AI Bot
func (a *AiBotApi) AibotControllerDeleteBot(id string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/ai-bots/%s", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Activate an AI Bot
func (a *AiBotApi) AibotControllerActivateBot(id string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/ai-bots/%s/activate", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Deactivate an AI Bot
func (a *AiBotApi) AibotControllerDeactivateBot(id string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/ai-bots/%s/deactivate", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Process a message with AI Bot
func (a *AiBotApi) AibotControllerProcessMessage(id string, body sdktypes.AibotControllerProcessMessageRequest) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/ai-bots/%s/messages", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}
