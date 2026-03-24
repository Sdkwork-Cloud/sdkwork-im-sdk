package types


type ContactControllerUpdateRequest struct {
	Name string `json:"name"`
	Remark string `json:"remark"`
	Tags []string `json:"tags"`
	IsFavorite bool `json:"isFavorite"`
	Status string `json:"status"`
}
