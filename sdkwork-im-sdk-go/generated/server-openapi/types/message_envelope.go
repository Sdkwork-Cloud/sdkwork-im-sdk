package types


type MessageEnvelope struct {
	Type string `json:"type"`
	Text TextMediaResource `json:"text"`
	Image ImageMediaResource `json:"image"`
	Audio AudioMediaResource `json:"audio"`
	Video VideoMediaResource `json:"video"`
	File FileMediaResource `json:"file"`
	Location LocationMediaResource `json:"location"`
	Card CardMediaResource `json:"card"`
	System SystemContent `json:"system"`
	Custom CustomContent `json:"custom"`
	Music MusicMediaResource `json:"music"`
	Document DocumentMediaResource `json:"document"`
	Code CodeMediaResource `json:"code"`
	Ppt PptMediaResource `json:"ppt"`
	Character CharacterMediaResource `json:"character"`
	Model3d Model3DMediaResource `json:"model3d"`
}
