package types


type CardAction struct {
	Type string `json:"type"`
	Url string `json:"url"`
	Params map[string]interface{} `json:"params"`
	AppId string `json:"appId"`
	AppPath string `json:"appPath"`
}
