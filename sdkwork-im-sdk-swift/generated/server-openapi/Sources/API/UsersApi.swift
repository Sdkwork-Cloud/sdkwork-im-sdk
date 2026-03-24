import Foundation

public class UsersApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// 获取当前用户信息
    public func userControllerGetCurrent() async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/users/me"))
    }

    /// 获取用户详情
    public func userControllerGetById(id: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/users/\(id)"))
    }

    /// 更新用户资料
    public func userControllerUpdate(id: String, body: UpdateProfileDto) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/users/\(id)"), body: body)
    }

    /// 搜索用户
    public func userControllerSearch(params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/users"), params: params)
    }
}
