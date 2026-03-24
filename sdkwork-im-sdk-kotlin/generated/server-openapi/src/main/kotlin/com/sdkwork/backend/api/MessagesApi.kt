package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class MessagesApi(private val client: HttpClient) {

    /** 发送消息 */
    suspend fun messageControllerSend(body: SendMessage): Unit {
        client.post(ApiPaths.backendPath("/messages"), body)
    }

    /** 批量发送消息 */
    suspend fun messageControllerBatchSend(body: BatchSendMessage): Unit {
        client.post(ApiPaths.backendPath("/messages/batch"), body)
    }

    /** 获取用户消息列表 */
    suspend fun messageControllerGetByUserId(userId: String, params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/messages/user/$userId"), params)
    }

    /** 获取群组消息列表 */
    suspend fun messageControllerGetByGroupId(groupId: String, params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/messages/group/$groupId"), params)
    }

    /** 按序列号增量拉取会话消息 */
    suspend fun messageControllerGetHistoryBySeq(params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/messages/history/seq"), params)
    }

    /** 确认会话同步序列（支持设备维度） */
    suspend fun messageControllerAckConversationSeq(body: AckConversationSeqRequest): Unit {
        client.post(ApiPaths.backendPath("/messages/sync/ack-seq"), body)
    }

    /** 批量确认会话同步序列（支持设备维度） */
    suspend fun messageControllerAckConversationSeqBatch(body: AckConversationSeqBatchRequest): Unit {
        client.post(ApiPaths.backendPath("/messages/sync/ack-seq/batch"), body)
    }

    /** 获取消息详情 */
    suspend fun messageControllerGetById(id: String): Unit {
        client.get(ApiPaths.backendPath("/messages/$id"))
    }

    /** 删除消息 */
    suspend fun messageControllerDelete(id: String): Unit {
        client.delete(ApiPaths.backendPath("/messages/$id"))
    }

    /** 获取消息回执详情 */
    suspend fun messageControllerGetReceipts(id: String, params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/messages/$id/receipts"), params)
    }

    /** 获取消息回执统计 */
    suspend fun messageControllerGetReceiptSummary(id: String): Unit {
        client.get(ApiPaths.backendPath("/messages/$id/receipt-summary"))
    }

    /** 获取群消息未读成员列表 */
    suspend fun messageControllerGetGroupUnreadMembers(id: String, params: Map<String, Any>? = null): MessageUnreadMembersResponse? {
        return client.get(ApiPaths.backendPath("/messages/$id/unread-members"), params) as? MessageUnreadMembersResponse
    }

    /** 获取群消息已读成员列表 */
    suspend fun messageControllerGetGroupReadMembers(id: String, params: Map<String, Any>? = null): MessageReadMembersResponse? {
        return client.get(ApiPaths.backendPath("/messages/$id/read-members"), params) as? MessageReadMembersResponse
    }

    /** 更新消息状态 */
    suspend fun messageControllerUpdateStatus(id: String, body: UpdateMessageStatus): Unit {
        client.put(ApiPaths.backendPath("/messages/$id/status"), body)
    }

    /** 编辑消息内容 */
    suspend fun messageControllerEdit(id: String, body: EditMessage): Unit {
        client.put(ApiPaths.backendPath("/messages/$id/content"), body)
    }

    /** 获取消息反应汇总 */
    suspend fun messageControllerGetReactionSummary(id: String): Unit {
        client.get(ApiPaths.backendPath("/messages/$id/reactions"))
    }

    /** 设置消息反应 */
    suspend fun messageControllerSetReaction(id: String, body: SetMessageReaction): Unit {
        client.put(ApiPaths.backendPath("/messages/$id/reactions"), body)
    }

    /** 标记群消息为已读 */
    suspend fun messageControllerMarkGroupAsRead(groupId: String, body: MarkMessagesRead): Unit {
        client.post(ApiPaths.backendPath("/messages/group/$groupId/read"), body)
    }

    /** 标记消息为已读 */
    suspend fun messageControllerMarkAsRead(userId: String, body: MarkMessagesRead): Unit {
        client.post(ApiPaths.backendPath("/messages/$userId/read"), body)
    }

    /** 撤回消息 */
    suspend fun messageControllerRecall(id: String): Unit {
        client.post(ApiPaths.backendPath("/messages/$id/recall"), null)
    }

    /** 转发消息 */
    suspend fun messageControllerForward(id: String, body: ForwardMessage): Unit {
        client.post(ApiPaths.backendPath("/messages/$id/forward"), body)
    }

    /** 重试发送失败的消息 */
    suspend fun messageControllerRetryFailed(id: String): Unit {
        client.post(ApiPaths.backendPath("/messages/$id/retry"), null)
    }
}
