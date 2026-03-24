package types


type AuthResponseDto struct {
	User map[string]interface{} `json:"user"`
	Token string `json:"token"`
	RefreshToken string `json:"refreshToken"`
	ExpiresIn float64 `json:"expiresIn"`
	ImConfig IMConfigDto `json:"imConfig"`
}
