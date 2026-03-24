package types


type AckConversationSeqItemRequest struct {
	TargetId string `json:"targetId"`
	Type string `json:"type"`
	AckSeq float64 `json:"ackSeq"`
}
