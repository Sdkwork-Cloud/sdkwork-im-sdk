package types


type ConversationControllerGetSyncStatesRequest struct {
	Conversations []map[string]interface{} `json:"conversations"`
	DeviceId string `json:"deviceId"`
}
