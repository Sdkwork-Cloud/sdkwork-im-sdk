package types


type CreateRtcRoomDto struct {
	Type string `json:"type"`
	Participants []string `json:"participants"`
	Name string `json:"name"`
	ChannelId string `json:"channelId"`
	Provider string `json:"provider"`
	AiMetadata map[string]interface{} `json:"aiMetadata"`
}
