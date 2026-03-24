from typing import Any, Dict, List, Optional
from ..http_client import HttpClient
from ..models import AddSkill, AddTool, CreateAgent, CreateSession, SendAgentMessage, UpdateAgent

class AgentApi:
    """agent API client."""
    
    def __init__(self, client: HttpClient):
        self._client = client

    def controller_create(self, body: CreateAgent) -> None:
        """Create a new agent"""
        return self._client.post(f"/im/v3/agents", json=body)

    def get_controller_get(self, params: Optional[Dict[str, Any]] = None) -> None:
        """Get all agents for current user"""
        return self._client.get(f"/im/v3/agents", params=params)

    def get_controller_get_agents(self, id: str) -> None:
        """Get agent by ID"""
        return self._client.get(f"/im/v3/agents/{id}")

    def controller_update(self, id: str, body: UpdateAgent) -> None:
        """Update agent"""
        return self._client.put(f"/im/v3/agents/{id}", json=body)

    def controller_delete(self, id: str) -> None:
        """Delete agent"""
        return self._client.delete(f"/im/v3/agents/{id}")

    def controller_create_session(self, id: str, body: CreateSession) -> None:
        """Create a new chat session"""
        return self._client.post(f"/im/v3/agents/{id}/sessions", json=body)

    def controller_get_sessions(self, id: str, params: Optional[Dict[str, Any]] = None) -> None:
        """Get sessions for agent"""
        return self._client.get(f"/im/v3/agents/{id}/sessions", params=params)

    def controller_get_session(self, sessionId: str) -> None:
        """Get session by ID"""
        return self._client.get(f"/im/v3/agents/sessions/{sessionId}")

    def controller_delete_session(self, sessionId: str) -> None:
        """Delete session"""
        return self._client.delete(f"/im/v3/agents/sessions/{sessionId}")

    def controller_get_messages(self, sessionId: str, params: Optional[Dict[str, Any]] = None) -> None:
        """Get messages for session"""
        return self._client.get(f"/im/v3/agents/sessions/{sessionId}/messages", params=params)

    def controller_send_message(self, sessionId: str, body: SendAgentMessage) -> None:
        """Send a message to agent"""
        return self._client.post(f"/im/v3/agents/sessions/{sessionId}/messages", json=body)

    def controller_stream_message(self, sessionId: str) -> None:
        """Stream message from agent"""
        return self._client.get(f"/im/v3/agents/sessions/{sessionId}/stream")

    def controller_get_tools(self, id: str) -> None:
        """Get tools for agent"""
        return self._client.get(f"/im/v3/agents/{id}/tools")

    def controller_add_tool_to(self, id: str, body: AddTool) -> None:
        """Add tool to agent"""
        return self._client.post(f"/im/v3/agents/{id}/tools", json=body)

    def controller_get_skills(self, id: str) -> None:
        """Get skills for agent"""
        return self._client.get(f"/im/v3/agents/{id}/skills")

    def controller_add_skill_to(self, id: str, body: AddSkill) -> None:
        """Add skill to agent"""
        return self._client.post(f"/im/v3/agents/{id}/skills", json=body)

    def controller_get_available_tools(self) -> None:
        """Get all available tools"""
        return self._client.get(f"/im/v3/agents/tools/available")

    def controller_get_available_skills(self) -> None:
        """Get all available skills"""
        return self._client.get(f"/im/v3/agents/skills/available")

    def controller_start(self, id: str) -> None:
        """Start agent runtime"""
        return self._client.post(f"/im/v3/agents/{id}/start")

    def controller_stop(self, id: str) -> None:
        """Stop agent runtime"""
        return self._client.post(f"/im/v3/agents/{id}/stop")

    def controller_reset(self, id: str) -> None:
        """Reset agent"""
        return self._client.post(f"/im/v3/agents/{id}/reset")
