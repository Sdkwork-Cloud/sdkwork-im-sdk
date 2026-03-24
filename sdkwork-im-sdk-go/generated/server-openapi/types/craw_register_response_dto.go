package types


type CrawRegisterResponseDto struct {
	Success bool `json:"success"`
	Agent CrawRegisterAgentDataDto `json:"agent"`
	Important string `json:"important"`
	Error string `json:"error"`
}
