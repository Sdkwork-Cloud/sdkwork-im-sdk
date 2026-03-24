from typing import Any, Dict, List, Optional
from ..http_client import HttpClient
from ..models import AddKnowledgeDocumentDto, StoreMemoryDto

class AgentMemoryApi:
    """agent_memory API client."""
    
    def __init__(self, client: HttpClient):
        self._client = client

    def memory_controller_get_memories(self, agentId: str, params: Optional[Dict[str, Any]] = None) -> None:
        """Get memories for agent"""
        return self._client.get(f"/im/v3/agents/{agentId}/memory", params=params)

    def memory_controller_store(self, agentId: str, body: StoreMemoryDto) -> None:
        """Store a memory"""
        return self._client.post(f"/im/v3/agents/{agentId}/memory", json=body)

    def memory_controller_search_memories(self, agentId: str, params: Optional[Dict[str, Any]] = None) -> None:
        """Search memories"""
        return self._client.get(f"/im/v3/agents/{agentId}/memory/search", params=params)

    def memory_controller_semantic_search(self, agentId: str, params: Optional[Dict[str, Any]] = None) -> None:
        """Semantic search memories"""
        return self._client.get(f"/im/v3/agents/{agentId}/memory/semantic-search", params=params)

    def memory_controller_get_stats(self, agentId: str) -> None:
        """Get memory statistics"""
        return self._client.get(f"/im/v3/agents/{agentId}/memory/stats")

    def memory_controller_get_history(self, agentId: str, sessionId: str, params: Optional[Dict[str, Any]] = None) -> None:
        """Get conversation history"""
        return self._client.get(f"/im/v3/agents/{agentId}/memory/sessions/{sessionId}/history", params=params)

    def memory_controller_summarize_session(self, agentId: str, sessionId: str) -> None:
        """Summarize session"""
        return self._client.post(f"/im/v3/agents/{agentId}/memory/sessions/{sessionId}/summarize")

    def memory_controller_delete(self, agentId: str, memoryId: str) -> None:
        """Delete a memory"""
        return self._client.delete(f"/im/v3/agents/{agentId}/memory/{memoryId}")

    def memory_controller_clear_session(self, agentId: str, sessionId: str) -> None:
        """Clear session memories"""
        return self._client.delete(f"/im/v3/agents/{agentId}/memory/sessions/{sessionId}")

    def memory_controller_consolidate(self, agentId: str) -> None:
        """Consolidate memories"""
        return self._client.post(f"/im/v3/agents/{agentId}/memory/consolidate")

    def memory_controller_get_knowledge_documents(self, agentId: str) -> None:
        """Get knowledge documents"""
        return self._client.get(f"/im/v3/agents/{agentId}/memory/knowledge")

    def memory_controller_add_knowledge_document(self, agentId: str, body: AddKnowledgeDocumentDto) -> None:
        """Add knowledge document"""
        return self._client.post(f"/im/v3/agents/{agentId}/memory/knowledge", json=body)

    def memory_controller_search_knowledge(self, agentId: str, params: Optional[Dict[str, Any]] = None) -> None:
        """Search knowledge"""
        return self._client.get(f"/im/v3/agents/{agentId}/memory/knowledge/search", params=params)

    def memory_controller_get_knowledge_stats(self, agentId: str) -> None:
        """Get knowledge statistics"""
        return self._client.get(f"/im/v3/agents/{agentId}/memory/knowledge/stats")

    def memory_controller_get_knowledge_document(self, agentId: str, documentId: str) -> None:
        """Get knowledge document"""
        return self._client.get(f"/im/v3/agents/{agentId}/memory/knowledge/{documentId}")

    def memory_controller_delete_knowledge_document(self, agentId: str, documentId: str) -> None:
        """Delete knowledge document"""
        return self._client.delete(f"/im/v3/agents/{agentId}/memory/knowledge/{documentId}")

    def memory_controller_get_document_chunks(self, agentId: str, documentId: str) -> None:
        """Get document chunks"""
        return self._client.get(f"/im/v3/agents/{agentId}/memory/knowledge/{documentId}/chunks")
