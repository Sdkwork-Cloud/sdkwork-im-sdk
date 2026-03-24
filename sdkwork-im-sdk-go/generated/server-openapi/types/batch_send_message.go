package types


type BatchSendMessage struct {
	Messages []SendMessage `json:"messages"`
}
