package types


type GroupControllerSendInvitationRequest struct {
	GroupId string `json:"groupId"`
	InviterId string `json:"inviterId"`
	InviteeId string `json:"inviteeId"`
	Message string `json:"message"`
}
