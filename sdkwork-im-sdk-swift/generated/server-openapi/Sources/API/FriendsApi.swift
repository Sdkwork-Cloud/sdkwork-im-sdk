import Foundation

public class FriendsApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// Send friend request
    public func friendControllerSendRequest(body: SendFriendRequestDto) async throws -> FriendControllerSendRequestResponse? {
        let response = try await client.post(ApiPaths.backendPath("/friends/request"), body: body)
        return response as? FriendControllerSendRequestResponse
    }

    /// Accept friend request
    public func friendControllerAcceptRequest(id: String) async throws -> FriendControllerAcceptRequestResponse? {
        let response = try await client.post(ApiPaths.backendPath("/friends/request/\(id)/accept"), body: nil)
        return response as? FriendControllerAcceptRequestResponse
    }

    /// Reject friend request
    public func friendControllerRejectRequest(id: String) async throws -> FriendControllerRejectRequestResponse? {
        let response = try await client.post(ApiPaths.backendPath("/friends/request/\(id)/reject"), body: nil)
        return response as? FriendControllerRejectRequestResponse
    }

    /// Cancel friend request
    public func friendControllerCancelRequest(id: String) async throws -> FriendControllerCancelRequestResponse? {
        let response = try await client.delete(ApiPaths.backendPath("/friends/request/\(id)"))
        return response as? FriendControllerCancelRequestResponse
    }

    /// Remove friend
    public func friendControllerRemove(friendId: String) async throws -> FriendControllerRemoveResponse? {
        let response = try await client.delete(ApiPaths.backendPath("/friends/\(friendId)"))
        return response as? FriendControllerRemoveResponse
    }

    /// Get friend requests
    public func friendControllerGetRequests(params: [String: Any]? = nil) async throws -> FriendControllerGetRequestsResponse? {
        let response = try await client.get(ApiPaths.backendPath("/friends/requests"), params: params)
        return response as? FriendControllerGetRequestsResponse
    }

    /// Get sent friend requests
    public func friendControllerGetSentRequests() async throws -> FriendControllerGetSentRequestsResponse? {
        let response = try await client.get(ApiPaths.backendPath("/friends/requests/sent"))
        return response as? FriendControllerGetSentRequestsResponse
    }

    /// Get friends list
    public func friendControllerGet() async throws -> FriendControllerGetResponse? {
        let response = try await client.get(ApiPaths.backendPath("/friends"))
        return response as? FriendControllerGetResponse
    }

    /// Check friendship status
    public func friendControllerCheckFriendship(friendId: String) async throws -> FriendControllerCheckFriendshipResponse? {
        let response = try await client.get(ApiPaths.backendPath("/friends/\(friendId)/check"))
        return response as? FriendControllerCheckFriendshipResponse
    }

    /// Block friend
    public func friendControllerBlock(friendId: String) async throws -> FriendControllerBlockResponse? {
        let response = try await client.post(ApiPaths.backendPath("/friends/\(friendId)/block"), body: nil)
        return response as? FriendControllerBlockResponse
    }

    /// Unblock friend
    public func friendControllerUnblock(friendId: String) async throws -> FriendControllerUnblockResponse? {
        let response = try await client.post(ApiPaths.backendPath("/friends/\(friendId)/unblock"), body: nil)
        return response as? FriendControllerUnblockResponse
    }

    /// Check if blocked
    public func friendControllerCheckBlocked(friendId: String) async throws -> FriendControllerCheckBlockedResponse? {
        let response = try await client.get(ApiPaths.backendPath("/friends/\(friendId)/blocked"))
        return response as? FriendControllerCheckBlockedResponse
    }
}
