package types


type BotOpenWebhookTestEventRequestDto struct {
	EventType string `json:"eventType"`
	Data map[string]interface{} `json:"data"`
}
