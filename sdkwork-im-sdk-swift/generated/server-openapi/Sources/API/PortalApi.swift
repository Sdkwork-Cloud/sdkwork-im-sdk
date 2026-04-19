import Foundation

public class PortalApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// Read the tenant portal home snapshot
    public func getHome() async throws -> [String: Any]? {
        return try await client.get(ApiPaths.apiPath("/portal/home"), responseType: [String: Any].self)
    }

    /// Read the tenant portal sign-in snapshot
    public func getAuth() async throws -> [String: Any]? {
        return try await client.get(ApiPaths.apiPath("/portal/auth"), responseType: [String: Any].self)
    }

    /// Read the current tenant workspace snapshot
    public func getWorkspace() async throws -> PortalWorkspaceView? {
        return try await client.get(ApiPaths.apiPath("/portal/workspace"), responseType: PortalWorkspaceView.self)
    }

    /// Read the tenant dashboard snapshot
    public func getDashboard() async throws -> [String: Any]? {
        return try await client.get(ApiPaths.apiPath("/portal/dashboard"), responseType: [String: Any].self)
    }

    /// Read the tenant conversations snapshot
    public func getConversations() async throws -> [String: Any]? {
        return try await client.get(ApiPaths.apiPath("/portal/conversations"), responseType: [String: Any].self)
    }

    /// Read the tenant realtime snapshot
    public func getRealtime() async throws -> [String: Any]? {
        return try await client.get(ApiPaths.apiPath("/portal/realtime"), responseType: [String: Any].self)
    }

    /// Read the tenant media snapshot
    public func getMedia() async throws -> [String: Any]? {
        return try await client.get(ApiPaths.apiPath("/portal/media"), responseType: [String: Any].self)
    }

    /// Read the tenant automation snapshot
    public func getAutomation() async throws -> [String: Any]? {
        return try await client.get(ApiPaths.apiPath("/portal/automation"), responseType: [String: Any].self)
    }

    /// Read the tenant governance snapshot
    public func getGovernance() async throws -> [String: Any]? {
        return try await client.get(ApiPaths.apiPath("/portal/governance"), responseType: [String: Any].self)
    }
}
