from typing import Any, Dict, List, Optional
from ..http_client import HttpClient
from ..models import FriendControllerAcceptRequestResponse, FriendControllerBlockResponse, FriendControllerCancelRequestResponse, FriendControllerCheckBlockedResponse, FriendControllerCheckFriendshipResponse, FriendControllerGetRequestsResponse, FriendControllerGetResponse, FriendControllerGetSentRequestsResponse, FriendControllerRejectRequestResponse, FriendControllerRemoveResponse, FriendControllerSendRequestResponse, FriendControllerUnblockResponse, SendFriendRequestDto

class FriendsApi:
    """friends API client."""
    
    def __init__(self, client: HttpClient):
        self._client = client

    def friend_controller_send_request(self, body: SendFriendRequestDto) -> FriendControllerSendRequestResponse:
        """Send friend request"""
        return self._client.post(f"/im/v3/friends/request", json=body)

    def friend_controller_accept_request(self, id: str) -> FriendControllerAcceptRequestResponse:
        """Accept friend request"""
        return self._client.post(f"/im/v3/friends/request/{id}/accept")

    def friend_controller_reject_request(self, id: str) -> FriendControllerRejectRequestResponse:
        """Reject friend request"""
        return self._client.post(f"/im/v3/friends/request/{id}/reject")

    def friend_controller_cancel_request(self, id: str) -> FriendControllerCancelRequestResponse:
        """Cancel friend request"""
        return self._client.delete(f"/im/v3/friends/request/{id}")

    def friend_controller_remove(self, friendId: str) -> FriendControllerRemoveResponse:
        """Remove friend"""
        return self._client.delete(f"/im/v3/friends/{friendId}")

    def friend_controller_get_requests(self, params: Optional[Dict[str, Any]] = None) -> FriendControllerGetRequestsResponse:
        """Get friend requests"""
        return self._client.get(f"/im/v3/friends/requests", params=params)

    def friend_controller_get_sent_requests(self) -> FriendControllerGetSentRequestsResponse:
        """Get sent friend requests"""
        return self._client.get(f"/im/v3/friends/requests/sent")

    def friend_controller_get(self) -> FriendControllerGetResponse:
        """Get friends list"""
        return self._client.get(f"/im/v3/friends")

    def friend_controller_check_friendship(self, friendId: str) -> FriendControllerCheckFriendshipResponse:
        """Check friendship status"""
        return self._client.get(f"/im/v3/friends/{friendId}/check")

    def friend_controller_block(self, friendId: str) -> FriendControllerBlockResponse:
        """Block friend"""
        return self._client.post(f"/im/v3/friends/{friendId}/block")

    def friend_controller_unblock(self, friendId: str) -> FriendControllerUnblockResponse:
        """Unblock friend"""
        return self._client.post(f"/im/v3/friends/{friendId}/unblock")

    def friend_controller_check_blocked(self, friendId: str) -> FriendControllerCheckBlockedResponse:
        """Check if blocked"""
        return self._client.get(f"/im/v3/friends/{friendId}/blocked")
