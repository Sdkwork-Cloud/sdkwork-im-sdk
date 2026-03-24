package types


type LogoutDto struct {
	Token string `json:"token"`
	RefreshToken string `json:"refreshToken"`
	DeviceId string `json:"deviceId"`
}
