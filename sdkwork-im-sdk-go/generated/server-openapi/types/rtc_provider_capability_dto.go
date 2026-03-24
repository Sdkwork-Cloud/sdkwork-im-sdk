package types


type RtcProviderCapabilityDto struct {
	Provider string `json:"provider"`
	Configured bool `json:"configured"`
	ChannelId string `json:"channelId"`
	SupportsRecording bool `json:"supportsRecording"`
	TokenStrategies []string `json:"tokenStrategies"`
	SupportsControlPlaneDelegate bool `json:"supportsControlPlaneDelegate"`
}
