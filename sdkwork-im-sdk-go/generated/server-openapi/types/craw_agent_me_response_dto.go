package types


type CrawAgentMeResponseDto struct {
	Success bool `json:"success"`
	Agent CrawAgentDataDto `json:"agent"`
	Error string `json:"error"`
}
