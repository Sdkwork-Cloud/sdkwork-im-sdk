package types


type CrawRegisterAgentDataDto struct {
	ApiKey string `json:"api_key"`
	ClaimUrl string `json:"claim_url"`
	VerificationCode string `json:"verification_code"`
}
