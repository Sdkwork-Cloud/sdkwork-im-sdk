from typing import Any, Dict, List, Optional
from ..http_client import HttpClient
from ..models import CreateTimelinePostDto, ToggleTimelineLikeDto

class TimelineApi:
    """timeline API client."""
    
    def __init__(self, client: HttpClient):
        self._client = client

    def controller_create_post(self, body: CreateTimelinePostDto) -> None:
        """Create a timeline post"""
        return self._client.post(f"/im/v3/timeline/posts", json=body)

    def controller_get_feed(self, params: Optional[Dict[str, Any]] = None) -> None:
        """Get timeline feed"""
        return self._client.get(f"/im/v3/timeline/feed", params=params)

    def controller_get_post(self, postId: str) -> None:
        """Get timeline post detail"""
        return self._client.get(f"/im/v3/timeline/posts/{postId}")

    def controller_delete_post(self, postId: str) -> None:
        """Delete own timeline post"""
        return self._client.delete(f"/im/v3/timeline/posts/{postId}")

    def controller_get_user_posts(self, userId: str, params: Optional[Dict[str, Any]] = None) -> None:
        """Get user timeline posts"""
        return self._client.get(f"/im/v3/timeline/users/{userId}/posts", params=params)

    def controller_toggle_like(self, postId: str, body: ToggleTimelineLikeDto) -> None:
        """Like or unlike timeline post"""
        return self._client.post(f"/im/v3/timeline/posts/{postId}/likes", json=body)
