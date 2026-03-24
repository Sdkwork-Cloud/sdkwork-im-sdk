package types


type AckConversationSeqRequest struct {
	TargetId string `json:"targetId"`
	Type string `json:"type"`
	AckSeq float64 `json:"ackSeq"`
	DeviceId string `json:"deviceId"`
}
