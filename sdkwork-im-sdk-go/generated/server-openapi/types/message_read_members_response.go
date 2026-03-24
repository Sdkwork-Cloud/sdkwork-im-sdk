package types


type MessageReadMembersResponse struct {
	MessageId string `json:"messageId"`
	GroupId string `json:"groupId"`
	Total float64 `json:"total"`
	Limit float64 `json:"limit"`
	Offset float64 `json:"offset"`
	NextCursor string `json:"nextCursor"`
	Items []MessageReadMemberItemResponse `json:"items"`
}
