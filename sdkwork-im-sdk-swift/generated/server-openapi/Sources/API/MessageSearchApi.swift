import Foundation

public class MessageSearchApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// 搜索消息
    public func controller(params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/messages/search"), params: params)
    }

    /// 快速搜索
    public func controllerQuick(params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/messages/search/quick"), params: params)
    }

    /// 搜索会话消息
    public func controllerInConversation(params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/messages/search/conversation"), params: params)
    }

    /// 消息统计
    public func controllerGetStats(params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/messages/search/stats"), params: params)
    }
}
