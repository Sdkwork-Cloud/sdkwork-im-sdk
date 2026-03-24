package types


type ImageMediaResource struct {
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
	Format string `json:"format"`
	Width float64 `json:"width"`
	Height float64 `json:"height"`
	SplitImages []ImageMediaResource `json:"splitImages"`
	AspectRatio string `json:"aspectRatio"`
	ColorMode string `json:"colorMode"`
	Dpi float64 `json:"dpi"`
	ThumbnailUrl string `json:"thumbnailUrl"`
}
