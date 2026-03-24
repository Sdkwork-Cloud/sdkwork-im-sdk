package types


type CreateTimelinePostDto struct {
	Text string `json:"text"`
	Media []TimelineMediaItemDto `json:"media"`
	Visibility string `json:"visibility"`
	CustomAudienceIds []string `json:"customAudienceIds"`
	Extra map[string]interface{} `json:"extra"`
}
