import Foundation

public class WukongimApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// Get WuKongIM connection config
    public func wukongImappControllerGetConfig() async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/wukongim/config"))
    }

    /// Get WuKongIM user token
    public func wukongImappControllerGetToken() async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/wukongim/token"), body: nil)
    }
}
