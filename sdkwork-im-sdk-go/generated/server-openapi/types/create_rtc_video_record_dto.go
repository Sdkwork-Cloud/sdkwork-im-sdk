package types


type CreateRtcVideoRecordDto struct {
	RoomId string `json:"roomId"`
	UserId string `json:"userId"`
	FileName string `json:"fileName"`
	FilePath string `json:"filePath"`
	FileType string `json:"fileType"`
	FileSize float64 `json:"fileSize"`
	StartTime string `json:"startTime"`
	EndTime string `json:"endTime"`
	Status string `json:"status"`
	Metadata map[string]interface{} `json:"metadata"`
}
