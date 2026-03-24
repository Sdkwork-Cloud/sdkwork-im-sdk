package api

import (
    "fmt"
    sdktypes "github.com/sdkwork/backend-sdk/types"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type ContactsApi struct {
    client *sdkhttp.Client
}

func NewContactsApi(client *sdkhttp.Client) *ContactsApi {
    return &ContactsApi{client: client}
}

// 创建联系人
func (a *ContactsApi) ContactControllerCreate(body sdktypes.ContactControllerCreateRequest) (sdktypes.Contact, error) {
    raw, err := a.client.Post(BackendApiPath("/contacts"), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.Contact
        return zero, err
    }
    return decodeResult[sdktypes.Contact](raw)
}

// 获取用户的联系人列表
func (a *ContactsApi) ContactControllerGetByUserId(query map[string]interface{}) (sdktypes.ContactControllerGetByUserIdResponse, error) {
    raw, err := a.client.Get(BackendApiPath("/contacts"), query, nil)
    if err != nil {
        var zero sdktypes.ContactControllerGetByUserIdResponse
        return zero, err
    }
    return decodeResult[sdktypes.ContactControllerGetByUserIdResponse](raw)
}

// 获取联系人详情
func (a *ContactsApi) ContactControllerGetById(id string) (sdktypes.Contact, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/contacts/%s", id)), nil, nil)
    if err != nil {
        var zero sdktypes.Contact
        return zero, err
    }
    return decodeResult[sdktypes.Contact](raw)
}

// 更新联系人
func (a *ContactsApi) ContactControllerUpdate(id string, body sdktypes.ContactControllerUpdateRequest) (sdktypes.Contact, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/contacts/%s", id)), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.Contact
        return zero, err
    }
    return decodeResult[sdktypes.Contact](raw)
}

// 删除联系人
func (a *ContactsApi) ContactControllerDelete(id string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/contacts/%s", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 批量删除联系人
func (a *ContactsApi) ContactControllerBatchDelete() (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath("/contacts/batch"), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 设置/取消收藏
func (a *ContactsApi) ContactControllerSetFavorite(id string, body sdktypes.ContactControllerSetFavoriteRequest) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/contacts/%s/favorite", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 设置备注
func (a *ContactsApi) ContactControllerSetRemark(id string, body sdktypes.ContactControllerSetRemarkRequest) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/contacts/%s/remark", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 添加标签
func (a *ContactsApi) ContactControllerAddTag(id string, body sdktypes.ContactControllerAddTagRequest) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/contacts/%s/tags", id)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 移除标签
func (a *ContactsApi) ContactControllerRemoveTag(id string, tag string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/contacts/%s/tags/%s", id, tag)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 搜索联系人
func (a *ContactsApi) ContactControllerSearch(userId string, query map[string]interface{}) (sdktypes.ContactControllerSearchResponse, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/contacts/search/%s", userId)), query, nil)
    if err != nil {
        var zero sdktypes.ContactControllerSearchResponse
        return zero, err
    }
    return decodeResult[sdktypes.ContactControllerSearchResponse](raw)
}

// 获取联系人统计
func (a *ContactsApi) ContactControllerGetStats(userId string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/contacts/stats/%s", userId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}
