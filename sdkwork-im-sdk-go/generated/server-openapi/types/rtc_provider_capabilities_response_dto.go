package types


type RtcProviderCapabilitiesResponseDto struct {
	DefaultProvider string `json:"defaultProvider"`
	RecommendedPrimary string `json:"recommendedPrimary"`
	FallbackOrder []string `json:"fallbackOrder"`
	ActiveProviders []string `json:"activeProviders"`
	Providers []RtcProviderCapabilityDto `json:"providers"`
}
