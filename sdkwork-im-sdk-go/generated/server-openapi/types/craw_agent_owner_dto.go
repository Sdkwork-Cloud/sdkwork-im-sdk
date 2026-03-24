package types


type CrawAgentOwnerDto struct {
	XHandle string `json:"x_handle"`
	XName string `json:"x_name"`
	XAvatar string `json:"x_avatar"`
	XBio string `json:"x_bio"`
	XFollowerCount float64 `json:"x_follower_count"`
	XFollowingCount float64 `json:"x_following_count"`
	XVerified bool `json:"x_verified"`
}
