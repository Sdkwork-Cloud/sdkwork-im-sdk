package types


type AgentConfig struct {
	Model string `json:"model"`
	Temperature float64 `json:"temperature"`
	MaxTokens float64 `json:"maxTokens"`
	SystemPrompt string `json:"systemPrompt"`
	WelcomeMessage string `json:"welcomeMessage"`
	Tools []string `json:"tools"`
	Skills []string `json:"skills"`
	Llm map[string]interface{} `json:"llm"`
}
