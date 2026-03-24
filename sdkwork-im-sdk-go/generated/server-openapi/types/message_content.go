package types


type MessageContent struct {
	Text TextContent `json:"text"`
	Image ImageMediaResource `json:"image"`
	Video VideoMediaResource `json:"video"`
	Audio AudioMediaResource `json:"audio"`
	Music MusicMediaResource `json:"music"`
	File FileMediaResource `json:"file"`
	Document DocumentMediaResource `json:"document"`
	Code CodeMediaResource `json:"code"`
	Ppt PptMediaResource `json:"ppt"`
	Character CharacterMediaResource `json:"character"`
	Model3d Model3DMediaResource `json:"model3d"`
	Location LocationContent `json:"location"`
	Card CardContent `json:"card"`
	CardResource CardMediaResource `json:"cardResource"`
	System SystemContent `json:"system"`
	Custom CustomContent `json:"custom"`
	Event EventContent `json:"event"`
}
