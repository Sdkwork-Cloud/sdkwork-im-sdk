package api

import (
    "fmt"
    sdktypes "github.com/sdkwork/backend-sdk/types"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type TimelineApi struct {
    client *sdkhttp.Client
}

func NewTimelineApi(client *sdkhttp.Client) *TimelineApi {
    return &TimelineApi{client: client}
}

// Create a timeline post
func (a *TimelineApi) ControllerCreatePost(body sdktypes.CreateTimelinePostDto) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/timeline/posts"), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get timeline feed
func (a *TimelineApi) ControllerGetFeed(query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/timeline/feed"), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get timeline post detail
func (a *TimelineApi) ControllerGetPost(postId string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/timeline/posts/%s", postId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Delete own timeline post
func (a *TimelineApi) ControllerDeletePost(postId string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/timeline/posts/%s", postId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get user timeline posts
func (a *TimelineApi) ControllerGetUserPosts(userId string, query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/timeline/users/%s/posts", userId)), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Like or unlike timeline post
func (a *TimelineApi) ControllerToggleLike(postId string, body sdktypes.ToggleTimelineLikeDto) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/timeline/posts/%s/likes", postId)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}
