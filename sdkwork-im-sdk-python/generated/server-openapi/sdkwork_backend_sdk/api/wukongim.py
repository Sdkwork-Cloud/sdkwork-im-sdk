from typing import Any, Dict, List, Optional
from ..http_client import HttpClient

class WukongimApi:
    """wukongim API client."""
    
    def __init__(self, client: HttpClient):
        self._client = client

    def wukong_imapp_controller_get_config(self) -> None:
        """Get WuKongIM connection config"""
        return self._client.get(f"/im/v3/wukongim/config")

    def wukong_imapp_controller_get_token(self) -> None:
        """Get WuKongIM user token"""
        return self._client.post(f"/im/v3/wukongim/token")
