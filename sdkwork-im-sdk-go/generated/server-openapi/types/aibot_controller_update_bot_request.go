package types


type AibotControllerUpdateBotRequest struct {
	Name string `json:"name"`
	Description string `json:"description"`
	Type string `json:"type"`
	Config map[string]interface{} `json:"config"`
	IsActive bool `json:"isActive"`
}
