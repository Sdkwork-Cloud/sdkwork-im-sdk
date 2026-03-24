package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class GroupsApi(private val client: HttpClient) {

    /** 创建群组 */
    suspend fun groupControllerCreate(body: String): Group? {
        return client.post(ApiPaths.backendPath("/groups"), body) as? Group
    }

    /** 获取群组详情 */
    suspend fun groupControllerGetById(id: String): Group? {
        return client.get(ApiPaths.backendPath("/groups/$id")) as? Group
    }

    /** 更新群组信息 */
    suspend fun groupControllerUpdate(id: String, body: String): Group? {
        return client.put(ApiPaths.backendPath("/groups/$id"), body) as? Group
    }

    /** 删除群组 */
    suspend fun groupControllerDelete(id: String): Unit {
        client.delete(ApiPaths.backendPath("/groups/$id"))
    }

    /** 添加群成员 */
    suspend fun groupControllerAddMember(groupId: String, body: GroupControllerAddMemberRequest): GroupMember? {
        return client.post(ApiPaths.backendPath("/groups/$groupId/members"), body) as? GroupMember
    }

    /** 获取群成员列表 */
    suspend fun groupControllerGetMembers(groupId: String): GroupControllerGetMembersResponse? {
        return client.get(ApiPaths.backendPath("/groups/$groupId/members")) as? GroupControllerGetMembersResponse
    }

    /** 移除群成员 */
    suspend fun groupControllerRemoveMember(groupId: String, userId: String): Unit {
        client.delete(ApiPaths.backendPath("/groups/$groupId/members/$userId"))
    }

    /** 更新群成员角色 */
    suspend fun groupControllerUpdateMemberRole(groupId: String, userId: String, body: GroupControllerUpdateMemberRoleRequest): Unit {
        client.put(ApiPaths.backendPath("/groups/$groupId/members/$userId/role"), body)
    }

    /** 获取用户所在群组列表 */
    suspend fun groupControllerGetByUserId(userId: String): GroupControllerGetByUserIdResponse? {
        return client.get(ApiPaths.backendPath("/groups/user/$userId")) as? GroupControllerGetByUserIdResponse
    }

    /** 发送群组邀请 */
    suspend fun groupControllerSendInvitation(body: GroupControllerSendInvitationRequest): GroupInvitation? {
        return client.post(ApiPaths.backendPath("/groups/invitation"), body) as? GroupInvitation
    }

    /** 接受群组邀请 */
    suspend fun groupControllerAcceptInvitation(id: String): Unit {
        client.post(ApiPaths.backendPath("/groups/invitation/$id/accept"), null)
    }

    /** 拒绝群组邀请 */
    suspend fun groupControllerRejectInvitation(id: String): Unit {
        client.post(ApiPaths.backendPath("/groups/invitation/$id/reject"), null)
    }

    /** 取消群组邀请 */
    suspend fun groupControllerCancelInvitation(id: String): Unit {
        client.delete(ApiPaths.backendPath("/groups/invitation/$id"))
    }

    /** 添加用户到群黑名单 */
    suspend fun groupControllerAddToBlacklist(groupId: String, body: GroupControllerAddToBlacklistRequest): Unit {
        client.post(ApiPaths.backendPath("/groups/$groupId/blacklist"), body)
    }

    /** 获取群黑名单列表 */
    suspend fun groupControllerGetBlacklist(groupId: String): Unit {
        client.get(ApiPaths.backendPath("/groups/$groupId/blacklist"))
    }

    /** 从群黑名单移除用户 */
    suspend fun groupControllerRemoveFromBlacklist(groupId: String, userId: String): Unit {
        client.delete(ApiPaths.backendPath("/groups/$groupId/blacklist/$userId"))
    }

    /** 添加用户到群白名单 */
    suspend fun groupControllerAddToWhitelist(groupId: String, body: GroupControllerAddToWhitelistRequest): Unit {
        client.post(ApiPaths.backendPath("/groups/$groupId/whitelist"), body)
    }

    /** 获取群白名单列表 */
    suspend fun groupControllerGetWhitelist(groupId: String): Unit {
        client.get(ApiPaths.backendPath("/groups/$groupId/whitelist"))
    }

    /** 从群白名单移除用户 */
    suspend fun groupControllerRemoveFromWhitelist(groupId: String, userId: String): Unit {
        client.delete(ApiPaths.backendPath("/groups/$groupId/whitelist/$userId"))
    }

    /** 踢出群成员并加入黑名单 */
    suspend fun groupControllerKickMember(groupId: String, userId: String): Unit {
        client.post(ApiPaths.backendPath("/groups/$groupId/kick/$userId"), null)
    }

    /** 退出群组 */
    suspend fun groupControllerQuit(groupId: String, body: GroupControllerQuitRequest): Unit {
        client.post(ApiPaths.backendPath("/groups/$groupId/quit"), body)
    }

    /** 更新群公告 */
    suspend fun groupControllerUpdateAnnouncement(groupId: String, body: GroupControllerUpdateAnnouncementRequest): Group? {
        return client.put(ApiPaths.backendPath("/groups/$groupId/announcement"), body) as? Group
    }

    /** 全员禁言设置 */
    suspend fun groupControllerSetMuteAll(groupId: String, body: GroupControllerSetMuteAllRequest): Group? {
        return client.put(ApiPaths.backendPath("/groups/$groupId/mute-all"), body) as? Group
    }

    /** 禁言群成员 */
    suspend fun groupControllerMuteMember(groupId: String, userId: String, body: GroupControllerMuteMemberRequest): Unit {
        client.put(ApiPaths.backendPath("/groups/$groupId/members/$userId/mute"), body)
    }

    /** 转让群主 */
    suspend fun groupControllerTransfer(groupId: String, body: GroupControllerTransferRequest): Group? {
        return client.post(ApiPaths.backendPath("/groups/$groupId/transfer"), body) as? Group
    }
}
