package types


type ContactControllerCreateRequest struct {
	UserId string `json:"userId"`
	ContactId string `json:"contactId"`
	Type string `json:"type"`
	Name string `json:"name"`
	Remark string `json:"remark"`
	Tags []string `json:"tags"`
}
