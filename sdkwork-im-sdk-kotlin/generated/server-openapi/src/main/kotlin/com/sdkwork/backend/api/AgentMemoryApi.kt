package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class AgentMemoryApi(private val client: HttpClient) {

    /** Get memories for agent */
    suspend fun memoryControllerGetMemories(agentId: String, params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/agents/$agentId/memory"), params)
    }

    /** Store a memory */
    suspend fun memoryControllerStore(agentId: String, body: StoreMemoryDto): Unit {
        client.post(ApiPaths.backendPath("/agents/$agentId/memory"), body)
    }

    /** Search memories */
    suspend fun memoryControllerSearchMemories(agentId: String, params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/agents/$agentId/memory/search"), params)
    }

    /** Semantic search memories */
    suspend fun memoryControllerSemanticSearch(agentId: String, params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/agents/$agentId/memory/semantic-search"), params)
    }

    /** Get memory statistics */
    suspend fun memoryControllerGetStats(agentId: String): Unit {
        client.get(ApiPaths.backendPath("/agents/$agentId/memory/stats"))
    }

    /** Get conversation history */
    suspend fun memoryControllerGetHistory(agentId: String, sessionId: String, params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/agents/$agentId/memory/sessions/$sessionId/history"), params)
    }

    /** Summarize session */
    suspend fun memoryControllerSummarizeSession(agentId: String, sessionId: String): Unit {
        client.post(ApiPaths.backendPath("/agents/$agentId/memory/sessions/$sessionId/summarize"), null)
    }

    /** Delete a memory */
    suspend fun memoryControllerDelete(agentId: String, memoryId: String): Unit {
        client.delete(ApiPaths.backendPath("/agents/$agentId/memory/$memoryId"))
    }

    /** Clear session memories */
    suspend fun memoryControllerClearSession(agentId: String, sessionId: String): Unit {
        client.delete(ApiPaths.backendPath("/agents/$agentId/memory/sessions/$sessionId"))
    }

    /** Consolidate memories */
    suspend fun memoryControllerConsolidate(agentId: String): Unit {
        client.post(ApiPaths.backendPath("/agents/$agentId/memory/consolidate"), null)
    }

    /** Get knowledge documents */
    suspend fun memoryControllerGetKnowledgeDocuments(agentId: String): Unit {
        client.get(ApiPaths.backendPath("/agents/$agentId/memory/knowledge"))
    }

    /** Add knowledge document */
    suspend fun memoryControllerAddKnowledgeDocument(agentId: String, body: AddKnowledgeDocumentDto): Unit {
        client.post(ApiPaths.backendPath("/agents/$agentId/memory/knowledge"), body)
    }

    /** Search knowledge */
    suspend fun memoryControllerSearchKnowledge(agentId: String, params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/agents/$agentId/memory/knowledge/search"), params)
    }

    /** Get knowledge statistics */
    suspend fun memoryControllerGetKnowledgeStats(agentId: String): Unit {
        client.get(ApiPaths.backendPath("/agents/$agentId/memory/knowledge/stats"))
    }

    /** Get knowledge document */
    suspend fun memoryControllerGetKnowledgeDocument(agentId: String, documentId: String): Unit {
        client.get(ApiPaths.backendPath("/agents/$agentId/memory/knowledge/$documentId"))
    }

    /** Delete knowledge document */
    suspend fun memoryControllerDeleteKnowledgeDocument(agentId: String, documentId: String): Unit {
        client.delete(ApiPaths.backendPath("/agents/$agentId/memory/knowledge/$documentId"))
    }

    /** Get document chunks */
    suspend fun memoryControllerGetDocumentChunks(agentId: String, documentId: String): Unit {
        client.get(ApiPaths.backendPath("/agents/$agentId/memory/knowledge/$documentId/chunks"))
    }
}
