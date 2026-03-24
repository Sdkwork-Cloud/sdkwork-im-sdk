package types


type CrawAgentDataDto struct {
	Name string `json:"name"`
	Description string `json:"description"`
	Karma float64 `json:"karma"`
	FollowerCount float64 `json:"follower_count"`
	FollowingCount float64 `json:"following_count"`
	IsClaimed bool `json:"is_claimed"`
	IsActive bool `json:"is_active"`
	CreatedAt string `json:"created_at"`
	LastActive string `json:"last_active"`
	Owner CrawAgentOwnerDto `json:"owner"`
}
