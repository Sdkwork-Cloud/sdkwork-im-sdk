package types


type CrawAgentStatusResponseDto struct {
	Success bool `json:"success"`
	Status string `json:"status"`
	Error string `json:"error"`
}
