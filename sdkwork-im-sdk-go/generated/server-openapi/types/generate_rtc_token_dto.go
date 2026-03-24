package types


type GenerateRtcTokenDto struct {
	RoomId string `json:"roomId"`
	UserId string `json:"userId"`
	ChannelId string `json:"channelId"`
	Provider string `json:"provider"`
	Role string `json:"role"`
	ExpireSeconds float64 `json:"expireSeconds"`
}
