package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class GroupsApi {
    private final HttpClient client;
    
    public GroupsApi(HttpClient client) {
        this.client = client;
    }

    /** 创建群组 */
    public Group groupControllerCreate(String body) throws Exception {
        return (Group) client.post(ApiPaths.backendPath("/groups"), body);
    }

    /** 获取群组详情 */
    public Group groupControllerGetById(String id) throws Exception {
        return (Group) client.get(ApiPaths.backendPath("/groups/" + id + ""));
    }

    /** 更新群组信息 */
    public Group groupControllerUpdate(String id, String body) throws Exception {
        return (Group) client.put(ApiPaths.backendPath("/groups/" + id + ""), body);
    }

    /** 删除群组 */
    public Void groupControllerDelete(String id) throws Exception {
        client.delete(ApiPaths.backendPath("/groups/" + id + ""));
        return null;
    }

    /** 添加群成员 */
    public GroupMember groupControllerAddMember(String groupId, GroupControllerAddMemberRequest body) throws Exception {
        return (GroupMember) client.post(ApiPaths.backendPath("/groups/" + groupId + "/members"), body);
    }

    /** 获取群成员列表 */
    public GroupControllerGetMembersResponse groupControllerGetMembers(String groupId) throws Exception {
        return (GroupControllerGetMembersResponse) client.get(ApiPaths.backendPath("/groups/" + groupId + "/members"));
    }

    /** 移除群成员 */
    public Void groupControllerRemoveMember(String groupId, String userId) throws Exception {
        client.delete(ApiPaths.backendPath("/groups/" + groupId + "/members/" + userId + ""));
        return null;
    }

    /** 更新群成员角色 */
    public Void groupControllerUpdateMemberRole(String groupId, String userId, GroupControllerUpdateMemberRoleRequest body) throws Exception {
        client.put(ApiPaths.backendPath("/groups/" + groupId + "/members/" + userId + "/role"), body);
        return null;
    }

    /** 获取用户所在群组列表 */
    public GroupControllerGetByUserIdResponse groupControllerGetByUserId(String userId) throws Exception {
        return (GroupControllerGetByUserIdResponse) client.get(ApiPaths.backendPath("/groups/user/" + userId + ""));
    }

    /** 发送群组邀请 */
    public GroupInvitation groupControllerSendInvitation(GroupControllerSendInvitationRequest body) throws Exception {
        return (GroupInvitation) client.post(ApiPaths.backendPath("/groups/invitation"), body);
    }

    /** 接受群组邀请 */
    public Void groupControllerAcceptInvitation(String id) throws Exception {
        client.post(ApiPaths.backendPath("/groups/invitation/" + id + "/accept"), null);
        return null;
    }

    /** 拒绝群组邀请 */
    public Void groupControllerRejectInvitation(String id) throws Exception {
        client.post(ApiPaths.backendPath("/groups/invitation/" + id + "/reject"), null);
        return null;
    }

    /** 取消群组邀请 */
    public Void groupControllerCancelInvitation(String id) throws Exception {
        client.delete(ApiPaths.backendPath("/groups/invitation/" + id + ""));
        return null;
    }

    /** 添加用户到群黑名单 */
    public Void groupControllerAddToBlacklist(String groupId, GroupControllerAddToBlacklistRequest body) throws Exception {
        client.post(ApiPaths.backendPath("/groups/" + groupId + "/blacklist"), body);
        return null;
    }

    /** 获取群黑名单列表 */
    public Void groupControllerGetBlacklist(String groupId) throws Exception {
        client.get(ApiPaths.backendPath("/groups/" + groupId + "/blacklist"));
        return null;
    }

    /** 从群黑名单移除用户 */
    public Void groupControllerRemoveFromBlacklist(String groupId, String userId) throws Exception {
        client.delete(ApiPaths.backendPath("/groups/" + groupId + "/blacklist/" + userId + ""));
        return null;
    }

    /** 添加用户到群白名单 */
    public Void groupControllerAddToWhitelist(String groupId, GroupControllerAddToWhitelistRequest body) throws Exception {
        client.post(ApiPaths.backendPath("/groups/" + groupId + "/whitelist"), body);
        return null;
    }

    /** 获取群白名单列表 */
    public Void groupControllerGetWhitelist(String groupId) throws Exception {
        client.get(ApiPaths.backendPath("/groups/" + groupId + "/whitelist"));
        return null;
    }

    /** 从群白名单移除用户 */
    public Void groupControllerRemoveFromWhitelist(String groupId, String userId) throws Exception {
        client.delete(ApiPaths.backendPath("/groups/" + groupId + "/whitelist/" + userId + ""));
        return null;
    }

    /** 踢出群成员并加入黑名单 */
    public Void groupControllerKickMember(String groupId, String userId) throws Exception {
        client.post(ApiPaths.backendPath("/groups/" + groupId + "/kick/" + userId + ""), null);
        return null;
    }

    /** 退出群组 */
    public Void groupControllerQuit(String groupId, GroupControllerQuitRequest body) throws Exception {
        client.post(ApiPaths.backendPath("/groups/" + groupId + "/quit"), body);
        return null;
    }

    /** 更新群公告 */
    public Group groupControllerUpdateAnnouncement(String groupId, GroupControllerUpdateAnnouncementRequest body) throws Exception {
        return (Group) client.put(ApiPaths.backendPath("/groups/" + groupId + "/announcement"), body);
    }

    /** 全员禁言设置 */
    public Group groupControllerSetMuteAll(String groupId, GroupControllerSetMuteAllRequest body) throws Exception {
        return (Group) client.put(ApiPaths.backendPath("/groups/" + groupId + "/mute-all"), body);
    }

    /** 禁言群成员 */
    public Void groupControllerMuteMember(String groupId, String userId, GroupControllerMuteMemberRequest body) throws Exception {
        client.put(ApiPaths.backendPath("/groups/" + groupId + "/members/" + userId + "/mute"), body);
        return null;
    }

    /** 转让群主 */
    public Group groupControllerTransfer(String groupId, GroupControllerTransferRequest body) throws Exception {
        return (Group) client.post(ApiPaths.backendPath("/groups/" + groupId + "/transfer"), body);
    }
}
