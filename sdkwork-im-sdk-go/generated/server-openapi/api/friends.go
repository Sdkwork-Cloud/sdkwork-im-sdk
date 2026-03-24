package api

import (
    "fmt"
    sdktypes "github.com/sdkwork/backend-sdk/types"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type FriendsApi struct {
    client *sdkhttp.Client
}

func NewFriendsApi(client *sdkhttp.Client) *FriendsApi {
    return &FriendsApi{client: client}
}

// Send friend request
func (a *FriendsApi) FriendControllerSendRequest(body sdktypes.SendFriendRequestDto) (sdktypes.FriendControllerSendRequestResponse, error) {
    raw, err := a.client.Post(BackendApiPath("/friends/request"), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.FriendControllerSendRequestResponse
        return zero, err
    }
    return decodeResult[sdktypes.FriendControllerSendRequestResponse](raw)
}

// Accept friend request
func (a *FriendsApi) FriendControllerAcceptRequest(id string) (sdktypes.FriendControllerAcceptRequestResponse, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/friends/request/%s/accept", id)), nil, nil, nil, "")
    if err != nil {
        var zero sdktypes.FriendControllerAcceptRequestResponse
        return zero, err
    }
    return decodeResult[sdktypes.FriendControllerAcceptRequestResponse](raw)
}

// Reject friend request
func (a *FriendsApi) FriendControllerRejectRequest(id string) (sdktypes.FriendControllerRejectRequestResponse, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/friends/request/%s/reject", id)), nil, nil, nil, "")
    if err != nil {
        var zero sdktypes.FriendControllerRejectRequestResponse
        return zero, err
    }
    return decodeResult[sdktypes.FriendControllerRejectRequestResponse](raw)
}

// Cancel friend request
func (a *FriendsApi) FriendControllerCancelRequest(id string) (sdktypes.FriendControllerCancelRequestResponse, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/friends/request/%s", id)), nil, nil)
    if err != nil {
        var zero sdktypes.FriendControllerCancelRequestResponse
        return zero, err
    }
    return decodeResult[sdktypes.FriendControllerCancelRequestResponse](raw)
}

// Remove friend
func (a *FriendsApi) FriendControllerRemove(friendId string) (sdktypes.FriendControllerRemoveResponse, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/friends/%s", friendId)), nil, nil)
    if err != nil {
        var zero sdktypes.FriendControllerRemoveResponse
        return zero, err
    }
    return decodeResult[sdktypes.FriendControllerRemoveResponse](raw)
}

// Get friend requests
func (a *FriendsApi) FriendControllerGetRequests(query map[string]interface{}) (sdktypes.FriendControllerGetRequestsResponse, error) {
    raw, err := a.client.Get(BackendApiPath("/friends/requests"), query, nil)
    if err != nil {
        var zero sdktypes.FriendControllerGetRequestsResponse
        return zero, err
    }
    return decodeResult[sdktypes.FriendControllerGetRequestsResponse](raw)
}

// Get sent friend requests
func (a *FriendsApi) FriendControllerGetSentRequests() (sdktypes.FriendControllerGetSentRequestsResponse, error) {
    raw, err := a.client.Get(BackendApiPath("/friends/requests/sent"), nil, nil)
    if err != nil {
        var zero sdktypes.FriendControllerGetSentRequestsResponse
        return zero, err
    }
    return decodeResult[sdktypes.FriendControllerGetSentRequestsResponse](raw)
}

// Get friends list
func (a *FriendsApi) FriendControllerGet() (sdktypes.FriendControllerGetResponse, error) {
    raw, err := a.client.Get(BackendApiPath("/friends"), nil, nil)
    if err != nil {
        var zero sdktypes.FriendControllerGetResponse
        return zero, err
    }
    return decodeResult[sdktypes.FriendControllerGetResponse](raw)
}

// Check friendship status
func (a *FriendsApi) FriendControllerCheckFriendship(friendId string) (sdktypes.FriendControllerCheckFriendshipResponse, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/friends/%s/check", friendId)), nil, nil)
    if err != nil {
        var zero sdktypes.FriendControllerCheckFriendshipResponse
        return zero, err
    }
    return decodeResult[sdktypes.FriendControllerCheckFriendshipResponse](raw)
}

// Block friend
func (a *FriendsApi) FriendControllerBlock(friendId string) (sdktypes.FriendControllerBlockResponse, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/friends/%s/block", friendId)), nil, nil, nil, "")
    if err != nil {
        var zero sdktypes.FriendControllerBlockResponse
        return zero, err
    }
    return decodeResult[sdktypes.FriendControllerBlockResponse](raw)
}

// Unblock friend
func (a *FriendsApi) FriendControllerUnblock(friendId string) (sdktypes.FriendControllerUnblockResponse, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/friends/%s/unblock", friendId)), nil, nil, nil, "")
    if err != nil {
        var zero sdktypes.FriendControllerUnblockResponse
        return zero, err
    }
    return decodeResult[sdktypes.FriendControllerUnblockResponse](raw)
}

// Check if blocked
func (a *FriendsApi) FriendControllerCheckBlocked(friendId string) (sdktypes.FriendControllerCheckBlockedResponse, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/friends/%s/blocked", friendId)), nil, nil)
    if err != nil {
        var zero sdktypes.FriendControllerCheckBlockedResponse
        return zero, err
    }
    return decodeResult[sdktypes.FriendControllerCheckBlockedResponse](raw)
}
