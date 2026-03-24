package types


type EventContentTransport struct {
	Type string `json:"type"`
	Name string `json:"name"`
	Data map[string]interface{} `json:"data"`
	Metadata map[string]interface{} `json:"metadata"`
}
