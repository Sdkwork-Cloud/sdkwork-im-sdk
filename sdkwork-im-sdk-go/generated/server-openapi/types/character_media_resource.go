package types


type CharacterMediaResource struct {
	Id string `json:"id"`
	Uuid string `json:"uuid"`
	Url string `json:"url"`
	Bytes []string `json:"bytes"`
	LocalFile map[string]interface{} `json:"localFile"`
	Base64 string `json:"base64"`
	Type string `json:"type"`
	MimeType string `json:"mimeType"`
	Size float64 `json:"size"`
	Name string `json:"name"`
	Extension string `json:"extension"`
	Tags map[string]interface{} `json:"tags"`
	Metadata map[string]interface{} `json:"metadata"`
	Prompt string `json:"prompt"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
	CreatorId string `json:"creatorId"`
	Description string `json:"description"`
	CharacterType string `json:"characterType"`
	Gender string `json:"gender"`
	AgeGroup string `json:"ageGroup"`
	AvatarImage ImageMediaResource `json:"avatarImage"`
	AvatarVideo VideoMediaResource `json:"avatarVideo"`
	SpeakerId string `json:"speakerId"`
	AppearanceParams map[string]interface{} `json:"appearanceParams"`
	AnimationParams map[string]interface{} `json:"animationParams"`
	Actions []string `json:"actions"`
	Expressions []string `json:"expressions"`
	VoiceFeatures map[string]interface{} `json:"voiceFeatures"`
}
