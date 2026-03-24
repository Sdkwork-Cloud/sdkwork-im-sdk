package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class ConversationsApi {
    private final HttpClient client;
    
    public ConversationsApi(HttpClient client) {
        this.client = client;
    }

    /** 创建会话 */
    public Conversation conversationControllerCreate(ConversationControllerCreateRequest body) throws Exception {
        return (Conversation) client.post(ApiPaths.backendPath("/conversations"), body);
    }

    /** 获取用户的会话列表 */
    public ConversationControllerGetByUserIdResponse conversationControllerGetByUserId(Map<String, Object> params) throws Exception {
        return (ConversationControllerGetByUserIdResponse) client.get(ApiPaths.backendPath("/conversations"), params);
    }

    /** 获取会话同步状态 */
    public Void conversationControllerGetSyncState(Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/conversations/sync-state"), params);
        return null;
    }

    /** 批量获取会话同步状态 */
    public Void conversationControllerGetSyncStates(ConversationControllerGetSyncStatesRequest body) throws Exception {
        client.post(ApiPaths.backendPath("/conversations/sync-state/batch"), body);
        return null;
    }

    /** 删除设备会话读游标 */
    public Void conversationControllerDeleteDeviceSyncState(String deviceId) throws Exception {
        client.delete(ApiPaths.backendPath("/conversations/sync-state/device/" + deviceId + ""));
        return null;
    }

    /** 获取设备会话游标摘要 */
    public Void conversationControllerGetDeviceSyncStateSummaries(Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/conversations/sync-state/devices"), params);
        return null;
    }

    /** 清理失活设备会话游标 */
    public Void conversationControllerDeleteStaleDeviceSyncStates(Map<String, Object> params) throws Exception {
        client.delete(ApiPaths.backendPath("/conversations/sync-state/devices/stale"), params);
        return null;
    }

    /** 获取用户与特定目标的会话 */
    public Conversation conversationControllerGetByTarget(String targetId, Map<String, Object> params) throws Exception {
        return (Conversation) client.get(ApiPaths.backendPath("/conversations/target/" + targetId + ""), params);
    }

    /** 获取未读消息总数 */
    public Void conversationControllerGetTotalUnreadCount() throws Exception {
        client.get(ApiPaths.backendPath("/conversations/unread-total/me"));
        return null;
    }

    /** 获取会话详情 */
    public Conversation conversationControllerGetById(String id) throws Exception {
        return (Conversation) client.get(ApiPaths.backendPath("/conversations/" + id + ""));
    }

    /** 更新会话 */
    public Conversation conversationControllerUpdate(String id, ConversationControllerUpdateRequest body) throws Exception {
        return (Conversation) client.put(ApiPaths.backendPath("/conversations/" + id + ""), body);
    }

    /** 删除会话 */
    public Void conversationControllerDelete(String id) throws Exception {
        client.delete(ApiPaths.backendPath("/conversations/" + id + ""));
        return null;
    }

    /** 置顶/取消置顶会话 */
    public Void conversationControllerPin(String id, ConversationControllerPinRequest body) throws Exception {
        client.put(ApiPaths.backendPath("/conversations/" + id + "/pin"), body);
        return null;
    }

    /** 设置免打扰 */
    public Void conversationControllerMute(String id, ConversationControllerMuteRequest body) throws Exception {
        client.put(ApiPaths.backendPath("/conversations/" + id + "/mute"), body);
        return null;
    }

    /** 清空未读消息数 */
    public Void conversationControllerClearUnreadCount(String id) throws Exception {
        client.put(ApiPaths.backendPath("/conversations/" + id + "/read"), null);
        return null;
    }

    /** 批量删除会话 */
    public Void conversationControllerBatchDelete() throws Exception {
        client.delete(ApiPaths.backendPath("/conversations/batch"));
        return null;
    }
}
