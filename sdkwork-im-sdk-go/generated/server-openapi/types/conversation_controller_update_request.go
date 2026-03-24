package types


type ConversationControllerUpdateRequest struct {
	IsPinned bool `json:"isPinned"`
	IsMuted bool `json:"isMuted"`
}
