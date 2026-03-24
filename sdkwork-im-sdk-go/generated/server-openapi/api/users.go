package api

import (
    "fmt"
    sdktypes "github.com/sdkwork/backend-sdk/types"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type UsersApi struct {
    client *sdkhttp.Client
}

func NewUsersApi(client *sdkhttp.Client) *UsersApi {
    return &UsersApi{client: client}
}

// 获取当前用户信息
func (a *UsersApi) UserControllerGetCurrent() (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/users/me"), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取用户详情
func (a *UsersApi) UserControllerGetById(id string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/users/%s", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 更新用户资料
func (a *UsersApi) UserControllerUpdate(id string, body sdktypes.UpdateProfileDto) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/users/%s", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 搜索用户
func (a *UsersApi) UserControllerSearch(query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath("/users"), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}
