import Foundation

public class TimelineApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// Create a timeline post
    public func controllerCreatePost(body: CreateTimelinePostDto) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/timeline/posts"), body: body)
    }

    /// Get timeline feed
    public func controllerGetFeed(params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/timeline/feed"), params: params)
    }

    /// Get timeline post detail
    public func controllerGetPost(postId: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/timeline/posts/\(postId)"))
    }

    /// Delete own timeline post
    public func controllerDeletePost(postId: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/timeline/posts/\(postId)"))
    }

    /// Get user timeline posts
    public func controllerGetUserPosts(userId: String, params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/timeline/users/\(userId)/posts"), params: params)
    }

    /// Like or unlike timeline post
    public func controllerToggleLike(postId: String, body: ToggleTimelineLikeDto) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/timeline/posts/\(postId)/likes"), body: body)
    }
}
