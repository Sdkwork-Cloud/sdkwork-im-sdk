package types


type Model3DMediaResource struct {
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
	VertexCount float64 `json:"vertexCount"`
	FaceCount float64 `json:"faceCount"`
	MaterialCount float64 `json:"materialCount"`
	BoneCount float64 `json:"boneCount"`
	AnimationCount float64 `json:"animationCount"`
	BoundingBox map[string]interface{} `json:"boundingBox"`
	PreviewUrl string `json:"previewUrl"`
	TextureUrls []string `json:"textureUrls"`
}
