package types


type LoginDto struct {
	Username string `json:"username"`
	Password string `json:"password"`
	DeviceId string `json:"deviceId"`
}
