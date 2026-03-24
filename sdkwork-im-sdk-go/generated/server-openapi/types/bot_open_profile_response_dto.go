package types


type BotOpenProfileResponseDto struct {
	Id string `json:"id"`
	Name string `json:"name"`
	Username string `json:"username"`
	AppId string `json:"appId"`
	Description string `json:"description"`
	Avatar string `json:"avatar"`
	Homepage string `json:"homepage"`
	DeveloperName string `json:"developerName"`
	DeveloperEmail string `json:"developerEmail"`
	Intents float64 `json:"intents"`
	Scopes []string `json:"scopes"`
	Status string `json:"status"`
	Stats BotOpenStatsDto `json:"stats"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}
