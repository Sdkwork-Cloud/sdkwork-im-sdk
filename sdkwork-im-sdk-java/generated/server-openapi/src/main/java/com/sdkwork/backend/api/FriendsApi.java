package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class FriendsApi {
    private final HttpClient client;
    
    public FriendsApi(HttpClient client) {
        this.client = client;
    }

    /** Send friend request */
    public FriendControllerSendRequestResponse friendControllerSendRequest(SendFriendRequestDto body) throws Exception {
        return (FriendControllerSendRequestResponse) client.post(ApiPaths.backendPath("/friends/request"), body);
    }

    /** Accept friend request */
    public FriendControllerAcceptRequestResponse friendControllerAcceptRequest(String id) throws Exception {
        return (FriendControllerAcceptRequestResponse) client.post(ApiPaths.backendPath("/friends/request/" + id + "/accept"), null);
    }

    /** Reject friend request */
    public FriendControllerRejectRequestResponse friendControllerRejectRequest(String id) throws Exception {
        return (FriendControllerRejectRequestResponse) client.post(ApiPaths.backendPath("/friends/request/" + id + "/reject"), null);
    }

    /** Cancel friend request */
    public FriendControllerCancelRequestResponse friendControllerCancelRequest(String id) throws Exception {
        return (FriendControllerCancelRequestResponse) client.delete(ApiPaths.backendPath("/friends/request/" + id + ""));
    }

    /** Remove friend */
    public FriendControllerRemoveResponse friendControllerRemove(String friendId) throws Exception {
        return (FriendControllerRemoveResponse) client.delete(ApiPaths.backendPath("/friends/" + friendId + ""));
    }

    /** Get friend requests */
    public FriendControllerGetRequestsResponse friendControllerGetRequests(Map<String, Object> params) throws Exception {
        return (FriendControllerGetRequestsResponse) client.get(ApiPaths.backendPath("/friends/requests"), params);
    }

    /** Get sent friend requests */
    public FriendControllerGetSentRequestsResponse friendControllerGetSentRequests() throws Exception {
        return (FriendControllerGetSentRequestsResponse) client.get(ApiPaths.backendPath("/friends/requests/sent"));
    }

    /** Get friends list */
    public FriendControllerGetResponse friendControllerGet() throws Exception {
        return (FriendControllerGetResponse) client.get(ApiPaths.backendPath("/friends"));
    }

    /** Check friendship status */
    public FriendControllerCheckFriendshipResponse friendControllerCheckFriendship(String friendId) throws Exception {
        return (FriendControllerCheckFriendshipResponse) client.get(ApiPaths.backendPath("/friends/" + friendId + "/check"));
    }

    /** Block friend */
    public FriendControllerBlockResponse friendControllerBlock(String friendId) throws Exception {
        return (FriendControllerBlockResponse) client.post(ApiPaths.backendPath("/friends/" + friendId + "/block"), null);
    }

    /** Unblock friend */
    public FriendControllerUnblockResponse friendControllerUnblock(String friendId) throws Exception {
        return (FriendControllerUnblockResponse) client.post(ApiPaths.backendPath("/friends/" + friendId + "/unblock"), null);
    }

    /** Check if blocked */
    public FriendControllerCheckBlockedResponse friendControllerCheckBlocked(String friendId) throws Exception {
        return (FriendControllerCheckBlockedResponse) client.get(ApiPaths.backendPath("/friends/" + friendId + "/blocked"));
    }
}
