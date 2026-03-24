package types


type SendFriendRequestDto struct {
	ToUserId string `json:"toUserId"`
	Message string `json:"message"`
}
