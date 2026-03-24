import Foundation

public class ConversationsApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// 创建会话
    public func conversationControllerCreate(body: ConversationControllerCreateRequest) async throws -> Conversation? {
        let response = try await client.post(ApiPaths.backendPath("/conversations"), body: body)
        return response as? Conversation
    }

    /// 获取用户的会话列表
    public func conversationControllerGetByUserId(params: [String: Any]? = nil) async throws -> ConversationControllerGetByUserIdResponse? {
        let response = try await client.get(ApiPaths.backendPath("/conversations"), params: params)
        return response as? ConversationControllerGetByUserIdResponse
    }

    /// 获取会话同步状态
    public func conversationControllerGetSyncState(params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/conversations/sync-state"), params: params)
    }

    /// 批量获取会话同步状态
    public func conversationControllerGetSyncStates(body: ConversationControllerGetSyncStatesRequest) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/conversations/sync-state/batch"), body: body)
    }

    /// 删除设备会话读游标
    public func conversationControllerDeleteDeviceSyncState(deviceId: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/conversations/sync-state/device/\(deviceId)"))
    }

    /// 获取设备会话游标摘要
    public func conversationControllerGetDeviceSyncStateSummaries(params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/conversations/sync-state/devices"), params: params)
    }

    /// 清理失活设备会话游标
    public func conversationControllerDeleteStaleDeviceSyncStates(params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/conversations/sync-state/devices/stale"), params: params)
    }

    /// 获取用户与特定目标的会话
    public func conversationControllerGetByTarget(targetId: String, params: [String: Any]? = nil) async throws -> Conversation? {
        let response = try await client.get(ApiPaths.backendPath("/conversations/target/\(targetId)"), params: params)
        return response as? Conversation
    }

    /// 获取未读消息总数
    public func conversationControllerGetTotalUnreadCount() async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/conversations/unread-total/me"))
    }

    /// 获取会话详情
    public func conversationControllerGetById(id: String) async throws -> Conversation? {
        let response = try await client.get(ApiPaths.backendPath("/conversations/\(id)"))
        return response as? Conversation
    }

    /// 更新会话
    public func conversationControllerUpdate(id: String, body: ConversationControllerUpdateRequest) async throws -> Conversation? {
        let response = try await client.put(ApiPaths.backendPath("/conversations/\(id)"), body: body)
        return response as? Conversation
    }

    /// 删除会话
    public func conversationControllerDelete(id: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/conversations/\(id)"))
    }

    /// 置顶/取消置顶会话
    public func conversationControllerPin(id: String, body: ConversationControllerPinRequest) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/conversations/\(id)/pin"), body: body)
    }

    /// 设置免打扰
    public func conversationControllerMute(id: String, body: ConversationControllerMuteRequest) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/conversations/\(id)/mute"), body: body)
    }

    /// 清空未读消息数
    public func conversationControllerClearUnreadCount(id: String) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/conversations/\(id)/read"), body: nil)
    }

    /// 批量删除会话
    public func conversationControllerBatchDelete() async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/conversations/batch"))
    }
}
