from typing import Any, Dict, List, Optional
from ..http_client import HttpClient
from ..models import UpdateProfileDto

class UsersApi:
    """users API client."""
    
    def __init__(self, client: HttpClient):
        self._client = client

    def user_controller_get_current(self) -> None:
        """获取当前用户信息"""
        return self._client.get(f"/im/v3/users/me")

    def user_controller_get_by_id(self, id: str) -> None:
        """获取用户详情"""
        return self._client.get(f"/im/v3/users/{id}")

    def user_controller_update(self, id: str, body: UpdateProfileDto) -> None:
        """更新用户资料"""
        return self._client.put(f"/im/v3/users/{id}", json=body)

    def user_controller_search(self, params: Optional[Dict[str, Any]] = None) -> None:
        """搜索用户"""
        return self._client.get(f"/im/v3/users", params=params)
