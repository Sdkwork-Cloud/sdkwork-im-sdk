package types


type StartRtcRecordingDto struct {
	TaskId string `json:"taskId"`
	Metadata map[string]interface{} `json:"metadata"`
}
