import Foundation

public class GroupsApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// 创建群组
    public func groupControllerCreate(body: String) async throws -> Group? {
        let response = try await client.post(ApiPaths.backendPath("/groups"), body: body)
        return response as? Group
    }

    /// 获取群组详情
    public func groupControllerGetById(id: String) async throws -> Group? {
        let response = try await client.get(ApiPaths.backendPath("/groups/\(id)"))
        return response as? Group
    }

    /// 更新群组信息
    public func groupControllerUpdate(id: String, body: String) async throws -> Group? {
        let response = try await client.put(ApiPaths.backendPath("/groups/\(id)"), body: body)
        return response as? Group
    }

    /// 删除群组
    public func groupControllerDelete(id: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/groups/\(id)"))
    }

    /// 添加群成员
    public func groupControllerAddMember(groupId: String, body: GroupControllerAddMemberRequest) async throws -> GroupMember? {
        let response = try await client.post(ApiPaths.backendPath("/groups/\(groupId)/members"), body: body)
        return response as? GroupMember
    }

    /// 获取群成员列表
    public func groupControllerGetMembers(groupId: String) async throws -> GroupControllerGetMembersResponse? {
        let response = try await client.get(ApiPaths.backendPath("/groups/\(groupId)/members"))
        return response as? GroupControllerGetMembersResponse
    }

    /// 移除群成员
    public func groupControllerRemoveMember(groupId: String, userId: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/groups/\(groupId)/members/\(userId)"))
    }

    /// 更新群成员角色
    public func groupControllerUpdateMemberRole(groupId: String, userId: String, body: GroupControllerUpdateMemberRoleRequest) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/groups/\(groupId)/members/\(userId)/role"), body: body)
    }

    /// 获取用户所在群组列表
    public func groupControllerGetByUserId(userId: String) async throws -> GroupControllerGetByUserIdResponse? {
        let response = try await client.get(ApiPaths.backendPath("/groups/user/\(userId)"))
        return response as? GroupControllerGetByUserIdResponse
    }

    /// 发送群组邀请
    public func groupControllerSendInvitation(body: GroupControllerSendInvitationRequest) async throws -> GroupInvitation? {
        let response = try await client.post(ApiPaths.backendPath("/groups/invitation"), body: body)
        return response as? GroupInvitation
    }

    /// 接受群组邀请
    public func groupControllerAcceptInvitation(id: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/groups/invitation/\(id)/accept"), body: nil)
    }

    /// 拒绝群组邀请
    public func groupControllerRejectInvitation(id: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/groups/invitation/\(id)/reject"), body: nil)
    }

    /// 取消群组邀请
    public func groupControllerCancelInvitation(id: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/groups/invitation/\(id)"))
    }

    /// 添加用户到群黑名单
    public func groupControllerAddToBlacklist(groupId: String, body: GroupControllerAddToBlacklistRequest) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/groups/\(groupId)/blacklist"), body: body)
    }

    /// 获取群黑名单列表
    public func groupControllerGetBlacklist(groupId: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/groups/\(groupId)/blacklist"))
    }

    /// 从群黑名单移除用户
    public func groupControllerRemoveFromBlacklist(groupId: String, userId: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/groups/\(groupId)/blacklist/\(userId)"))
    }

    /// 添加用户到群白名单
    public func groupControllerAddToWhitelist(groupId: String, body: GroupControllerAddToWhitelistRequest) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/groups/\(groupId)/whitelist"), body: body)
    }

    /// 获取群白名单列表
    public func groupControllerGetWhitelist(groupId: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/groups/\(groupId)/whitelist"))
    }

    /// 从群白名单移除用户
    public func groupControllerRemoveFromWhitelist(groupId: String, userId: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/groups/\(groupId)/whitelist/\(userId)"))
    }

    /// 踢出群成员并加入黑名单
    public func groupControllerKickMember(groupId: String, userId: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/groups/\(groupId)/kick/\(userId)"), body: nil)
    }

    /// 退出群组
    public func groupControllerQuit(groupId: String, body: GroupControllerQuitRequest) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/groups/\(groupId)/quit"), body: body)
    }

    /// 更新群公告
    public func groupControllerUpdateAnnouncement(groupId: String, body: GroupControllerUpdateAnnouncementRequest) async throws -> Group? {
        let response = try await client.put(ApiPaths.backendPath("/groups/\(groupId)/announcement"), body: body)
        return response as? Group
    }

    /// 全员禁言设置
    public func groupControllerSetMuteAll(groupId: String, body: GroupControllerSetMuteAllRequest) async throws -> Group? {
        let response = try await client.put(ApiPaths.backendPath("/groups/\(groupId)/mute-all"), body: body)
        return response as? Group
    }

    /// 禁言群成员
    public func groupControllerMuteMember(groupId: String, userId: String, body: GroupControllerMuteMemberRequest) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/groups/\(groupId)/members/\(userId)/mute"), body: body)
    }

    /// 转让群主
    public func groupControllerTransfer(groupId: String, body: GroupControllerTransferRequest) async throws -> Group? {
        let response = try await client.post(ApiPaths.backendPath("/groups/\(groupId)/transfer"), body: body)
        return response as? Group
    }
}
