package types


type AckConversationSeqBatchRequest struct {
	Items []AckConversationSeqItemRequest `json:"items"`
	DeviceId string `json:"deviceId"`
}
