package types


type AddTool struct {
	Name string `json:"name"`
	Description string `json:"description"`
	Parameters map[string]interface{} `json:"parameters"`
	Config map[string]interface{} `json:"config"`
}
