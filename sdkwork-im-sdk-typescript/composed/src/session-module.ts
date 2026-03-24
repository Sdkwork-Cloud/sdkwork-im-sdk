import {
  isRecord,
  pickNumber,
  pickString,
  unwrapResponse,
  type OpenChatSdkContext,
} from './sdk-context';
import type {
  OpenChatAuthSession,
  OpenChatRealtimeSession,
} from './types';

export function createSessionModule(context: OpenChatSdkContext) {
  return {
    getState(): OpenChatAuthSession {
      return context.cloneSession();
    },

    setAccessToken(token: string): OpenChatAuthSession {
      return context.applyAccessToken(token);
    },

    setAuthToken(token: string): OpenChatAuthSession {
      return context.applyAccessToken(token);
    },

    async login(payload: Record<string, unknown>): Promise<OpenChatAuthSession> {
      const raw = await context.callApi('auth', 'controllerLogin', [payload], () =>
        context.post('/auth/login', payload),
      );
      const nextSession = normalizeAuthSession(raw, context.authSession.user);
      if (nextSession.token) {
        context.applyAccessToken(nextSession.token);
      }
      context.authSession = { ...context.authSession, ...nextSession };
      if (nextSession.realtime && context.realtimeAdapter) {
        await context.realtimeAdapter.connect(nextSession.realtime);
      }
      return context.cloneSession();
    },

    async register(
      payload: Record<string, unknown>,
    ): Promise<OpenChatAuthSession> {
      const raw = await context.callApi(
        'auth',
        'controllerRegister',
        [payload],
        () => context.post('/auth/register', payload),
      );
      const nextSession = normalizeAuthSession(raw, context.authSession.user);
      if (nextSession.token) {
        context.applyAccessToken(nextSession.token);
      }
      context.authSession = { ...context.authSession, ...nextSession };
      if (nextSession.realtime && context.realtimeAdapter) {
        await context.realtimeAdapter.connect(nextSession.realtime);
      }
      return context.cloneSession();
    },

    async refreshToken(
      refreshToken?: string,
    ): Promise<OpenChatAuthSession> {
      const effectiveRefreshToken =
        refreshToken ?? context.authSession.refreshToken;
      const raw = await context.callApi(
        'auth',
        'controllerRefreshToken',
        [{ refreshToken: effectiveRefreshToken }],
        () => context.post('/auth/refresh', { refreshToken: effectiveRefreshToken }),
      );
      const nextSession = normalizeAuthSession(raw, context.authSession.user);
      if (nextSession.token) {
        context.applyAccessToken(nextSession.token);
      }
      context.authSession = { ...context.authSession, ...nextSession };
      return context.cloneSession();
    },

    async logout(refreshToken?: string): Promise<boolean> {
      await context.callApi(
        'auth',
        'controllerLogout',
        [
          {
            token: context.authSession.token,
            refreshToken: refreshToken ?? context.authSession.refreshToken,
          },
        ],
        () =>
          context.post('/auth/logout', {
            token: context.authSession.token,
            refreshToken: refreshToken ?? context.authSession.refreshToken,
          }),
      );
      if (context.realtimeAdapter) {
        await context.realtimeAdapter.disconnect();
      }
      context.authSession = {};
      return true;
    },

    async bootstrapRealtime(): Promise<OpenChatRealtimeSession> {
      const configResponse = await context.get('/wukongim/config');
      const tokenResponse = await context.post('/wukongim/token');
      const realtime = normalizeRealtimeSession(
        configResponse,
        tokenResponse,
        context.authSession.user,
      );
      context.authSession = { ...context.authSession, realtime };
      if (context.realtimeAdapter) {
        await context.realtimeAdapter.connect(realtime);
      }
      return { ...realtime };
    },

    async connectRealtime(
      session?: OpenChatRealtimeSession,
    ): Promise<OpenChatRealtimeSession> {
      const adapter = context.requireRealtimeAdapter();
      const nextSession =
        session ?? context.authSession.realtime ?? adapter.getSession();
      if (nextSession) {
        const connected = await adapter.connect(nextSession);
        context.authSession = {
          ...context.authSession,
          realtime: connected,
        };
        return connected;
      }
      return this.bootstrapRealtime();
    },

    async disconnectRealtime(): Promise<boolean> {
      if (context.realtimeAdapter) {
        await context.realtimeAdapter.disconnect();
      }
      return true;
    },
  };
}

function normalizeAuthSession(
  value: unknown,
  previousUser?: Record<string, unknown>,
): OpenChatAuthSession {
  const record = unwrapResponse<Record<string, unknown>>(value);
  const user = isRecord(record.user) ? record.user : previousUser;
  const imConfig = isRecord(record.imConfig) ? record.imConfig : undefined;
  const realtime =
    imConfig &&
    pickString(imConfig.uid, user?.id) &&
    pickString(imConfig.token) &&
    pickString(imConfig.wsUrl)
      ? {
          uid: pickString(imConfig.uid, user?.id) as string,
          token: pickString(imConfig.token) as string,
          wsUrl: pickString(imConfig.wsUrl) as string,
        }
      : undefined;
  return {
    ...(user ? { user } : {}),
    ...(pickString(record.token) ? { token: pickString(record.token) } : {}),
    ...(pickString(record.refreshToken)
      ? { refreshToken: pickString(record.refreshToken) }
      : {}),
    ...(typeof pickNumber(record.expiresIn) === 'number'
      ? { expiresIn: pickNumber(record.expiresIn) }
      : {}),
    ...(realtime ? { realtime } : {}),
  };
}

function normalizeRealtimeSession(
  configResponse: unknown,
  tokenResponse: unknown,
  user?: Record<string, unknown>,
): OpenChatRealtimeSession {
  const config = unwrapResponse<Record<string, unknown>>(configResponse) ?? {};
  const token = unwrapResponse<Record<string, unknown>>(tokenResponse) ?? {};
  const realtime = {
    uid: pickString(config.uid, user?.id) ?? '',
    token: pickString(token.token, config.token) ?? '',
    wsUrl: pickString(config.wsUrl, config.addr, config.websocketUrl) ?? '',
    ...(pickString(config.deviceId) ? { deviceId: pickString(config.deviceId) } : {}),
    ...(pickNumber(config.deviceFlag) !== undefined
      ? { deviceFlag: pickNumber(config.deviceFlag) }
      : {}),
  };
  if (!realtime.uid || !realtime.token || !realtime.wsUrl) {
    throw new Error('WukongIM bootstrap response is missing uid, token, or wsUrl');
  }
  return realtime;
}
