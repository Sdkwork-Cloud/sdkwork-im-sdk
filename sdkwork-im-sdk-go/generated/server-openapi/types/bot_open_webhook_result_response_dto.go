package types


type BotOpenWebhookResultResponseDto struct {
	Success bool `json:"success"`
	StatusCode float64 `json:"statusCode"`
	Error string `json:"error"`
	RetryCount float64 `json:"retryCount"`
	Latency float64 `json:"latency"`
}
