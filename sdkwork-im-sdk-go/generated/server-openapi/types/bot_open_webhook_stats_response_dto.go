package types


type BotOpenWebhookStatsResponseDto struct {
	Configured bool `json:"configured"`
	Url string `json:"url"`
	Events []string `json:"events"`
	PendingRetries float64 `json:"pendingRetries"`
}
