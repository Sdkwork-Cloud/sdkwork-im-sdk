package types


type RtcProviderOperationErrorDto struct {
	StatusCode float64 `json:"statusCode"`
	Message string `json:"message"`
	Provider string `json:"provider"`
	Operation string `json:"operation"`
	ProviderStatusCode float64 `json:"providerStatusCode"`
	ProviderErrorCode string `json:"providerErrorCode"`
	Retryable bool `json:"retryable"`
	ProviderMessage string `json:"providerMessage"`
}
