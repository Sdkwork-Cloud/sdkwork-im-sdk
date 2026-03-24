import Foundation

public class ThirdPartyApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// 发送第三方平台消息
    public func controllerSendMessage(platform: String, body: String) async throws -> ThirdPartyMessage? {
        let response = try await client.post(ApiPaths.backendPath("/third-party/\(platform)/messages"), body: body)
        return response as? ThirdPartyMessage
    }

    /// 获取第三方平台消息状态
    public func controllerGetMessageStatus(platform: String, id: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/third-party/\(platform)/messages/\(id)/status"))
    }

    /// 同步第三方平台联系人
    public func controllerSyncContacts(platform: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/third-party/\(platform)/contacts/sync"), body: nil)
    }

    /// 获取第三方平台联系人
    public func controllerGetContact(platform: String, params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/third-party/\(platform)/contacts"), params: params)
    }
}
