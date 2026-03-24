package types


type SendMessage struct {
	Version float64 `json:"version"`
	Conversation ConversationEnvelope `json:"conversation"`
	Message MessageEnvelope `json:"message"`
	Event EventContentTransport `json:"event"`
	Uuid string `json:"uuid"`
	Type string `json:"type"`
	Content MessageContent `json:"content"`
	FromUserId string `json:"fromUserId"`
	ToUserId string `json:"toUserId"`
	GroupId string `json:"groupId"`
	ReplyToId string `json:"replyToId"`
	ForwardFromId string `json:"forwardFromId"`
	ClientSeq float64 `json:"clientSeq"`
	IdempotencyKey string `json:"idempotencyKey"`
	Extra map[string]interface{} `json:"extra"`
	NeedReadReceipt bool `json:"needReadReceipt"`
}
