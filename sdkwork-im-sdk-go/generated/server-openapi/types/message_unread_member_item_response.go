package types


type MessageUnreadMemberItemResponse struct {
	UserId string `json:"userId"`
	Role string `json:"role"`
	ReceiptStatus string `json:"receiptStatus"`
	DeliveredAt string `json:"deliveredAt"`
	ReadAt string `json:"readAt"`
}
