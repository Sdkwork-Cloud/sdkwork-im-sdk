import Foundation

public class AgentMemoryApi {
    private let client: HttpClient
    
    public init(client: HttpClient) {
        self.client = client
    }

    /// Get memories for agent
    public func memoryControllerGetMemories(agentId: String, params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/\(agentId)/memory"), params: params)
    }

    /// Store a memory
    public func memoryControllerStore(agentId: String, body: StoreMemoryDto) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/agents/\(agentId)/memory"), body: body)
    }

    /// Search memories
    public func memoryControllerSearchMemories(agentId: String, params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/\(agentId)/memory/search"), params: params)
    }

    /// Semantic search memories
    public func memoryControllerSemanticSearch(agentId: String, params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/\(agentId)/memory/semantic-search"), params: params)
    }

    /// Get memory statistics
    public func memoryControllerGetStats(agentId: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/\(agentId)/memory/stats"))
    }

    /// Get conversation history
    public func memoryControllerGetHistory(agentId: String, sessionId: String, params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/\(agentId)/memory/sessions/\(sessionId)/history"), params: params)
    }

    /// Summarize session
    public func memoryControllerSummarizeSession(agentId: String, sessionId: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/agents/\(agentId)/memory/sessions/\(sessionId)/summarize"), body: nil)
    }

    /// Delete a memory
    public func memoryControllerDelete(agentId: String, memoryId: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/agents/\(agentId)/memory/\(memoryId)"))
    }

    /// Clear session memories
    public func memoryControllerClearSession(agentId: String, sessionId: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/agents/\(agentId)/memory/sessions/\(sessionId)"))
    }

    /// Consolidate memories
    public func memoryControllerConsolidate(agentId: String) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/agents/\(agentId)/memory/consolidate"), body: nil)
    }

    /// Get knowledge documents
    public func memoryControllerGetKnowledgeDocuments(agentId: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/\(agentId)/memory/knowledge"))
    }

    /// Add knowledge document
    public func memoryControllerAddKnowledgeDocument(agentId: String, body: AddKnowledgeDocumentDto) async throws -> Void {
        _ = try await client.post(ApiPaths.backendPath("/agents/\(agentId)/memory/knowledge"), body: body)
    }

    /// Search knowledge
    public func memoryControllerSearchKnowledge(agentId: String, params: [String: Any]? = nil) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/\(agentId)/memory/knowledge/search"), params: params)
    }

    /// Get knowledge statistics
    public func memoryControllerGetKnowledgeStats(agentId: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/\(agentId)/memory/knowledge/stats"))
    }

    /// Get knowledge document
    public func memoryControllerGetKnowledgeDocument(agentId: String, documentId: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/\(agentId)/memory/knowledge/\(documentId)"))
    }

    /// Delete knowledge document
    public func memoryControllerDeleteKnowledgeDocument(agentId: String, documentId: String) async throws -> Void {
        _ = try await client.delete(ApiPaths.backendPath("/agents/\(agentId)/memory/knowledge/\(documentId)"))
    }

    /// Get document chunks
    public func memoryControllerGetDocumentChunks(agentId: String, documentId: String) async throws -> Void {
        _ = try await client.get(ApiPaths.backendPath("/agents/\(agentId)/memory/knowledge/\(documentId)/chunks"))
    }
}
