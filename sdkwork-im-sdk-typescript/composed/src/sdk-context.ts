import {
  ImEventBuilder,
  ImMessageBuilder,
  normalizeSendRequest,
} from './builders';
import type {
  OpenChatAuthSession,
  OpenChatBackendClientLike,
  OpenChatBackendHttpLike,
  OpenChatConversationEnvelope,
  OpenChatConversationSelector,
  OpenChatImSdkCreateOptions,
  OpenChatMessageEnvelope,
  OpenChatPublishEventOptions,
  OpenChatRealtimeAdapterLike,
  OpenChatRealtimeSession,
  OpenChatRtcSignalOptions,
  OpenChatSendOptionsBase,
  OpenChatSendRequest,
  OpenChatSendResult,
} from './types';

export const APP_API_PREFIX = '/im/v3';

export type ApiGroupName =
  | 'auth'
  | 'messages'
  | 'friends'
  | 'conversations'
  | 'groups'
  | 'contacts'
  | 'rtc';

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function pickString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }
  return undefined;
}

export function pickNumber(...values: unknown[]): number | undefined {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === 'string' && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }
  return undefined;
}

export function unwrapResponse<T = unknown>(value: unknown): T {
  if (!isRecord(value)) {
    return value as T;
  }
  if (value.success === false) {
    throw new Error(
      pickString(value.message, value.error) ?? 'OpenChat request failed',
    );
  }
  if (Object.prototype.hasOwnProperty.call(value, 'data')) {
    return value.data as T;
  }
  return value as T;
}

export function normalizeActionSuccess(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  if (isRecord(value) && typeof value.success === 'boolean') {
    return value.success;
  }
  return true;
}

export function cloneSession(session: OpenChatAuthSession): OpenChatAuthSession {
  return {
    ...(session.user ? { user: { ...session.user } } : {}),
    ...(session.token ? { token: session.token } : {}),
    ...(session.refreshToken ? { refreshToken: session.refreshToken } : {}),
    ...(typeof session.expiresIn === 'number'
      ? { expiresIn: session.expiresIn }
      : {}),
    ...(session.realtime ? { realtime: { ...session.realtime } } : {}),
  };
}

async function dynamicImportModule(moduleName: string): Promise<unknown> {
  const dynamicImport = new Function(
    'name',
    'return import(name);',
  ) as (name: string) => Promise<unknown>;
  return dynamicImport(moduleName);
}

export async function createGeneratedBackendClient(
  backendConfig: Record<string, unknown>,
): Promise<OpenChatBackendClientLike> {
  const moduleExport = await dynamicImportModule('@sdkwork/backend-sdk');
  const createClient = isRecord(moduleExport)
    ? moduleExport.createClient
    : undefined;
  if (typeof createClient !== 'function') {
    throw new Error(
      'Unable to resolve @sdkwork/backend-sdk createClient factory',
    );
  }
  return createClient(backendConfig) as Promise<OpenChatBackendClientLike>;
}

export async function createRealtimeAdapter(
  realtimeConfig: Record<string, unknown>,
): Promise<OpenChatRealtimeAdapterLike> {
  const moduleExport = await dynamicImportModule(
    '@openchat/sdkwork-im-wukongim-adapter',
  );
  const ctor = isRecord(moduleExport)
    ? moduleExport.OpenChatWukongimAdapter ?? moduleExport.WukongImAdapter
    : undefined;
  if (typeof ctor !== 'function') {
    throw new Error(
      'Unable to resolve @openchat/sdkwork-im-wukongim-adapter constructor',
    );
  }
  const AdapterConstructor = ctor as new (
    config: Record<string, unknown>,
  ) => OpenChatRealtimeAdapterLike;
  return new AdapterConstructor(realtimeConfig);
}

export async function resolveSdkOptions(
  options: OpenChatImSdkCreateOptions,
): Promise<{
  backendClient: OpenChatBackendClientLike;
  realtimeAdapter?: OpenChatRealtimeAdapterLike;
}> {
  const backendClient =
    options.backendClient ??
    (options.backendConfig
      ? await createGeneratedBackendClient(options.backendConfig)
      : undefined);
  if (!backendClient) {
    throw new Error('backendClient or backendConfig is required');
  }
  const realtimeAdapter =
    options.realtimeAdapter ??
    (options.realtimeConfig
      ? await createRealtimeAdapter(options.realtimeConfig)
      : undefined);
  return {
    backendClient,
    realtimeAdapter,
  };
}

export class OpenChatSdkContext {
  authSession: OpenChatAuthSession = {};

  constructor(
    readonly backendClient: OpenChatBackendClientLike,
    readonly realtimeAdapter?: OpenChatRealtimeAdapterLike,
  ) {}

  http(): OpenChatBackendHttpLike {
    if (!this.backendClient.http) {
      throw new Error('backendClient.http is required for fallback HTTP calls');
    }
    return this.backendClient.http;
  }

  requireRealtimeAdapter(): OpenChatRealtimeAdapterLike {
    if (!this.realtimeAdapter) {
      throw new Error(
        'Realtime adapter is not configured. Pass realtimeAdapter or use OpenChatImSdk.create with realtimeConfig.',
      );
    }
    return this.realtimeAdapter;
  }

  cloneSession(): OpenChatAuthSession {
    return cloneSession(this.authSession);
  }

  applyAccessToken(token: string): OpenChatAuthSession {
    this.backendClient.setAuthToken?.(token);
    this.backendClient.setAccessToken?.(token);
    this.authSession = { ...this.authSession, token };
    return this.cloneSession();
  }

