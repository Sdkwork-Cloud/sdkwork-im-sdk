import Foundation

public class MessagesApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// 发送消息
    public func messageControllerSend(body: SendMessage) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/messages"), body: body)
    }

    /// 批量发送消息
    public func messageControllerBatchSend(body: BatchSendMessage) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/messages/batch"), body: body)
    }

    /// 获取用户消息列表
    public func messageControllerGetByUserId(userId: String, params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/messages/user/\(userId)"), params: params)
    }

    /// 获取群组消息列表
    public func messageControllerGetByGroupId(groupId: String, params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/messages/group/\(groupId)"), params: params)
    }

    /// 按序列号增量拉取会话消息
    public func messageControllerGetHistoryBySeq(params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/messages/history/seq"), params: params)
    }

    /// 确认会话同步序列（支持设备维度）
    public func messageControllerAckConversationSeq(body: AckConversationSeqRequest) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/messages/sync/ack-seq"), body: body)
    }

    /// 批量确认会话同步序列（支持设备维度）
    public func messageControllerAckConversationSeqBatch(body: AckConversationSeqBatchRequest) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/messages/sync/ack-seq/batch"), body: body)
    }

    /// 获取消息详情
    public func messageControllerGetById(id: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/messages/\(id)"))
    }

    /// 删除消息
    public func messageControllerDelete(id: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/messages/\(id)"))
    }

    /// 获取消息回执详情
    public func messageControllerGetReceipts(id: String, params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/messages/\(id)/receipts"), params: params)
    }

    /// 获取消息回执统计
    public func messageControllerGetReceiptSummary(id: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/messages/\(id)/receipt-summary"))
    }

    /// 获取群消息未读成员列表
    public func messageControllerGetGroupUnreadMembers(id: String, params: [String: Any]? = nil) async throws -> MessageUnreadMembersResponse? {
        let response = try await client.get(ApiPaths.backendPath("/messages/\(id)/unread-members"), params: params)
        return response as? MessageUnreadMembersResponse
    }

    /// 获取群消息已读成员列表
    public func messageControllerGetGroupReadMembers(id: String, params: [String: Any]? = nil) async throws -> MessageReadMembersResponse? {
        let response = try await client.get(ApiPaths.backendPath("/messages/\(id)/read-members"), params: params)
        return response as? MessageReadMembersResponse
    }

    /// 更新消息状态
    public func messageControllerUpdateStatus(id: String, body: UpdateMessageStatus) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/messages/\(id)/status"), body: body)
    }

    /// 编辑消息内容
    public func messageControllerEdit(id: String, body: EditMessage) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/messages/\(id)/content"), body: body)
    }

    /// 获取消息反应汇总
    public func messageControllerGetReactionSummary(id: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/messages/\(id)/reactions"))
    }

    /// 设置消息反应
    public func messageControllerSetReaction(id: String, body: SetMessageReaction) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/messages/\(id)/reactions"), body: body)
    }

    /// 标记群消息为已读
    public func messageControllerMarkGroupAsRead(groupId: String, body: MarkMessagesRead) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/messages/group/\(groupId)/read"), body: body)
    }

    /// 标记消息为已读
    public func messageControllerMarkAsRead(userId: String, body: MarkMessagesRead) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/messages/\(userId)/read"), body: body)
    }

    /// 撤回消息
    public func messageControllerRecall(id: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/messages/\(id)/recall"), body: nil)
    }

    /// 转发消息
    public func messageControllerForward(id: String, body: ForwardMessage) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/messages/\(id)/forward"), body: body)
    }

    /// 重试发送失败的消息
    public func messageControllerRetryFailed(id: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/messages/\(id)/retry"), body: nil)
    }
}
