package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class AgentApi(private val client: HttpClient) {

    /** Create a new agent */
    suspend fun controllerCreate(body: CreateAgent): Unit {
        client.post(ApiPaths.backendPath("/agents"), body)
    }

    /** Get all agents for current user */
    suspend fun getControllerGet(params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/agents"), params)
    }

    /** Get agent by ID */
    suspend fun getControllerGetAgents(id: String): Unit {
        client.get(ApiPaths.backendPath("/agents/$id"))
    }

    /** Update agent */
    suspend fun controllerUpdate(id: String, body: UpdateAgent): Unit {
        client.put(ApiPaths.backendPath("/agents/$id"), body)
    }

    /** Delete agent */
    suspend fun controllerDelete(id: String): Unit {
        client.delete(ApiPaths.backendPath("/agents/$id"))
    }

    /** Create a new chat session */
    suspend fun controllerCreateSession(id: String, body: CreateSession): Unit {
        client.post(ApiPaths.backendPath("/agents/$id/sessions"), body)
    }

    /** Get sessions for agent */
    suspend fun controllerGetSessions(id: String, params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/agents/$id/sessions"), params)
    }

    /** Get session by ID */
    suspend fun controllerGetSession(sessionId: String): Unit {
        client.get(ApiPaths.backendPath("/agents/sessions/$sessionId"))
    }

    /** Delete session */
    suspend fun controllerDeleteSession(sessionId: String): Unit {
        client.delete(ApiPaths.backendPath("/agents/sessions/$sessionId"))
    }

    /** Get messages for session */
    suspend fun controllerGetMessages(sessionId: String, params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/agents/sessions/$sessionId/messages"), params)
    }

    /** Send a message to agent */
    suspend fun controllerSendMessage(sessionId: String, body: SendAgentMessage): Unit {
        client.post(ApiPaths.backendPath("/agents/sessions/$sessionId/messages"), body)
    }

    /** Stream message from agent */
    suspend fun controllerStreamMessage(sessionId: String): Unit {
        client.get(ApiPaths.backendPath("/agents/sessions/$sessionId/stream"))
    }

    /** Get tools for agent */
    suspend fun controllerGetTools(id: String): Unit {
        client.get(ApiPaths.backendPath("/agents/$id/tools"))
    }

    /** Add tool to agent */
    suspend fun controllerAddToolTo(id: String, body: AddTool): Unit {
        client.post(ApiPaths.backendPath("/agents/$id/tools"), body)
    }

    /** Get skills for agent */
    suspend fun controllerGetSkills(id: String): Unit {
        client.get(ApiPaths.backendPath("/agents/$id/skills"))
    }

    /** Add skill to agent */
    suspend fun controllerAddSkillTo(id: String, body: AddSkill): Unit {
        client.post(ApiPaths.backendPath("/agents/$id/skills"), body)
    }

    /** Get all available tools */
    suspend fun controllerGetAvailableTools(): Unit {
        client.get(ApiPaths.backendPath("/agents/tools/available"))
    }

    /** Get all available skills */
    suspend fun controllerGetAvailableSkills(): Unit {
        client.get(ApiPaths.backendPath("/agents/skills/available"))
    }

    /** Start agent runtime */
    suspend fun controllerStart(id: String): Unit {
        client.post(ApiPaths.backendPath("/agents/$id/start"), null)
    }

    /** Stop agent runtime */
    suspend fun controllerStop(id: String): Unit {
        client.post(ApiPaths.backendPath("/agents/$id/stop"), null)
    }

    /** Reset agent */
    suspend fun controllerReset(id: String): Unit {
        client.post(ApiPaths.backendPath("/agents/$id/reset"), null)
    }
}
