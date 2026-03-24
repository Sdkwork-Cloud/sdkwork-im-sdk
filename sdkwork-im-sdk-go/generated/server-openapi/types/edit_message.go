package types


type EditMessage struct {
	Content MessageContent `json:"content"`
	Extra map[string]interface{} `json:"extra"`
}