  resolveConversation(
    payload: OpenChatConversationSelector,
  ): OpenChatConversationEnvelope {
    if (payload.conversation) {
      return payload.conversation;
    }
    if (payload.toUserId) {
      return ImMessageBuilder.conversationSingle(payload.toUserId);
    }
    if (payload.groupId) {
      return ImMessageBuilder.conversationGroup(payload.groupId);
    }
    throw new Error('conversation, toUserId, or groupId is required');
  }

  resolveCurrentUserId(userId?: string): string {
    const currentUserId = userId ?? pickString(this.authSession.user?.id);
    if (!currentUserId) {
      throw new Error('Current user id is unavailable in the SDK session');
    }
    return currentUserId;
  }

  async callApi(
    groupName: ApiGroupName,
    methodName: string,
    args: unknown[],
    fallback: () => Promise<unknown>,
  ): Promise<unknown> {
    const group = this.backendClient[groupName];
    const method = isRecord(group) ? group[methodName] : undefined;
    if (typeof method === 'function') {
      return method(...args);
    }
    return fallback();
  }

  async get(path: string, params?: Record<string, unknown>): Promise<unknown> {
    const fullPath = `${APP_API_PREFIX}${path}`;
    return unwrapResponse(
      params === undefined
        ? await this.http().get(fullPath)
        : await this.http().get(fullPath, params),
    );
  }

  async post(
    path: string,
    body?: unknown,
    params?: Record<string, unknown>,
  ): Promise<unknown> {
    const fullPath = `${APP_API_PREFIX}${path}`;
    return unwrapResponse(
      body === undefined && params === undefined
        ? await this.http().post(fullPath)
        : await this.http().post(fullPath, body, params),
    );
  }

  async put(
    path: string,
    body?: unknown,
    params?: Record<string, unknown>,
  ): Promise<unknown> {
    const put = this.http().put;
    if (!put) {
      throw new Error('backendClient.http.put is required for PUT requests');
    }
    const fullPath = `${APP_API_PREFIX}${path}`;
    return unwrapResponse(
      body === undefined && params === undefined
        ? await put(fullPath)
        : await put(fullPath, body, params),
    );
  }

  async delete(path: string, params?: Record<string, unknown>): Promise<unknown> {
    const remove = this.http().delete;
    if (!remove) {
      throw new Error('backendClient.http.delete is required for DELETE requests');
    }
    const fullPath = `${APP_API_PREFIX}${path}`;
    return unwrapResponse(
      params === undefined ? await remove(fullPath) : await remove(fullPath, params),
    );
  }

  async deleteWithBody(
    path: string,
    body: Record<string, unknown>,
  ): Promise<unknown> {
    const request = this.http().request;
    if (!request) {
      throw new Error('backendClient.http.request is required for DELETE with body');
    }
    return unwrapResponse(
      await request(`${APP_API_PREFIX}${path}`, {
        method: 'DELETE',
        body,
      }),
    );
  }

  async send(payload: OpenChatSendRequest): Promise<OpenChatSendResult> {
    const normalized = normalizeSendRequest(payload);
    await this.callApi('messages', 'messageControllerSend', [normalized], () =>
      this.post('/messages', normalized),
    );
    return {
      accepted: true,
      payload: normalized,
    };
  }

  async sendMessageEnvelope(
    payload: OpenChatSendOptionsBase,
    message: OpenChatMessageEnvelope,
  ): Promise<OpenChatSendResult> {
    return this.send(
      ImMessageBuilder.buildSendRequest({
        conversation: this.resolveConversation(payload),
        message,
        uuid: payload.uuid,
        replyToId: payload.replyToId,
        forwardFromId: payload.forwardFromId,
        clientSeq: payload.clientSeq,
        idempotencyKey: payload.idempotencyKey,
        extra: payload.extra,
        needReadReceipt: payload.needReadReceipt,
      }),
    );
  }

  async publishEvent(
    payload: OpenChatPublishEventOptions,
  ): Promise<OpenChatSendResult> {
    return this.send(
      ImEventBuilder.buildSendRequest({
        conversation: this.resolveConversation(payload),
        event: ImEventBuilder.custom({
          type: payload.type,
          name: payload.name,
          data: payload.data,
          metadata: payload.metadata,
        }),
        uuid: payload.uuid,
        replyToId: payload.replyToId,
        forwardFromId: payload.forwardFromId,
        clientSeq: payload.clientSeq,
        idempotencyKey: payload.idempotencyKey,
        extra: payload.extra,
        needReadReceipt: payload.needReadReceipt,
      }),
    );
  }

  async sendRtcSignalEvent(
    name: string,
    signalType: string,
    payload: OpenChatRtcSignalOptions,
  ): Promise<OpenChatSendResult> {
    const conversation = payload.toUserId
      ? ImMessageBuilder.conversationSingle(payload.toUserId)
      : ImMessageBuilder.conversationGroup(payload.groupId ?? payload.roomId);
    return this.send(
      ImEventBuilder.buildSendRequest({
        conversation,
        event: ImEventBuilder.rtcSignal({
          name,
          roomId: payload.roomId,
          signalType,
          toUserId: payload.toUserId,
          sessionId: payload.sessionId,
          correlationId: payload.correlationId,
          payload: payload.payload,
          metadata: payload.metadata,
        }),
        uuid: payload.uuid,
        replyToId: payload.replyToId,
        forwardFromId: payload.forwardFromId,
        clientSeq: payload.clientSeq,
        idempotencyKey: payload.idempotencyKey,
        extra: payload.extra,
      }),
    );
  }
}
