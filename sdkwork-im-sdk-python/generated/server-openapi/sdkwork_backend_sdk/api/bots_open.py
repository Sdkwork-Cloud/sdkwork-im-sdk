from typing import Any, Dict, List, Optional
from ..http_client import HttpClient
from ..models import BotOpenProfileResponseDto, BotOpenWebhookResultResponseDto, BotOpenWebhookStatsResponseDto, BotOpenWebhookTestEventRequestDto

class BotsOpenApi:
    """bots_open API client."""
    
    def __init__(self, client: HttpClient):
        self._client = client

    def bot_open_controller_get_current(self) -> BotOpenProfileResponseDto:
        """获取当前 Bot 信息（Bot Token）"""
        return self._client.get(f"/im/v3/bots/open/me")

    def bot_open_controller_get_webhook_stats(self) -> BotOpenWebhookStatsResponseDto:
        """获取当前 Bot 的 Webhook 统计（Bot Token）"""
        return self._client.get(f"/im/v3/bots/open/webhook/stats")

    def bot_open_controller_send_webhook_test_event(self, body: BotOpenWebhookTestEventRequestDto) -> BotOpenWebhookResultResponseDto:
        """触发当前 Bot 的 Webhook 测试事件（Bot Token）"""
        return self._client.post(f"/im/v3/bots/open/webhook/test-event", json=body)
