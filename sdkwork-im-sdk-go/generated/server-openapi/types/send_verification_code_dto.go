package types


type SendVerificationCodeDto struct {
	Email string `json:"email"`
	Phone string `json:"phone"`
	Type string `json:"type"`
}
