package api

import (
    "fmt"
    sdktypes "github.com/sdkwork/backend-sdk/types"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type AgentMemoryApi struct {
    client *sdkhttp.Client
}

func NewAgentMemoryApi(client *sdkhttp.Client) *AgentMemoryApi {
    return &AgentMemoryApi{client: client}
}

// Get memories for agent
func (a *AgentMemoryApi) MemoryControllerGetMemories(agentId string, query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/agents/%s/memory", agentId)), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Store a memory
func (a *AgentMemoryApi) MemoryControllerStore(agentId string, body sdktypes.StoreMemoryDto) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/agents/%s/memory", agentId)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Search memories
func (a *AgentMemoryApi) MemoryControllerSearchMemories(agentId string, query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/agents/%s/memory/search", agentId)), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Semantic search memories
func (a *AgentMemoryApi) MemoryControllerSemanticSearch(agentId string, query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/agents/%s/memory/semantic-search", agentId)), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get memory statistics
func (a *AgentMemoryApi) MemoryControllerGetStats(agentId string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/agents/%s/memory/stats", agentId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get conversation history
func (a *AgentMemoryApi) MemoryControllerGetHistory(agentId string, sessionId string, query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/agents/%s/memory/sessions/%s/history", agentId, sessionId)), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Summarize session
func (a *AgentMemoryApi) MemoryControllerSummarizeSession(agentId string, sessionId string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/agents/%s/memory/sessions/%s/summarize", agentId, sessionId)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Delete a memory
func (a *AgentMemoryApi) MemoryControllerDelete(agentId string, memoryId string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/agents/%s/memory/%s", agentId, memoryId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Clear session memories
func (a *AgentMemoryApi) MemoryControllerClearSession(agentId string, sessionId string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/agents/%s/memory/sessions/%s", agentId, sessionId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Consolidate memories
func (a *AgentMemoryApi) MemoryControllerConsolidate(agentId string) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/agents/%s/memory/consolidate", agentId)), nil, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get knowledge documents
func (a *AgentMemoryApi) MemoryControllerGetKnowledgeDocuments(agentId string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/agents/%s/memory/knowledge", agentId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Add knowledge document
func (a *AgentMemoryApi) MemoryControllerAddKnowledgeDocument(agentId string, body sdktypes.AddKnowledgeDocumentDto) (struct{}, error) {
    raw, err := a.client.Post(BackendApiPath(fmt.Sprintf("/agents/%s/memory/knowledge", agentId)), body, nil, nil, "")
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Search knowledge
func (a *AgentMemoryApi) MemoryControllerSearchKnowledge(agentId string, query map[string]interface{}) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/agents/%s/memory/knowledge/search", agentId)), query, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get knowledge statistics
func (a *AgentMemoryApi) MemoryControllerGetKnowledgeStats(agentId string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/agents/%s/memory/knowledge/stats", agentId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get knowledge document
func (a *AgentMemoryApi) MemoryControllerGetKnowledgeDocument(agentId string, documentId string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/agents/%s/memory/knowledge/%s", agentId, documentId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Delete knowledge document
func (a *AgentMemoryApi) MemoryControllerDeleteKnowledgeDocument(agentId string, documentId string) (struct{}, error) {
    raw, err := a.client.Delete(BackendApiPath(fmt.Sprintf("/agents/%s/memory/knowledge/%s", agentId, documentId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}

// Get document chunks
func (a *AgentMemoryApi) MemoryControllerGetDocumentChunks(agentId string, documentId string) (struct{}, error) {
    raw, err := a.client.Get(BackendApiPath(fmt.Sprintf("/agents/%s/memory/knowledge/%s/chunks", agentId, documentId)), nil, nil)
    if err != nil {
        var zero struct{}
        return zero, err
    }
    return decodeResult[struct{}](raw)
}
