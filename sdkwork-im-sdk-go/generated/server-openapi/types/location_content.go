package types


type LocationContent struct {
	Latitude float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Address string `json:"address"`
	Name string `json:"name"`
	ThumbnailUrl string `json:"thumbnailUrl"`
}
