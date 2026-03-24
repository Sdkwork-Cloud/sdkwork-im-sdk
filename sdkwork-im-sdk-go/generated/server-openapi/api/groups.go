package api

import (
    "fmt"
    sdktypes "github.com/sdkwork/backend-sdk/types"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type GroupsApi struct {
    client *sdkhttp.Client
}

func NewGroupsApi(client *sdkhttp.Client) *GroupsApi {
    return &GroupsApi{client: client}
}

// 创建群组
func (a *GroupsApi) GroupControllerCreate(body string) (sdktypes.Group, error) {
    raw, err := a.client.Post(BackendApiPath("/groups"), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.Group
        return zero, err
    }
    return decodeResult[sdktypes.Group](raw)
}

// 获取群组详情
func (a *GroupsApi) GroupControllerGetById(id string) (sdktypes.Group, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/groups/%s", id)), nil, nil)
    if err != nil {
        var zero sdktypes.Group
        return zero, err
    }
    return decodeResult[sdktypes.Group](raw)
}

// 更新群组信息
func (a *GroupsApi) GroupControllerUpdate(id string, body string) (sdktypes.Group, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/groups/%s", id)), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.Group
        return zero, err
    }
    return decodeResult[sdktypes.Group](raw)
}

// 删除群组
func (a *GroupsApi) GroupControllerDelete(id string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/groups/%s", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 添加群成员
func (a *GroupsApi) GroupControllerAddMember(groupId string, body sdktypes.GroupControllerAddMemberRequest) (sdktypes.GroupMember, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/groups/%s/members", groupId)), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.GroupMember
        return zero, err
    }
    return decodeResult[sdktypes.GroupMember](raw)
}

// 获取群成员列表
func (a *GroupsApi) GroupControllerGetMembers(groupId string) (sdktypes.GroupControllerGetMembersResponse, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/groups/%s/members", groupId)), nil, nil)
    if err != nil {
        var zero sdktypes.GroupControllerGetMembersResponse
        return zero, err
    }
    return decodeResult[sdktypes.GroupControllerGetMembersResponse](raw)
}

// 移除群成员
func (a *GroupsApi) GroupControllerRemoveMember(groupId string, userId string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/groups/%s/members/%s", groupId, userId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 更新群成员角色
func (a *GroupsApi) GroupControllerUpdateMemberRole(groupId string, userId string, body sdktypes.GroupControllerUpdateMemberRoleRequest) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/groups/%s/members/%s/role", groupId, userId)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取用户所在群组列表
func (a *GroupsApi) GroupControllerGetByUserId(userId string) (sdktypes.GroupControllerGetByUserIdResponse, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/groups/user/%s", userId)), nil, nil)
    if err != nil {
        var zero sdktypes.GroupControllerGetByUserIdResponse
        return zero, err
    }
    return decodeResult[sdktypes.GroupControllerGetByUserIdResponse](raw)
}

// 发送群组邀请
func (a *GroupsApi) GroupControllerSendInvitation(body sdktypes.GroupControllerSendInvitationRequest) (sdktypes.GroupInvitation, error) {
    raw, err := a.client.Post(BackendApiPath("/groups/invitation"), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.GroupInvitation
        return zero, err
    }
    return decodeResult[sdktypes.GroupInvitation](raw)
}

// 接受群组邀请
func (a *GroupsApi) GroupControllerAcceptInvitation(id string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/groups/invitation/%s/accept", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 拒绝群组邀请
func (a *GroupsApi) GroupControllerRejectInvitation(id string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/groups/invitation/%s/reject", id)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 取消群组邀请
func (a *GroupsApi) GroupControllerCancelInvitation(id string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/groups/invitation/%s", id)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 添加用户到群黑名单
func (a *GroupsApi) GroupControllerAddToBlacklist(groupId string, body sdktypes.GroupControllerAddToBlacklistRequest) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/groups/%s/blacklist", groupId)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取群黑名单列表
func (a *GroupsApi) GroupControllerGetBlacklist(groupId string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/groups/%s/blacklist", groupId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 从群黑名单移除用户
func (a *GroupsApi) GroupControllerRemoveFromBlacklist(groupId string, userId string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/groups/%s/blacklist/%s", groupId, userId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 添加用户到群白名单
func (a *GroupsApi) GroupControllerAddToWhitelist(groupId string, body sdktypes.GroupControllerAddToWhitelistRequest) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/groups/%s/whitelist", groupId)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 获取群白名单列表
func (a *GroupsApi) GroupControllerGetWhitelist(groupId string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/groups/%s/whitelist", groupId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 从群白名单移除用户
func (a *GroupsApi) GroupControllerRemoveFromWhitelist(groupId string, userId string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/groups/%s/whitelist/%s", groupId, userId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 踢出群成员并加入黑名单
func (a *GroupsApi) GroupControllerKickMember(groupId string, userId string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/groups/%s/kick/%s", groupId, userId)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 退出群组
func (a *GroupsApi) GroupControllerQuit(groupId string, body sdktypes.GroupControllerQuitRequest) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/groups/%s/quit", groupId)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 更新群公告
func (a *GroupsApi) GroupControllerUpdateAnnouncement(groupId string, body sdktypes.GroupControllerUpdateAnnouncementRequest) (sdktypes.Group, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/groups/%s/announcement", groupId)), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.Group
        return zero, err
    }
    return decodeResult[sdktypes.Group](raw)
}

// 全员禁言设置
func (a *GroupsApi) GroupControllerSetMuteAll(groupId string, body sdktypes.GroupControllerSetMuteAllRequest) (sdktypes.Group, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/groups/%s/mute-all", groupId)), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.Group
        return zero, err
    }
    return decodeResult[sdktypes.Group](raw)
}

// 禁言群成员
func (a *GroupsApi) GroupControllerMuteMember(groupId string, userId string, body sdktypes.GroupControllerMuteMemberRequest) (struct{}, error) {
    raw, err := a.client.Put(BackendApiPath(fmt.Sprintf("/groups/%s/members/%s/mute", groupId, userId)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// 转让群主
func (a *GroupsApi) GroupControllerTransfer(groupId string, body sdktypes.GroupControllerTransferRequest) (sdktypes.Group, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/groups/%s/transfer", groupId)), body, nil, nil, "")
    if err != nil {
        var zero sdktypes.Group
        return zero, err
    }
    return decodeResult[sdktypes.Group](raw)
}
