import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';
import type { AddKnowledgeDocumentDto, StoreMemoryDto } from '../types';


export class AgentMemoryApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** Get memories for agent */
  async memoryControllerGetMemories(agentId: string | number, params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/${agentId}/memory`), params);
  }

/** Store a memory */
  async memoryControllerStore(agentId: string | number, body: StoreMemoryDto): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/agents/${agentId}/memory`), body);
  }

/** Search memories */
  async memoryControllerSearchMemories(agentId: string | number, params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/${agentId}/memory/search`), params);
  }

/** Semantic search memories */
  async memoryControllerSemanticSearch(agentId: string | number, params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/${agentId}/memory/semantic-search`), params);
  }

/** Get memory statistics */
  async memoryControllerGetStats(agentId: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/${agentId}/memory/stats`));
  }

/** Get conversation history */
  async memoryControllerGetHistory(agentId: string | number, sessionId: string | number, params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/${agentId}/memory/sessions/${sessionId}/history`), params);
  }

/** Summarize session */
  async memoryControllerSummarizeSession(agentId: string | number, sessionId: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/agents/${agentId}/memory/sessions/${sessionId}/summarize`));
  }

/** Delete a memory */
  async memoryControllerDelete(agentId: string | number, memoryId: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/agents/${agentId}/memory/${memoryId}`));
  }

/** Clear session memories */
  async memoryControllerClearSession(agentId: string | number, sessionId: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/agents/${agentId}/memory/sessions/${sessionId}`));
  }

/** Consolidate memories */
  async memoryControllerConsolidate(agentId: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/agents/${agentId}/memory/consolidate`));
  }

/** Get knowledge documents */
  async memoryControllerGetKnowledgeDocuments(agentId: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/${agentId}/memory/knowledge`));
  }

/** Add knowledge document */
  async memoryControllerAddKnowledgeDocument(agentId: string | number, body: AddKnowledgeDocumentDto): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/agents/${agentId}/memory/knowledge`), body);
  }

/** Search knowledge */
  async memoryControllerSearchKnowledge(agentId: string | number, params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/${agentId}/memory/knowledge/search`), params);
  }

/** Get knowledge statistics */
  async memoryControllerGetKnowledgeStats(agentId: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/${agentId}/memory/knowledge/stats`));
  }

/** Get knowledge document */
  async memoryControllerGetKnowledgeDocument(agentId: string | number, documentId: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/${agentId}/memory/knowledge/${documentId}`));
  }

/** Delete knowledge document */
  async memoryControllerDeleteKnowledgeDocument(agentId: string | number, documentId: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/agents/${agentId}/memory/knowledge/${documentId}`));
  }

/** Get document chunks */
  async memoryControllerGetDocumentChunks(agentId: string | number, documentId: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/${agentId}/memory/knowledge/${documentId}/chunks`));
  }
}

export function createAgentMemoryApi(client: HttpClient): AgentMemoryApi {
  return new AgentMemoryApi(client);
}
