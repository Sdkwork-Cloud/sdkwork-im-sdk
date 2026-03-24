package types


type CardMediaResource struct {
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
	CardType string `json:"cardType"`
	Title string `json:"title"`
	ThumbnailUrl string `json:"thumbnailUrl"`
	SourceName string `json:"sourceName"`
	SourceIcon string `json:"sourceIcon"`
	TargetUrl string `json:"targetUrl"`
	AppId string `json:"appId"`
	AppPath string `json:"appPath"`
	AppOriginalId string `json:"appOriginalId"`
	AppVersion string `json:"appVersion"`
	PackageName string `json:"packageName"`
	AppDownloadUrl string `json:"appDownloadUrl"`
	MainAction CardAction `json:"mainAction"`
	Buttons []CardButton `json:"buttons"`
	ExtraData map[string]interface{} `json:"extraData"`
	Tag string `json:"tag"`
	Status string `json:"status"`
	ExpireTime string `json:"expireTime"`
	ShowSource bool `json:"showSource"`
}
