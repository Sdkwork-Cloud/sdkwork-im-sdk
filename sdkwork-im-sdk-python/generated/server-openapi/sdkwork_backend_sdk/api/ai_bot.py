from typing import Any, Dict, List, Optional
from ..http_client import HttpClient
from ..models import AibotControllerCreateBotRequest, AibotControllerProcessMessageRequest, AibotControllerUpdateBotRequest

class AiBotApi:
    """ai_bot API client."""
    
    def __init__(self, client: HttpClient):
        self._client = client

    def aibot_controller_create_bot(self, body: AibotControllerCreateBotRequest) -> None:
        """Create a new AI Bot"""
        return self._client.post(f"/im/v3/ai-bots", json=body)

    def aibot_controller_get_bots(self) -> None:
        """Get all AI Bots"""
        return self._client.get(f"/im/v3/ai-bots")

    def aibot_controller_get_bot(self, id: str) -> None:
        """Get an AI Bot by ID"""
        return self._client.get(f"/im/v3/ai-bots/{id}")

    def aibot_controller_update_bot(self, id: str, body: AibotControllerUpdateBotRequest) -> None:
        """Update an AI Bot"""
        return self._client.put(f"/im/v3/ai-bots/{id}", json=body)

    def aibot_controller_delete_bot(self, id: str) -> None:
        """Delete an AI Bot"""
        return self._client.delete(f"/im/v3/ai-bots/{id}")

    def aibot_controller_activate_bot(self, id: str) -> None:
        """Activate an AI Bot"""
        return self._client.post(f"/im/v3/ai-bots/{id}/activate")

    def aibot_controller_deactivate_bot(self, id: str) -> None:
        """Deactivate an AI Bot"""
        return self._client.post(f"/im/v3/ai-bots/{id}/deactivate")

    def aibot_controller_process_message(self, id: str, body: AibotControllerProcessMessageRequest) -> None:
        """Process a message with AI Bot"""
        return self._client.post(f"/im/v3/ai-bots/{id}/messages", json=body)
