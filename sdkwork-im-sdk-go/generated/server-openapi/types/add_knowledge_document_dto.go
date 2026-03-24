package types


type AddKnowledgeDocumentDto struct {
	Title string `json:"title"`
	Content string `json:"content"`
	Description string `json:"description"`
	SourcePath string `json:"sourcePath"`
	SourceType string `json:"sourceType"`
	Metadata map[string]interface{} `json:"metadata"`
}
