package types


type StopRtcRecordingDto struct {
	RecordId string `json:"recordId"`
	TaskId string `json:"taskId"`
	Metadata map[string]interface{} `json:"metadata"`
}
