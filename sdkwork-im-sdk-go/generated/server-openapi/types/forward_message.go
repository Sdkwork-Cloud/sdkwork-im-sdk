package types


type ForwardMessage struct {
	MessageId string `json:"messageId"`
	ToUserIds []string `json:"toUserIds"`
	ToGroupIds []string `json:"toGroupIds"`
}
