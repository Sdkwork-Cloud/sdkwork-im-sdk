import type {
  ImAuthLoginRequest,
  ImAuthLoginResult,
  ImAuthSession,
} from './types.js';
import type { ImSdkContext } from './sdk-context.js';

export class ImAuthModule {
  constructor(private readonly context: ImSdkContext) {}

  async login(body: ImAuthLoginRequest): Promise<ImAuthLoginResult> {
    const session = await this.context.transportClient.auth.login(body);
    if (session.accessToken) {
      this.useToken(session.accessToken);
    }
    return session;
  }

  me(): Promise<ImAuthSession> {
    return this.context.transportClient.auth.me();
  }

  useToken(token: string): void {
    this.context.setAuthToken(token);
  }

  clearToken(): void {
    this.context.clearAuthToken();
  }
}
