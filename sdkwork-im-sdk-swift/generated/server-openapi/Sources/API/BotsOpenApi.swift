import Foundation

public class BotsOpenApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// 获取当前 Bot 信息（Bot Token）
    public func botOpenControllerGetCurrent() async throws -> BotOpenProfileResponseDto? {
        let response = try await client.get(ApiPaths.backendPath("/bots/open/me"))
        return response as? BotOpenProfileResponseDto
    }

    /// 获取当前 Bot 的 Webhook 统计（Bot Token）
    public func botOpenControllerGetWebhookStats() async throws -> BotOpenWebhookStatsResponseDto? {
        let response = try await client.get(ApiPaths.backendPath("/bots/open/webhook/stats"))
        return response as? BotOpenWebhookStatsResponseDto
    }

    /// 触发当前 Bot 的 Webhook 测试事件（Bot Token）
    public func botOpenControllerSendWebhookTestEvent(body: BotOpenWebhookTestEventRequestDto) async throws -> BotOpenWebhookResultResponseDto? {
        let response = try await client.post(ApiPaths.backendPath("/bots/open/webhook/test-event"), body: body)
        return response as? BotOpenWebhookResultResponseDto
    }
}
