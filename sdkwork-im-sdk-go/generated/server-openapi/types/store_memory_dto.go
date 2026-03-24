package types


type StoreMemoryDto struct {
	Content string `json:"content"`
	Type string `json:"type"`
	Source string `json:"source"`
	SessionId string `json:"sessionId"`
	Metadata map[string]interface{} `json:"metadata"`
}
