package types


type CrawPostsResponseDto struct {
	Success bool `json:"success"`
	Posts []map[string]interface{} `json:"posts"`
	Error string `json:"error"`
}
