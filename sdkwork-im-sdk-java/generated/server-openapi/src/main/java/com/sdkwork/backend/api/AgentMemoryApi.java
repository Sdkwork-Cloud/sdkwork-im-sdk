package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class AgentMemoryApi {
    private final HttpClient client;
    
    public AgentMemoryApi(HttpClient client) {
        this.client = client;
    }

    /** Get memories for agent */
    public Void memoryControllerGetMemories(String agentId, Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/agents/" + agentId + "/memory"), params);
        return null;
    }

    /** Store a memory */
    public Void memoryControllerStore(String agentId, StoreMemoryDto body) throws Exception {
        client.post(ApiPaths.backendPath("/agents/" + agentId + "/memory"), body);
        return null;
    }

    /** Search memories */
    public Void memoryControllerSearchMemories(String agentId, Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/agents/" + agentId + "/memory/search"), params);
        return null;
    }

    /** Semantic search memories */
    public Void memoryControllerSemanticSearch(String agentId, Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/agents/" + agentId + "/memory/semantic-search"), params);
        return null;
    }

    /** Get memory statistics */
    public Void memoryControllerGetStats(String agentId) throws Exception {
        client.get(ApiPaths.backendPath("/agents/" + agentId + "/memory/stats"));
        return null;
    }

    /** Get conversation history */
    public Void memoryControllerGetHistory(String agentId, String sessionId, Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/agents/" + agentId + "/memory/sessions/" + sessionId + "/history"), params);
        return null;
    }

    /** Summarize session */
    public Void memoryControllerSummarizeSession(String agentId, String sessionId) throws Exception {
        client.post(ApiPaths.backendPath("/agents/" + agentId + "/memory/sessions/" + sessionId + "/summarize"), null);
        return null;
    }

    /** Delete a memory */
    public Void memoryControllerDelete(String agentId, String memoryId) throws Exception {
        client.delete(ApiPaths.backendPath("/agents/" + agentId + "/memory/" + memoryId + ""));
        return null;
    }

    /** Clear session memories */
    public Void memoryControllerClearSession(String agentId, String sessionId) throws Exception {
        client.delete(ApiPaths.backendPath("/agents/" + agentId + "/memory/sessions/" + sessionId + ""));
        return null;
    }

    /** Consolidate memories */
    public Void memoryControllerConsolidate(String agentId) throws Exception {
        client.post(ApiPaths.backendPath("/agents/" + agentId + "/memory/consolidate"), null);
        return null;
    }

    /** Get knowledge documents */
    public Void memoryControllerGetKnowledgeDocuments(String agentId) throws Exception {
        client.get(ApiPaths.backendPath("/agents/" + agentId + "/memory/knowledge"));
        return null;
    }

    /** Add knowledge document */
    public Void memoryControllerAddKnowledgeDocument(String agentId, AddKnowledgeDocumentDto body) throws Exception {
        client.post(ApiPaths.backendPath("/agents/" + agentId + "/memory/knowledge"), body);
        return null;
    }

    /** Search knowledge */
    public Void memoryControllerSearchKnowledge(String agentId, Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/agents/" + agentId + "/memory/knowledge/search"), params);
        return null;
    }

    /** Get knowledge statistics */
    public Void memoryControllerGetKnowledgeStats(String agentId) throws Exception {
        client.get(ApiPaths.backendPath("/agents/" + agentId + "/memory/knowledge/stats"));
        return null;
    }

    /** Get knowledge document */
    public Void memoryControllerGetKnowledgeDocument(String agentId, String documentId) throws Exception {
        client.get(ApiPaths.backendPath("/agents/" + agentId + "/memory/knowledge/" + documentId + ""));
        return null;
    }

    /** Delete knowledge document */
    public Void memoryControllerDeleteKnowledgeDocument(String agentId, String documentId) throws Exception {
        client.delete(ApiPaths.backendPath("/agents/" + agentId + "/memory/knowledge/" + documentId + ""));
        return null;
    }

    /** Get document chunks */
    public Void memoryControllerGetDocumentChunks(String agentId, String documentId) throws Exception {
        client.get(ApiPaths.backendPath("/agents/" + agentId + "/memory/knowledge/" + documentId + "/chunks"));
        return null;
    }
}
