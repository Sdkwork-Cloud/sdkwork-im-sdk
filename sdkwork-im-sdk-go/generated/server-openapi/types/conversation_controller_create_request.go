package types


type ConversationControllerCreateRequest struct {
	Type string `json:"type"`
	TargetId string `json:"targetId"`
}
