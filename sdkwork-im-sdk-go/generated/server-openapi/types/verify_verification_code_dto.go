package types


type VerifyVerificationCodeDto struct {
	Email string `json:"email"`
	Phone string `json:"phone"`
	Code string `json:"code"`
	Type string `json:"type"`
}
