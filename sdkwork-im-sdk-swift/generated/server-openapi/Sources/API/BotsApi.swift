import Foundation

public class BotsApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// 创建 Bot
    public func botControllerCreate(body: CreateBotDto) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/bots"), body: body)
    }

    /// 获取 Bot 列表
    public func botControllerGet(params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/bots"), params: params)
    }

    /// 获取 Bot 详情
    public func botControllerGetById(id: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/bots/\(id)"))
    }

    /// 更新 Bot
    public func botControllerUpdate(id: String, body: UpdateBotDto) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/bots/\(id)"), body: body)
    }

    /// 删除 Bot
    public func botControllerDelete(id: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/bots/\(id)"))
    }

    /// 重新生成 Bot Token
    public func botControllerRegenerateToken(id: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/bots/\(id)/regenerate-token"), body: nil)
    }

    /// 设置 Webhook
    public func botControllerSetWebhook(id: String, body: SetWebhookDto) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/bots/\(id)/webhook"), body: body)
    }

    /// 删除 Webhook
    public func botControllerDeleteWebhook(id: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/bots/\(id)/webhook"))
    }
}
