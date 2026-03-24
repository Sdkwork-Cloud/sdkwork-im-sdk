from typing import Any, Dict, List, Optional
from ..http_client import HttpClient

class MessageSearchApi:
    """message_search API client."""
    
    def __init__(self, client: HttpClient):
        self._client = client

    def controller(self, params: Optional[Dict[str, Any]] = None) -> None:
        """搜索消息"""
        return self._client.get(f"/im/v3/messages/search", params=params)

    def controller_quick(self, params: Optional[Dict[str, Any]] = None) -> None:
        """快速搜索"""
        return self._client.get(f"/im/v3/messages/search/quick", params=params)

    def controller_in_conversation(self, params: Optional[Dict[str, Any]] = None) -> None:
        """搜索会话消息"""
        return self._client.get(f"/im/v3/messages/search/conversation", params=params)

    def controller_get_stats(self, params: Optional[Dict[str, Any]] = None) -> None:
        """消息统计"""
        return self._client.get(f"/im/v3/messages/search/stats", params=params)
