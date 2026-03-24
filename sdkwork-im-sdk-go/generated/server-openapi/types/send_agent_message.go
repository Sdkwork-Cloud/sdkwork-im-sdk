package types


type SendAgentMessage struct {
	Content string `json:"content"`
	Stream bool `json:"stream"`
}
