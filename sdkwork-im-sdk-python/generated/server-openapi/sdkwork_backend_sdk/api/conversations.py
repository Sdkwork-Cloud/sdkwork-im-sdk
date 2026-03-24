from typing import Any, Dict, List, Optional
from ..http_client import HttpClient
from ..models import Conversation, ConversationControllerCreateRequest, ConversationControllerGetByUserIdResponse, ConversationControllerGetSyncStatesRequest, ConversationControllerMuteRequest, ConversationControllerPinRequest, ConversationControllerUpdateRequest

class ConversationsApi:
    """conversations API client."""
    
    def __init__(self, client: HttpClient):
        self._client = client

    def conversation_controller_create(self, body: ConversationControllerCreateRequest) -> Conversation:
        """创建会话"""
        return self._client.post(f"/im/v3/conversations", json=body)

    def conversation_controller_get_by_user_id(self, params: Optional[Dict[str, Any]] = None) -> ConversationControllerGetByUserIdResponse:
        """获取用户的会话列表"""
        return self._client.get(f"/im/v3/conversations", params=params)

    def conversation_controller_get_sync_state(self, params: Optional[Dict[str, Any]] = None) -> None:
        """获取会话同步状态"""
        return self._client.get(f"/im/v3/conversations/sync-state", params=params)

    def conversation_controller_get_sync_states(self, body: ConversationControllerGetSyncStatesRequest) -> None:
        """批量获取会话同步状态"""
        return self._client.post(f"/im/v3/conversations/sync-state/batch", json=body)

    def conversation_controller_delete_device_sync_state(self, deviceId: str) -> None:
        """删除设备会话读游标"""
        return self._client.delete(f"/im/v3/conversations/sync-state/device/{deviceId}")

    def conversation_controller_get_device_sync_state_summaries(self, params: Optional[Dict[str, Any]] = None) -> None:
        """获取设备会话游标摘要"""
        return self._client.get(f"/im/v3/conversations/sync-state/devices", params=params)

    def conversation_controller_delete_stale_device_sync_states(self, params: Optional[Dict[str, Any]] = None) -> None:
        """清理失活设备会话游标"""
        return self._client.delete(f"/im/v3/conversations/sync-state/devices/stale", params=params)

    def conversation_controller_get_by_target(self, targetId: str, params: Optional[Dict[str, Any]] = None) -> Conversation:
        """获取用户与特定目标的会话"""
        return self._client.get(f"/im/v3/conversations/target/{targetId}", params=params)

    def conversation_controller_get_total_unread_count(self) -> None:
        """获取未读消息总数"""
        return self._client.get(f"/im/v3/conversations/unread-total/me")

    def conversation_controller_get_by_id(self, id: str) -> Conversation:
        """获取会话详情"""
        return self._client.get(f"/im/v3/conversations/{id}")

    def conversation_controller_update(self, id: str, body: ConversationControllerUpdateRequest) -> Conversation:
        """更新会话"""
        return self._client.put(f"/im/v3/conversations/{id}", json=body)

    def conversation_controller_delete(self, id: str) -> None:
        """删除会话"""
        return self._client.delete(f"/im/v3/conversations/{id}")

    def conversation_controller_pin(self, id: str, body: ConversationControllerPinRequest) -> None:
        """置顶/取消置顶会话"""
        return self._client.put(f"/im/v3/conversations/{id}/pin", json=body)

    def conversation_controller_mute(self, id: str, body: ConversationControllerMuteRequest) -> None:
        """设置免打扰"""
        return self._client.put(f"/im/v3/conversations/{id}/mute", json=body)

    def conversation_controller_clear_unread_count(self, id: str) -> None:
        """清空未读消息数"""
        return self._client.put(f"/im/v3/conversations/{id}/read")

    def conversation_controller_batch_delete(self) -> None:
        """批量删除会话"""
        return self._client.delete(f"/im/v3/conversations/batch")
