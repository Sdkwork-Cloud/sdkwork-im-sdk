package types


type GroupControllerAddMemberRequest struct {
	UserId string `json:"userId"`
	Role string `json:"role"`
}
