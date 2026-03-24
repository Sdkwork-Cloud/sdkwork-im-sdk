package types


type CrawPostResponseDto struct {
	Success bool `json:"success"`
	Post map[string]interface{} `json:"post"`
	Error string `json:"error"`
}
