package types


type TextContent struct {
	Text string `json:"text"`
	Mentions []string `json:"mentions"`
}
