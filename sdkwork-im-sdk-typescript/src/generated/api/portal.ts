import { apiPath } from './paths.js';
import type { HttpClient } from '../http/client.js';
import type { QueryParams } from '../types/common.js';
import type { PortalSnapshot, PortalWorkspaceView } from '../types/index.js';


export class PortalApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** Read the tenant portal home snapshot */
  async getHome(): Promise<PortalSnapshot> {
    return this.client.get<PortalSnapshot>(apiPath(`/portal/home`));
  }

/** Read the tenant portal sign-in snapshot */
  async getAuth(): Promise<PortalSnapshot> {
    return this.client.get<PortalSnapshot>(apiPath(`/portal/auth`));
  }

/** Read the current tenant workspace snapshot */
  async getWorkspace(): Promise<PortalWorkspaceView> {
    return this.client.get<PortalWorkspaceView>(apiPath(`/portal/workspace`));
  }

/** Read the tenant dashboard snapshot */
  async getDashboard(): Promise<PortalSnapshot> {
    return this.client.get<PortalSnapshot>(apiPath(`/portal/dashboard`));
  }

/** Read the tenant conversations snapshot */
  async getConversations(): Promise<PortalSnapshot> {
    return this.client.get<PortalSnapshot>(apiPath(`/portal/conversations`));
  }

/** Read the tenant realtime snapshot */
  async getRealtime(): Promise<PortalSnapshot> {
    return this.client.get<PortalSnapshot>(apiPath(`/portal/realtime`));
  }

/** Read the tenant media snapshot */
  async getMedia(): Promise<PortalSnapshot> {
    return this.client.get<PortalSnapshot>(apiPath(`/portal/media`));
  }

/** Read the tenant automation snapshot */
  async getAutomation(): Promise<PortalSnapshot> {
    return this.client.get<PortalSnapshot>(apiPath(`/portal/automation`));
  }

/** Read the tenant governance snapshot */
  async getGovernance(): Promise<PortalSnapshot> {
    return this.client.get<PortalSnapshot>(apiPath(`/portal/governance`));
  }
}

export function createPortalApi(client: HttpClient): PortalApi {
  return new PortalApi(client);
}
