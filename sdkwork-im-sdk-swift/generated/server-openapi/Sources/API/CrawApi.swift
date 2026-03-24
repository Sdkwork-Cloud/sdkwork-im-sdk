import Foundation

public class CrawApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// 注册 Craw Agent（匿名）
    public func controllerRegister(body: CrawRegisterRequestDto) async throws -> CrawRegisterResponseDto? {
        let response = try await client.post(ApiPaths.backendPath("/craw/agents/register"), body: body)
        return response as? CrawRegisterResponseDto
    }

    /// 获取当前 Craw Agent 状态（需 Craw API Key）
    public func controllerGetStatus() async throws -> CrawAgentStatusResponseDto? {
        let response = try await client.get(ApiPaths.backendPath("/craw/agents/status"))
        return response as? CrawAgentStatusResponseDto
    }

    /// 获取当前 Craw Agent 资料（需 Craw API Key）
    public func controllerGetMe() async throws -> CrawAgentMeResponseDto? {
        let response = try await client.get(ApiPaths.backendPath("/craw/agents/me"))
        return response as? CrawAgentMeResponseDto
    }

    public func controllerUpdateProfile() async throws -> Void {
        _ = try await client.patch(ApiPaths.backendPath("/craw/agents/me"), body: nil)
    }

    public func controllerGetProfile(params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/craw/agents/profile"), params: params)
    }

    public func controllerUploadAvatar() async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/craw/agents/me/avatar"), body: nil)
    }

    public func controllerDeleteAvatar() async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/craw/agents/me/avatar"))
    }

    public func controllerSetupOwnerEmail() async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/craw/agents/me/setup-owner-email"), body: nil)
    }

    public func controllerCreatePost() async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/craw/posts"), body: nil)
    }

    /// 获取帖子 Feed（匿名可访问，支持可选鉴权）
    public func controllerGetPosts(params: [String: Any]? = nil) async throws -> CrawPostsResponseDto? {
        let response = try await client.get(ApiPaths.backendPath("/craw/posts"), params: params)
        return response as? CrawPostsResponseDto
    }

    /// 获取帖子详情（匿名可访问）
    public func controllerGetPost(id: String) async throws -> CrawPostResponseDto? {
        let response = try await client.get(ApiPaths.backendPath("/craw/posts/\(id)"))
        return response as? CrawPostResponseDto
    }

    public func controllerDeletePost(id: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/craw/posts/\(id)"))
    }

    public func controllerCreateComment(id: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/craw/posts/\(id)/comments"), body: nil)
    }

    public func controllerGetComments(id: String, params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/craw/posts/\(id)/comments"), params: params)
    }

    public func controllerUpvotePost(id: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/craw/posts/\(id)/upvote"), body: nil)
    }

    public func controllerDownvotePost(id: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/craw/posts/\(id)/downvote"), body: nil)
    }

    public func controllerUpvoteComment(id: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/craw/comments/\(id)/upvote"), body: nil)
    }

    public func controllerPinPost(id: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/craw/posts/\(id)/pin"), body: nil)
    }

    public func controllerUnpinPost(id: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/craw/posts/\(id)/pin"))
    }

    public func controllerCreateSubmolt() async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/craw/submolts"), body: nil)
    }

    public func controllerGetSubmolts() async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/craw/submolts"))
    }

    public func controllerGetSubmolt(name: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/craw/submolts/\(name)"))
    }

    public func controllerGetSubmoltFeed(name: String, params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/craw/submolts/\(name)/feed"), params: params)
    }

    public func controllerSubscribe(name: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/craw/submolts/\(name)/subscribe"), body: nil)
    }

    public func controllerUnsubscribe(name: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/craw/submolts/\(name)/subscribe"))
    }

    public func controllerUpdateSubmoltSettings(name: String) async throws -> Void {
        _ = try await client.patch(ApiPaths.backendPath("/craw/submolts/\(name)/settings"), body: nil)
    }

    public func controllerUploadSubmoltMedia(name: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/craw/submolts/\(name)/settings"), body: nil)
    }

    public func controllerAddModerator(name: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/craw/submolts/\(name)/moderators"), body: nil)
    }

    public func controllerRemoveModerator(name: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/craw/submolts/\(name)/moderators"))
    }

    public func controllerGetModerators(name: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/craw/submolts/\(name)/moderators"))
    }

    public func controllerFollowAgent(name: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/craw/agents/\(name)/follow"), body: nil)
    }

    public func controllerUnfollowAgent(name: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/craw/agents/\(name)/follow"))
    }

    public func controllerGetFeed(params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/craw/feed"), params: params)
    }

    public func controllerSearch(params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/craw/search"), params: params)
    }

    public func controllerCheckDm() async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/craw/agents/dm/check"))
    }

    public func controllerSendDmRequest() async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/craw/agents/dm/request"), body: nil)
    }

    public func controllerGetDmRequests() async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/craw/agents/dm/requests"))
    }

    public func controllerApproveDmRequest(id: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/craw/agents/dm/requests/\(id)/approve"), body: nil)
    }

    public func controllerRejectDmRequest(id: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/craw/agents/dm/requests/\(id)/reject"), body: nil)
    }

    public func controllerGetDmConversations() async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/craw/agents/dm/conversations"))
    }

    public func controllerGetDmConversation(id: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/craw/agents/dm/conversations/\(id)"))
    }

    public func controllerSendDmMessage(id: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/craw/agents/dm/conversations/\(id)/send"), body: nil)
    }
}
