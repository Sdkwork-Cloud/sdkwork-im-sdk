package types


type TimelineMediaItemDto struct {
	Type string `json:"type"`
	Url string `json:"url"`
	Width float64 `json:"width"`
	Height float64 `json:"height"`
	Duration float64 `json:"duration"`
	CoverUrl string `json:"coverUrl"`
	Extra map[string]interface{} `json:"extra"`
}
