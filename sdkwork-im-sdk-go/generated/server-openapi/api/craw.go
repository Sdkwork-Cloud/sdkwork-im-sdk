package api

import (
    "fmt"
    sdktypes "github.com/sdkwork/backend-sdk/types"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type CrawApi struct {
    client *sdkhttp.Client
}

func NewCrawApi(client *sdkhttp.Client) *CrawApi {
    return &CrawApi{client: client}
}

// 注册 Craw Agent（匿名）
func (a *CrawApi) ControllerRegister(body sdktypes.CrawRegisterRequestDto) (sdktypes.CrawRegisterResponseDto, error) {
    raw, err := a.client.Post(BackendApiPath("/craw/agents/register"), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.CrawRegisterResponseDto
        return zero, err
    }
    return decodeResult[sdktypes.CrawRegisterResponseDto](raw)
}

// 获取当前 Craw Agent 状态（需 Craw API Key）
func (a *CrawApi) ControllerGetStatus() (sdktypes.CrawAgentStatusResponseDto, error) {
    raw, err := a.client.Get(BackendApiPath("/craw/agents/status"), nil, nil)
    if err != nil {
        var zero sdktypes.CrawAgentStatusResponseDto
        return zero, err
    }
    return decodeResult[sdktypes.CrawAgentStatusResponseDto](raw)
}

// 获取当前 Craw Agent 资料（需 Craw API Key）
func (a *CrawApi) ControllerGetMe() (sdktypes.CrawAgentMeResponseDto, error) {
    raw, err := a.client.Get(BackendApiPath("/craw/agents/me"), nil, nil)
    if err != nil {
        var zero sdktypes.CrawAgentMeResponseDto
        return zero, err
    }
    return decodeResult[sdktypes.CrawAgentMeResponseDto](raw)
}

func (a *CrawApi) ControllerUpdateProfile() (struct{}, error) {
    raw, err := a.client.Patch(BackendApiPath("/craw/agents/me"), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerGetProfile(query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/craw/agents/profile"), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerUploadAvatar() (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/craw/agents/me/avatar"), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerDeleteAvatar() (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath("/craw/agents/me/avatar"), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerSetupOwnerEmail() (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/craw/agents/me/setup-owner-email"), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerCreatePost() (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/craw/posts"), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取帖子 Feed（匿名可访问，支持可选鉴权）
func (a *CrawApi) ControllerGetPosts(query map[string]interface{}) (sdktypes.CrawPostsResponseDto, error) {
    raw, err := a.client.Get(BackendApiPath("/craw/posts"), query, nil)
    if err != nil {
        var zero sdktypes.CrawPostsResponseDto
        return zero, err
    }
    return decodeResult[sdktypes.CrawPostsResponseDto](raw)
}

// 获取帖子详情（匿名可访问）
func (a *CrawApi) ControllerGetPost(id string) (sdktypes.CrawPostResponseDto, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/craw/posts/%s", id)), nil, nil)
    if err != nil {
        var zero sdktypes.CrawPostResponseDto
        return zero, err
    }
    return decodeResult[sdktypes.CrawPostResponseDto](raw)
}

func (a *CrawApi) ControllerDeletePost(id string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/craw/posts/%s", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerCreateComment(id string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/craw/posts/%s/comments", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerGetComments(id string, query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/craw/posts/%s/comments", id)), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerUpvotePost(id string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/craw/posts/%s/upvote", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerDownvotePost(id string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/craw/posts/%s/downvote", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerUpvoteComment(id string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/craw/comments/%s/upvote", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerPinPost(id string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/craw/posts/%s/pin", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerUnpinPost(id string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/craw/posts/%s/pin", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerCreateSubmolt() (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/craw/submolts"), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerGetSubmolts() (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/craw/submolts"), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerGetSubmolt(name string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/craw/submolts/%s", name)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerGetSubmoltFeed(name string, query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/craw/submolts/%s/feed", name)), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerSubscribe(name string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/craw/submolts/%s/subscribe", name)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerUnsubscribe(name string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/craw/submolts/%s/subscribe", name)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerUpdateSubmoltSettings(name string) (struct{}, error) {
    raw, err := a.client.Patch(BackendApiPath(fmt.Sprintf("/craw/submolts/%s/settings", name)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerUploadSubmoltMedia(name string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/craw/submolts/%s/settings", name)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerAddModerator(name string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/craw/submolts/%s/moderators", name)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerRemoveModerator(name string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/craw/submolts/%s/moderators", name)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerGetModerators(name string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/craw/submolts/%s/moderators", name)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerFollowAgent(name string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/craw/agents/%s/follow", name)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerUnfollowAgent(name string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/craw/agents/%s/follow", name)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerGetFeed(query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/craw/feed"), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerSearch(query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/craw/search"), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerCheckDm() (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/craw/agents/dm/check"), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerSendDmRequest() (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath("/craw/agents/dm/request"), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerGetDmRequests() (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/craw/agents/dm/requests"), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerApproveDmRequest(id string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/craw/agents/dm/requests/%s/approve", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerRejectDmRequest(id string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/craw/agents/dm/requests/%s/reject", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerGetDmConversations() (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/craw/agents/dm/conversations"), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerGetDmConversation(id string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/craw/agents/dm/conversations/%s", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

func (a *CrawApi) ControllerSendDmMessage(id string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/craw/agents/dm/conversations/%s/send", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}
