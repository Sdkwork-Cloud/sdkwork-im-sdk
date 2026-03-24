from typing import Any, Dict, List, Optional
from ..http_client import HttpClient
from ..models import CreateBotDto, SetWebhookDto, UpdateBotDto

class BotsApi:
    """bots API client."""
    
    def __init__(self, client: HttpClient):
        self._client = client

    def bot_controller_create(self, body: CreateBotDto) -> None:
        """创建 Bot"""
        return self._client.post(f"/im/v3/bots", json=body)

    def bot_controller_get(self, params: Optional[Dict[str, Any]] = None) -> None:
        """获取 Bot 列表"""
        return self._client.get(f"/im/v3/bots", params=params)

    def bot_controller_get_by_id(self, id: str) -> None:
        """获取 Bot 详情"""
        return self._client.get(f"/im/v3/bots/{id}")

    def bot_controller_update(self, id: str, body: UpdateBotDto) -> None:
        """更新 Bot"""
        return self._client.put(f"/im/v3/bots/{id}", json=body)

    def bot_controller_delete(self, id: str) -> None:
        """删除 Bot"""
        return self._client.delete(f"/im/v3/bots/{id}")

    def bot_controller_regenerate_token(self, id: str) -> None:
        """重新生成 Bot Token"""
        return self._client.post(f"/im/v3/bots/{id}/regenerate-token")

    def bot_controller_set_webhook(self, id: str, body: SetWebhookDto) -> None:
        """设置 Webhook"""
        return self._client.post(f"/im/v3/bots/{id}/webhook", json=body)

    def bot_controller_delete_webhook(self, id: str) -> None:
        """删除 Webhook"""
        return self._client.delete(f"/im/v3/bots/{id}/webhook")
