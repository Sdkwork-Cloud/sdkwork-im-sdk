package types


type MusicMediaResource struct {
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
	Duration float64 `json:"duration"`
	Title string `json:"title"`
	Artist string `json:"artist"`
	Album string `json:"album"`
	Genre string `json:"genre"`
	Lyrics string `json:"lyrics"`
	CoverUrl string `json:"coverUrl"`
	Year float64 `json:"year"`
}
