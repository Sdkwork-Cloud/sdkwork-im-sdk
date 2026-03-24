package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class MessagesApi {
    private final HttpClient client;
    
    public MessagesApi(HttpClient client) {
        this.client = client;
    }

    /** 发送消息 */
    public Void messageControllerSend(SendMessage body) throws Exception {
        client.post(ApiPaths.backendPath("/messages"), body);
        return null;
    }

    /** 批量发送消息 */
    public Void messageControllerBatchSend(BatchSendMessage body) throws Exception {
        client.post(ApiPaths.backendPath("/messages/batch"), body);
        return null;
    }

    /** 获取用户消息列表 */
    public Void messageControllerGetByUserId(String userId, Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/messages/user/" + userId + ""), params);
        return null;
    }

    /** 获取群组消息列表 */
    public Void messageControllerGetByGroupId(String groupId, Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/messages/group/" + groupId + ""), params);
        return null;
    }

    /** 按序列号增量拉取会话消息 */
    public Void messageControllerGetHistoryBySeq(Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/messages/history/seq"), params);
        return null;
    }

    /** 确认会话同步序列（支持设备维度） */
    public Void messageControllerAckConversationSeq(AckConversationSeqRequest body) throws Exception {
        client.post(ApiPaths.backendPath("/messages/sync/ack-seq"), body);
        return null;
    }

    /** 批量确认会话同步序列（支持设备维度） */
    public Void messageControllerAckConversationSeqBatch(AckConversationSeqBatchRequest body) throws Exception {
        client.post(ApiPaths.backendPath("/messages/sync/ack-seq/batch"), body);
        return null;
    }

    /** 获取消息详情 */
    public Void messageControllerGetById(String id) throws Exception {
        client.get(ApiPaths.backendPath("/messages/" + id + ""));
        return null;
    }

    /** 删除消息 */
    public Void messageControllerDelete(String id) throws Exception {
        client.delete(ApiPaths.backendPath("/messages/" + id + ""));
        return null;
    }

    /** 获取消息回执详情 */
    public Void messageControllerGetReceipts(String id, Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/messages/" + id + "/receipts"), params);
        return null;
    }

    /** 获取消息回执统计 */
    public Void messageControllerGetReceiptSummary(String id) throws Exception {
        client.get(ApiPaths.backendPath("/messages/" + id + "/receipt-summary"));
        return null;
    }

    /** 获取群消息未读成员列表 */
    public MessageUnreadMembersResponse messageControllerGetGroupUnreadMembers(String id, Map<String, Object> params) throws Exception {
        return (MessageUnreadMembersResponse) client.get(ApiPaths.backendPath("/messages/" + id + "/unread-members"), params);
    }

    /** 获取群消息已读成员列表 */
    public MessageReadMembersResponse messageControllerGetGroupReadMembers(String id, Map<String, Object> params) throws Exception {
        return (MessageReadMembersResponse) client.get(ApiPaths.backendPath("/messages/" + id + "/read-members"), params);
    }

    /** 更新消息状态 */
    public Void messageControllerUpdateStatus(String id, UpdateMessageStatus body) throws Exception {
        client.put(ApiPaths.backendPath("/messages/" + id + "/status"), body);
        return null;
    }

    /** 编辑消息内容 */
    public Void messageControllerEdit(String id, EditMessage body) throws Exception {
        client.put(ApiPaths.backendPath("/messages/" + id + "/content"), body);
        return null;
    }

    /** 获取消息反应汇总 */
    public Void messageControllerGetReactionSummary(String id) throws Exception {
        client.get(ApiPaths.backendPath("/messages/" + id + "/reactions"));
        return null;
    }

    /** 设置消息反应 */
    public Void messageControllerSetReaction(String id, SetMessageReaction body) throws Exception {
        client.put(ApiPaths.backendPath("/messages/" + id + "/reactions"), body);
        return null;
    }

    /** 标记群消息为已读 */
    public Void messageControllerMarkGroupAsRead(String groupId, MarkMessagesRead body) throws Exception {
        client.post(ApiPaths.backendPath("/messages/group/" + groupId + "/read"), body);
        return null;
    }

    /** 标记消息为已读 */
    public Void messageControllerMarkAsRead(String userId, MarkMessagesRead body) throws Exception {
        client.post(ApiPaths.backendPath("/messages/" + userId + "/read"), body);
        return null;
    }

    /** 撤回消息 */
    public Void messageControllerRecall(String id) throws Exception {
        client.post(ApiPaths.backendPath("/messages/" + id + "/recall"), null);
        return null;
    }

    /** 转发消息 */
    public Void messageControllerForward(String id, ForwardMessage body) throws Exception {
        client.post(ApiPaths.backendPath("/messages/" + id + "/forward"), body);
        return null;
    }

    /** 重试发送失败的消息 */
    public Void messageControllerRetryFailed(String id) throws Exception {
        client.post(ApiPaths.backendPath("/messages/" + id + "/retry"), null);
        return null;
    }
}
