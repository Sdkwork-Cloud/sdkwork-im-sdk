import Foundation

public class AgentApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// Create a new agent
    public func controllerCreate(body: CreateAgent) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/agents"), body: body)
    }

    /// Get all agents for current user
    public func getControllerGet(params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents"), params: params)
    }

    /// Get agent by ID
    public func getControllerGetAgents(id: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/\(id)"))
    }

    /// Update agent
    public func controllerUpdate(id: String, body: UpdateAgent) async throws -> Void {
        _ = try await client.put(ApiPaths.backendPath("/agents/\(id)"), body: body)
    }

    /// Delete agent
    public func controllerDelete(id: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/agents/\(id)"))
    }

    /// Create a new chat session
    public func controllerCreateSession(id: String, body: CreateSession) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/agents/\(id)/sessions"), body: body)
    }

    /// Get sessions for agent
    public func controllerGetSessions(id: String, params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/\(id)/sessions"), params: params)
    }

    /// Get session by ID
    public func controllerGetSession(sessionId: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/sessions/\(sessionId)"))
    }

    /// Delete session
    public func controllerDeleteSession(sessionId: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/agents/sessions/\(sessionId)"))
    }

    /// Get messages for session
    public func controllerGetMessages(sessionId: String, params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/sessions/\(sessionId)/messages"), params: params)
    }

    /// Send a message to agent
    public func controllerSendMessage(sessionId: String, body: SendAgentMessage) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/agents/sessions/\(sessionId)/messages"), body: body)
    }

    /// Stream message from agent
    public func controllerStreamMessage(sessionId: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/sessions/\(sessionId)/stream"))
    }

    /// Get tools for agent
    public func controllerGetTools(id: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/\(id)/tools"))
    }

    /// Add tool to agent
    public func controllerAddToolTo(id: String, body: AddTool) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/agents/\(id)/tools"), body: body)
    }

    /// Get skills for agent
    public func controllerGetSkills(id: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/\(id)/skills"))
    }

    /// Add skill to agent
    public func controllerAddSkillTo(id: String, body: AddSkill) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/agents/\(id)/skills"), body: body)
    }

    /// Get all available tools
    public func controllerGetAvailableTools() async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/tools/available"))
    }

    /// Get all available skills
    public func controllerGetAvailableSkills() async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/skills/available"))
    }

    /// Start agent runtime
    public func controllerStart(id: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/agents/\(id)/start"), body: nil)
    }

    /// Stop agent runtime
    public func controllerStop(id: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/agents/\(id)/stop"), body: nil)
    }

    /// Reset agent
    public func controllerReset(id: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/agents/\(id)/reset"), body: nil)
    }
}
