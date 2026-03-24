from typing import Any, Dict, List, Optional
from ..http_client import HttpClient
from ..models import AckConversationSeqBatchRequest, AckConversationSeqRequest, BatchSendMessage, EditMessage, ForwardMessage, MarkMessagesRead, MessageReadMembersResponse, MessageUnreadMembersResponse, SendMessage, SetMessageReaction, UpdateMessageStatus

class MessagesApi:
    """messages API client."""
    
    def __init__(self, client: HttpClient):
        self._client = client

    def message_controller_send(self, body: SendMessage) -> None:
        """发送消息"""
        return self._client.post(f"/im/v3/messages", json=body)

    def message_controller_batch_send(self, body: BatchSendMessage) -> None:
        """批量发送消息"""
        return self._client.post(f"/im/v3/messages/batch", json=body)

    def message_controller_get_by_user_id(self, userId: str, params: Optional[Dict[str, Any]] = None) -> None:
        """获取用户消息列表"""
        return self._client.get(f"/im/v3/messages/user/{userId}", params=params)

    def message_controller_get_by_group_id(self, groupId: str, params: Optional[Dict[str, Any]] = None) -> None:
        """获取群组消息列表"""
        return self._client.get(f"/im/v3/messages/group/{groupId}", params=params)

    def message_controller_get_history_by_seq(self, params: Optional[Dict[str, Any]] = None) -> None:
        """按序列号增量拉取会话消息"""
        return self._client.get(f"/im/v3/messages/history/seq", params=params)

    def message_controller_ack_conversation_seq(self, body: AckConversationSeqRequest) -> None:
        """确认会话同步序列（支持设备维度）"""
        return self._client.post(f"/im/v3/messages/sync/ack-seq", json=body)

    def message_controller_ack_conversation_seq_batch(self, body: AckConversationSeqBatchRequest) -> None:
        """批量确认会话同步序列（支持设备维度）"""
        return self._client.post(f"/im/v3/messages/sync/ack-seq/batch", json=body)

    def message_controller_get_by_id(self, id: str) -> None:
        """获取消息详情"""
        return self._client.get(f"/im/v3/messages/{id}")

    def message_controller_delete(self, id: str) -> None:
        """删除消息"""
        return self._client.delete(f"/im/v3/messages/{id}")

    def message_controller_get_receipts(self, id: str, params: Optional[Dict[str, Any]] = None) -> None:
        """获取消息回执详情"""
        return self._client.get(f"/im/v3/messages/{id}/receipts", params=params)

    def message_controller_get_receipt_summary(self, id: str) -> None:
        """获取消息回执统计"""
        return self._client.get(f"/im/v3/messages/{id}/receipt-summary")

    def message_controller_get_group_unread_members(self, id: str, params: Optional[Dict[str, Any]] = None) -> MessageUnreadMembersResponse:
        """获取群消息未读成员列表"""
        return self._client.get(f"/im/v3/messages/{id}/unread-members", params=params)

    def message_controller_get_group_read_members(self, id: str, params: Optional[Dict[str, Any]] = None) -> MessageReadMembersResponse:
        """获取群消息已读成员列表"""
        return self._client.get(f"/im/v3/messages/{id}/read-members", params=params)

    def message_controller_update_status(self, id: str, body: UpdateMessageStatus) -> None:
        """更新消息状态"""
        return self._client.put(f"/im/v3/messages/{id}/status", json=body)

    def message_controller_edit(self, id: str, body: EditMessage) -> None:
        """编辑消息内容"""
        return self._client.put(f"/im/v3/messages/{id}/content", json=body)

    def message_controller_get_reaction_summary(self, id: str) -> None:
        """获取消息反应汇总"""
        return self._client.get(f"/im/v3/messages/{id}/reactions")

    def message_controller_set_reaction(self, id: str, body: SetMessageReaction) -> None:
        """设置消息反应"""
        return self._client.put(f"/im/v3/messages/{id}/reactions", json=body)

    def message_controller_mark_group_as_read(self, groupId: str, body: MarkMessagesRead) -> None:
        """标记群消息为已读"""
        return self._client.post(f"/im/v3/messages/group/{groupId}/read", json=body)

    def message_controller_mark_as_read(self, userId: str, body: MarkMessagesRead) -> None:
        """标记消息为已读"""
        return self._client.post(f"/im/v3/messages/{userId}/read", json=body)

    def message_controller_recall(self, id: str) -> None:
        """撤回消息"""
        return self._client.post(f"/im/v3/messages/{id}/recall")

    def message_controller_forward(self, id: str, body: ForwardMessage) -> None:
        """转发消息"""
        return self._client.post(f"/im/v3/messages/{id}/forward", json=body)

    def message_controller_retry_failed(self, id: str) -> None:
        """重试发送失败的消息"""
        return self._client.post(f"/im/v3/messages/{id}/retry")
