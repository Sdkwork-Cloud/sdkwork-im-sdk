from typing import Any, Dict, List, Optional
from ..http_client import HttpClient
from ..models import ThirdPartyMessage

class ThirdPartyApi:
    """third_party API client."""
    
    def __init__(self, client: HttpClient):
        self._client = client

    def controller_send_message(self, platform: str, body: str) -> ThirdPartyMessage:
        """发送第三方平台消息"""
        return self._client.post(f"/im/v3/third-party/{platform}/messages", json=body)

    def controller_get_message_status(self, platform: str, id: str) -> None:
        """获取第三方平台消息状态"""
        return self._client.get(f"/im/v3/third-party/{platform}/messages/{id}/status")

    def controller_sync_contacts(self, platform: str) -> None:
        """同步第三方平台联系人"""
        return self._client.post(f"/im/v3/third-party/{platform}/contacts/sync")

    def controller_get_contact(self, platform: str, params: Optional[Dict[str, Any]] = None) -> None:
        """获取第三方平台联系人"""
        return self._client.get(f"/im/v3/third-party/{platform}/contacts", params=params)
