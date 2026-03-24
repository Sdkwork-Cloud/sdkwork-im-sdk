package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class FriendsApi(private val client: HttpClient) {

    /** Send friend request */
    suspend fun friendControllerSendRequest(body: SendFriendRequestDto): FriendControllerSendRequestResponse? {
        return client.post(ApiPaths.backendPath("/friends/request"), body) as? FriendControllerSendRequestResponse
    }

    /** Accept friend request */
    suspend fun friendControllerAcceptRequest(id: String): FriendControllerAcceptRequestResponse? {
        return client.post(ApiPaths.backendPath("/friends/request/$id/accept"), null) as? FriendControllerAcceptRequestResponse
    }

    /** Reject friend request */
    suspend fun friendControllerRejectRequest(id: String): FriendControllerRejectRequestResponse? {
        return client.post(ApiPaths.backendPath("/friends/request/$id/reject"), null) as? FriendControllerRejectRequestResponse
    }

    /** Cancel friend request */
    suspend fun friendControllerCancelRequest(id: String): FriendControllerCancelRequestResponse? {
        return client.delete(ApiPaths.backendPath("/friends/request/$id")) as? FriendControllerCancelRequestResponse
    }

    /** Remove friend */
    suspend fun friendControllerRemove(friendId: String): FriendControllerRemoveResponse? {
        return client.delete(ApiPaths.backendPath("/friends/$friendId")) as? FriendControllerRemoveResponse
    }

    /** Get friend requests */
    suspend fun friendControllerGetRequests(params: Map<String, Any>? = null): FriendControllerGetRequestsResponse? {
        return client.get(ApiPaths.backendPath("/friends/requests"), params) as? FriendControllerGetRequestsResponse
    }

    /** Get sent friend requests */
    suspend fun friendControllerGetSentRequests(): FriendControllerGetSentRequestsResponse? {
        return client.get(ApiPaths.backendPath("/friends/requests/sent")) as? FriendControllerGetSentRequestsResponse
    }

    /** Get friends list */
    suspend fun friendControllerGet(): FriendControllerGetResponse? {
        return client.get(ApiPaths.backendPath("/friends")) as? FriendControllerGetResponse
    }

    /** Check friendship status */
    suspend fun friendControllerCheckFriendship(friendId: String): FriendControllerCheckFriendshipResponse? {
        return client.get(ApiPaths.backendPath("/friends/$friendId/check")) as? FriendControllerCheckFriendshipResponse
    }

    /** Block friend */
    suspend fun friendControllerBlock(friendId: String): FriendControllerBlockResponse? {
        return client.post(ApiPaths.backendPath("/friends/$friendId/block"), null) as? FriendControllerBlockResponse
    }

    /** Unblock friend */
    suspend fun friendControllerUnblock(friendId: String): FriendControllerUnblockResponse? {
        return client.post(ApiPaths.backendPath("/friends/$friendId/unblock"), null) as? FriendControllerUnblockResponse
    }

    /** Check if blocked */
    suspend fun friendControllerCheckBlocked(friendId: String): FriendControllerCheckBlockedResponse? {
        return client.get(ApiPaths.backendPath("/friends/$friendId/blocked")) as? FriendControllerCheckBlockedResponse
    }
}
