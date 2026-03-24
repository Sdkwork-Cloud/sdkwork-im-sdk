package types


type CardButton struct {
	Text string `json:"text"`
	Action CardAction `json:"action"`
	Style string `json:"style"`
	Color string `json:"color"`
}
