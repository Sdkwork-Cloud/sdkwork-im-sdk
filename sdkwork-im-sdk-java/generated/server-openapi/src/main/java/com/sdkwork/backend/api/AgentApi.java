package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class AgentApi {
    private final HttpClient client;
    
    public AgentApi(HttpClient client) {
        this.client = client;
    }

    /** Create a new agent */
    public Void controllerCreate(CreateAgent body) throws Exception {
        client.post(ApiPaths.backendPath("/agents"), body);
        return null;
    }

    /** Get all agents for current user */
    public Void getControllerGet(Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/agents"), params);
        return null;
    }

    /** Get agent by ID */
    public Void getControllerGetAgents(String id) throws Exception {
        client.get(ApiPaths.backendPath("/agents/" + id + ""));
        return null;
    }

    /** Update agent */
    public Void controllerUpdate(String id, UpdateAgent body) throws Exception {
        client.put(ApiPaths.backendPath("/agents/" + id + ""), body);
        return null;
    }

    /** Delete agent */
    public Void controllerDelete(String id) throws Exception {
        client.delete(ApiPaths.backendPath("/agents/" + id + ""));
        return null;
    }

    /** Create a new chat session */
    public Void controllerCreateSession(String id, CreateSession body) throws Exception {
        client.post(ApiPaths.backendPath("/agents/" + id + "/sessions"), body);
        return null;
    }

    /** Get sessions for agent */
    public Void controllerGetSessions(String id, Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/agents/" + id + "/sessions"), params);
        return null;
    }

    /** Get session by ID */
    public Void controllerGetSession(String sessionId) throws Exception {
        client.get(ApiPaths.backendPath("/agents/sessions/" + sessionId + ""));
        return null;
    }

    /** Delete session */
    public Void controllerDeleteSession(String sessionId) throws Exception {
        client.delete(ApiPaths.backendPath("/agents/sessions/" + sessionId + ""));
        return null;
    }

    /** Get messages for session */
    public Void controllerGetMessages(String sessionId, Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/agents/sessions/" + sessionId + "/messages"), params);
        return null;
    }

    /** Send a message to agent */
    public Void controllerSendMessage(String sessionId, SendAgentMessage body) throws Exception {
        client.post(ApiPaths.backendPath("/agents/sessions/" + sessionId + "/messages"), body);
        return null;
    }

    /** Stream message from agent */
    public Void controllerStreamMessage(String sessionId) throws Exception {
        client.get(ApiPaths.backendPath("/agents/sessions/" + sessionId + "/stream"));
        return null;
    }

    /** Get tools for agent */
    public Void controllerGetTools(String id) throws Exception {
        client.get(ApiPaths.backendPath("/agents/" + id + "/tools"));
        return null;
    }

    /** Add tool to agent */
    public Void controllerAddToolTo(String id, AddTool body) throws Exception {
        client.post(ApiPaths.backendPath("/agents/" + id + "/tools"), body);
        return null;
    }

    /** Get skills for agent */
    public Void controllerGetSkills(String id) throws Exception {
        client.get(ApiPaths.backendPath("/agents/" + id + "/skills"));
        return null;
    }

    /** Add skill to agent */
    public Void controllerAddSkillTo(String id, AddSkill body) throws Exception {
        client.post(ApiPaths.backendPath("/agents/" + id + "/skills"), body);
        return null;
    }

    /** Get all available tools */
    public Void controllerGetAvailableTools() throws Exception {
        client.get(ApiPaths.backendPath("/agents/tools/available"));
        return null;
    }

    /** Get all available skills */
    public Void controllerGetAvailableSkills() throws Exception {
        client.get(ApiPaths.backendPath("/agents/skills/available"));
        return null;
    }

    /** Start agent runtime */
    public Void controllerStart(String id) throws Exception {
        client.post(ApiPaths.backendPath("/agents/" + id + "/start"), null);
        return null;
    }

    /** Stop agent runtime */
    public Void controllerStop(String id) throws Exception {
        client.post(ApiPaths.backendPath("/agents/" + id + "/stop"), null);
        return null;
    }

    /** Reset agent */
    public Void controllerReset(String id) throws Exception {
        client.post(ApiPaths.backendPath("/agents/" + id + "/reset"), null);
        return null;
    }
}
