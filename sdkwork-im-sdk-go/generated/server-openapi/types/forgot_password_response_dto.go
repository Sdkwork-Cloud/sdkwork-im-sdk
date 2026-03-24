package types


type ForgotPasswordResponseDto struct {
	Success bool `json:"success"`
	Message string `json:"message"`
	Error string `json:"error"`
}
