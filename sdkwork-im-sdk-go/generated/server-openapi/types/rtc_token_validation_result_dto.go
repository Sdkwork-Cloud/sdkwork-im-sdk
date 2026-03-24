package types


type RtcTokenValidationResultDto struct {
	Valid bool `json:"valid"`
	RoomId string `json:"roomId"`
	UserId string `json:"userId"`
	Provider string `json:"provider"`
	ChannelId string `json:"channelId"`
	Role string `json:"role"`
	ExpiresAt string `json:"expiresAt"`
}
