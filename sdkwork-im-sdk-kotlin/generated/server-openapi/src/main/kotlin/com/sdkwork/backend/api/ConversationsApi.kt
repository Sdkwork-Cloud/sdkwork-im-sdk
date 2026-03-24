package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class ConversationsApi(private val client: HttpClient) {

    /** 创建会话 */
    suspend fun conversationControllerCreate(body: ConversationControllerCreateRequest): Conversation? {
        return client.post(ApiPaths.backendPath("/conversations"), body) as? Conversation
    }

    /** 获取用户的会话列表 */
    suspend fun conversationControllerGetByUserId(params: Map<String, Any>? = null): ConversationControllerGetByUserIdResponse? {
        return client.get(ApiPaths.backendPath("/conversations"), params) as? ConversationControllerGetByUserIdResponse
    }

    /** 获取会话同步状态 */
    suspend fun conversationControllerGetSyncState(params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/conversations/sync-state"), params)
    }

    /** 批量获取会话同步状态 */
    suspend fun conversationControllerGetSyncStates(body: ConversationControllerGetSyncStatesRequest): Unit {
        client.post(ApiPaths.backendPath("/conversations/sync-state/batch"), body)
    }

    /** 删除设备会话读游标 */
    suspend fun conversationControllerDeleteDeviceSyncState(deviceId: String): Unit {
        client.delete(ApiPaths.backendPath("/conversations/sync-state/device/$deviceId"))
    }

    /** 获取设备会话游标摘要 */
    suspend fun conversationControllerGetDeviceSyncStateSummaries(params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/conversations/sync-state/devices"), params)
    }

    /** 清理失活设备会话游标 */
    suspend fun conversationControllerDeleteStaleDeviceSyncStates(params: Map<String, Any>? = null): Unit {
        client.delete(ApiPaths.backendPath("/conversations/sync-state/devices/stale"), params)
    }

    /** 获取用户与特定目标的会话 */
    suspend fun conversationControllerGetByTarget(targetId: String, params: Map<String, Any>? = null): Conversation? {
        return client.get(ApiPaths.backendPath("/conversations/target/$targetId"), params) as? Conversation
    }

    /** 获取未读消息总数 */
    suspend fun conversationControllerGetTotalUnreadCount(): Unit {
        client.get(ApiPaths.backendPath("/conversations/unread-total/me"))
    }

    /** 获取会话详情 */
    suspend fun conversationControllerGetById(id: String): Conversation? {
        return client.get(ApiPaths.backendPath("/conversations/$id")) as? Conversation
    }

    /** 更新会话 */
    suspend fun conversationControllerUpdate(id: String, body: ConversationControllerUpdateRequest): Conversation? {
        return client.put(ApiPaths.backendPath("/conversations/$id"), body) as? Conversation
    }

    /** 删除会话 */
    suspend fun conversationControllerDelete(id: String): Unit {
        client.delete(ApiPaths.backendPath("/conversations/$id"))
    }

    /** 置顶/取消置顶会话 */
    suspend fun conversationControllerPin(id: String, body: ConversationControllerPinRequest): Unit {
        client.put(ApiPaths.backendPath("/conversations/$id/pin"), body)
    }

    /** 设置免打扰 */
    suspend fun conversationControllerMute(id: String, body: ConversationControllerMuteRequest): Unit {
        client.put(ApiPaths.backendPath("/conversations/$id/mute"), body)
    }

    /** 清空未读消息数 */
    suspend fun conversationControllerClearUnreadCount(id: String): Unit {
        client.put(ApiPaths.backendPath("/conversations/$id/read"), null)
    }

    /** 批量删除会话 */
    suspend fun conversationControllerBatchDelete(): Unit {
        client.delete(ApiPaths.backendPath("/conversations/batch"))
    }
}
