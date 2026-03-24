package types


type BotOpenStatsDto struct {
	TotalMessagesSent float64 `json:"totalMessagesSent"`
	TotalMessagesReceived float64 `json:"totalMessagesReceived"`
	TotalUsersInteracted float64 `json:"totalUsersInteracted"`
	TotalGroupsJoined float64 `json:"totalGroupsJoined"`
	TotalCommandsExecuted float64 `json:"totalCommandsExecuted"`
	TotalInteractions float64 `json:"totalInteractions"`
	LastActivityAt string `json:"lastActivityAt"`
}
