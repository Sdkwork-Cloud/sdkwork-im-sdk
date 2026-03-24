import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';
import type { AibotControllerCreateBotRequest, AibotControllerProcessMessageRequest, AibotControllerUpdateBotRequest } from '../types';


export class AiBotApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** Create a new AI Bot */
  async aibotControllerCreateBot(body: AibotControllerCreateBotRequest): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/ai-bots`), body);
  }

/** Get all AI Bots */
  async aibotControllerGetBots(): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/ai-bots`));
  }

/** Get an AI Bot by ID */
  async aibotControllerGetBot(id: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/ai-bots/${id}`));
  }

/** Update an AI Bot */
  async aibotControllerUpdateBot(id: string | number, body: AibotControllerUpdateBotRequest): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/ai-bots/${id}`), body);
  }

/** Delete an AI Bot */
  async aibotControllerDeleteBot(id: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/ai-bots/${id}`));
  }

/** Activate an AI Bot */
  async aibotControllerActivateBot(id: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/ai-bots/${id}/activate`));
  }

/** Deactivate an AI Bot */
  async aibotControllerDeactivateBot(id: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/ai-bots/${id}/deactivate`));
  }

/** Process a message with AI Bot */
  async aibotControllerProcessMessage(id: string | number, body: AibotControllerProcessMessageRequest): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/ai-bots/${id}/messages`), body);
  }
}

export function createAiBotApi(client: HttpClient): AiBotApi {
  return new AiBotApi(client);
}
