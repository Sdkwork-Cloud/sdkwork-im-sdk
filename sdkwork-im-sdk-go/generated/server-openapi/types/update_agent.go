package types


type UpdateAgent struct {
	Name string `json:"name"`
	Description string `json:"description"`
	Avatar string `json:"avatar"`
	Type string `json:"type"`
	Config AgentConfig `json:"config"`
	IsPublic bool `json:"isPublic"`
	Status string `json:"status"`
}
