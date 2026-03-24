import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';
import type { AddSkill, AddTool, CreateAgent, CreateSession, SendAgentMessage, UpdateAgent } from '../types';


export class AgentApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** Create a new agent */
  async controllerCreate(body: CreateAgent): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/agents`), body);
  }

/** Get all agents for current user */
  async getControllerGet(params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents`), params);
  }

/** Get agent by ID */
  async getControllerGetAgents(id: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/${id}`));
  }

/** Update agent */
  async controllerUpdate(id: string | number, body: UpdateAgent): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/agents/${id}`), body);
  }

/** Delete agent */
  async controllerDelete(id: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/agents/${id}`));
  }

/** Create a new chat session */
  async controllerCreateSession(id: string | number, body: CreateSession): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/agents/${id}/sessions`), body);
  }

/** Get sessions for agent */
  async controllerGetSessions(id: string | number, params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/${id}/sessions`), params);
  }

/** Get session by ID */
  async controllerGetSession(sessionId: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/sessions/${sessionId}`));
  }

/** Delete session */
  async controllerDeleteSession(sessionId: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/agents/sessions/${sessionId}`));
  }

/** Get messages for session */
  async controllerGetMessages(sessionId: string | number, params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/sessions/${sessionId}/messages`), params);
  }

/** Send a message to agent */
  async controllerSendMessage(sessionId: string | number, body: SendAgentMessage): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/agents/sessions/${sessionId}/messages`), body);
  }

/** Stream message from agent */
  async controllerStreamMessage(sessionId: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/sessions/${sessionId}/stream`));
  }

/** Get tools for agent */
  async controllerGetTools(id: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/${id}/tools`));
  }

/** Add tool to agent */
  async controllerAddToolTo(id: string | number, body: AddTool): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/agents/${id}/tools`), body);
  }

/** Get skills for agent */
  async controllerGetSkills(id: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/${id}/skills`));
  }

/** Add skill to agent */
  async controllerAddSkillTo(id: string | number, body: AddSkill): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/agents/${id}/skills`), body);
  }

/** Get all available tools */
  async controllerGetAvailableTools(): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/tools/available`));
  }

/** Get all available skills */
  async controllerGetAvailableSkills(): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/agents/skills/available`));
  }

/** Start agent runtime */
  async controllerStart(id: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/agents/${id}/start`));
  }

/** Stop agent runtime */
  async controllerStop(id: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/agents/${id}/stop`));
  }

/** Reset agent */
  async controllerReset(id: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/agents/${id}/reset`));
  }
}

export function createAgentApi(client: HttpClient): AgentApi {
  return new AgentApi(client);
}
