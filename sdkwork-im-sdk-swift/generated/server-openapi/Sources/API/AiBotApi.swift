import Foundation

public class AiBotApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// Create a new AI Bot
    public func aibotControllerCreateBot(body: AibotControllerCreateBotRequest) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/ai-bots"), body: body)
    }

    /// Get all AI Bots
    public func aibotControllerGetBots() async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/ai-bots"))
    }

    /// Get an AI Bot by ID
    public func aibotControllerGetBot(id: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/ai-bots/\(id)"))
    }

    /// Update an AI Bot
    public func aibotControllerUpdateBot(id: String, body: AibotControllerUpdateBotRequest) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/ai-bots/\(id)"), body: body)
    }

    /// Delete an AI Bot
    public func aibotControllerDeleteBot(id: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/ai-bots/\(id)"))
    }

    /// Activate an AI Bot
    public func aibotControllerActivateBot(id: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/ai-bots/\(id)/activate"), body: nil)
    }

    /// Deactivate an AI Bot
    public func aibotControllerDeactivateBot(id: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/ai-bots/\(id)/deactivate"), body: nil)
    }

    /// Process a message with AI Bot
    public func aibotControllerProcessMessage(id: String, body: AibotControllerProcessMessageRequest) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/ai-bots/\(id)/messages"), body: body)
    }
}
