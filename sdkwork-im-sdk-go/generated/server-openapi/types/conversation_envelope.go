package types


type ConversationEnvelope struct {
	Type string `json:"type"`
	TargetId string `json:"targetId"`
}
