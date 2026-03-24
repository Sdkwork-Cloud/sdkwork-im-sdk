from typing import Any, Dict, List, Optional
from ..http_client import HttpClient
from ..models import Contact, ContactControllerAddTagRequest, ContactControllerCreateRequest, ContactControllerGetByUserIdResponse, ContactControllerSearchResponse, ContactControllerSetFavoriteRequest, ContactControllerSetRemarkRequest, ContactControllerUpdateRequest

class ContactsApi:
    """contacts API client."""
    
    def __init__(self, client: HttpClient):
        self._client = client

    def contact_controller_create(self, body: ContactControllerCreateRequest) -> Contact:
        """创建联系人"""
        return self._client.post(f"/im/v3/contacts", json=body)

    def contact_controller_get_by_user_id(self, params: Optional[Dict[str, Any]] = None) -> ContactControllerGetByUserIdResponse:
        """获取用户的联系人列表"""
        return self._client.get(f"/im/v3/contacts", params=params)

    def contact_controller_get_by_id(self, id: str) -> Contact:
        """获取联系人详情"""
        return self._client.get(f"/im/v3/contacts/{id}")

    def contact_controller_update(self, id: str, body: ContactControllerUpdateRequest) -> Contact:
        """更新联系人"""
        return self._client.put(f"/im/v3/contacts/{id}", json=body)

    def contact_controller_delete(self, id: str) -> None:
        """删除联系人"""
        return self._client.delete(f"/im/v3/contacts/{id}")

    def contact_controller_batch_delete(self) -> None:
        """批量删除联系人"""
        return self._client.delete(f"/im/v3/contacts/batch")

    def contact_controller_set_favorite(self, id: str, body: ContactControllerSetFavoriteRequest) -> None:
        """设置/取消收藏"""
        return self._client.put(f"/im/v3/contacts/{id}/favorite", json=body)

    def contact_controller_set_remark(self, id: str, body: ContactControllerSetRemarkRequest) -> None:
        """设置备注"""
        return self._client.put(f"/im/v3/contacts/{id}/remark", json=body)

    def contact_controller_add_tag(self, id: str, body: ContactControllerAddTagRequest) -> None:
        """添加标签"""
        return self._client.post(f"/im/v3/contacts/{id}/tags", json=body)

    def contact_controller_remove_tag(self, id: str, tag: str) -> None:
        """移除标签"""
        return self._client.delete(f"/im/v3/contacts/{id}/tags/{tag}")

    def contact_controller_search(self, userId: str, params: Optional[Dict[str, Any]] = None) -> ContactControllerSearchResponse:
        """搜索联系人"""
        return self._client.get(f"/im/v3/contacts/search/{userId}", params=params)

    def contact_controller_get_stats(self, userId: str) -> None:
        """获取联系人统计"""
        return self._client.get(f"/im/v3/contacts/stats/{userId}")
