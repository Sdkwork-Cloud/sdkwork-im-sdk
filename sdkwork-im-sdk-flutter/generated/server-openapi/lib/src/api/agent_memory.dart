import '../http/client.dart';
import '../models.dart';
import 'paths.dart';

class AgentMemoryApi {
  final HttpClient _client;
  
  AgentMemoryApi(this._client);

  /// Get memories for agent
  Future<dynamic> memoryControllerGetMemories(String agentId, Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/agents/${agentId}/memory'), params: params);
  }

  /// Store a memory
  Future<dynamic> memoryControllerStore(String agentId, StoreMemoryDto body) async {
    return await _client.post(ApiPaths.backendPath('/agents/${agentId}/memory'), body: body, contentType: 'application/json');
  }

  /// Search memories
  Future<dynamic> memoryControllerSearchMemories(String agentId, Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/agents/${agentId}/memory/search'), params: params);
  }

  /// Semantic search memories
  Future<dynamic> memoryControllerSemanticSearch(String agentId, Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/agents/${agentId}/memory/semantic-search'), params: params);
  }

  /// Get memory statistics
  Future<dynamic> memoryControllerGetStats(String agentId) async {
    return await _client.get(ApiPaths.backendPath('/agents/${agentId}/memory/stats'));
  }

  /// Get conversation history
  Future<dynamic> memoryControllerGetHistory(String agentId, String sessionId, Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/agents/${agentId}/memory/sessions/${sessionId}/history'), params: params);
  }

  /// Summarize session
  Future<dynamic> memoryControllerSummarizeSession(String agentId, String sessionId) async {
    return await _client.post(ApiPaths.backendPath('/agents/${agentId}/memory/sessions/${sessionId}/summarize'));
  }

  /// Delete a memory
  Future<dynamic> memoryControllerDelete(String agentId, String memoryId) async {
    return await _client.delete(ApiPaths.backendPath('/agents/${agentId}/memory/${memoryId}'));
  }

  /// Clear session memories
  Future<dynamic> memoryControllerClearSession(String agentId, String sessionId) async {
    return await _client.delete(ApiPaths.backendPath('/agents/${agentId}/memory/sessions/${sessionId}'));
  }

  /// Consolidate memories
  Future<dynamic> memoryControllerConsolidate(String agentId) async {
    return await _client.post(ApiPaths.backendPath('/agents/${agentId}/memory/consolidate'));
  }

  /// Get knowledge documents
  Future<dynamic> memoryControllerGetKnowledgeDocuments(String agentId) async {
    return await _client.get(ApiPaths.backendPath('/agents/${agentId}/memory/knowledge'));
  }

  /// Add knowledge document
  Future<dynamic> memoryControllerAddKnowledgeDocument(String agentId, AddKnowledgeDocumentDto body) async {
    return await _client.post(ApiPaths.backendPath('/agents/${agentId}/memory/knowledge'), body: body, contentType: 'application/json');
  }

  /// Search knowledge
  Future<dynamic> memoryControllerSearchKnowledge(String agentId, Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/agents/${agentId}/memory/knowledge/search'), params: params);
  }

  /// Get knowledge statistics
  Future<dynamic> memoryControllerGetKnowledgeStats(String agentId) async {
    return await _client.get(ApiPaths.backendPath('/agents/${agentId}/memory/knowledge/stats'));
  }

  /// Get knowledge document
  Future<dynamic> memoryControllerGetKnowledgeDocument(String agentId, String documentId) async {
    return await _client.get(ApiPaths.backendPath('/agents/${agentId}/memory/knowledge/${documentId}'));
  }

  /// Delete knowledge document
  Future<dynamic> memoryControllerDeleteKnowledgeDocument(String agentId, String documentId) async {
    return await _client.delete(ApiPaths.backendPath('/agents/${agentId}/memory/knowledge/${documentId}'));
  }

  /// Get document chunks
  Future<dynamic> memoryControllerGetDocumentChunks(String agentId, String documentId) async {
    return await _client.get(ApiPaths.backendPath('/agents/${agentId}/memory/knowledge/${documentId}/chunks'));
  }
}
