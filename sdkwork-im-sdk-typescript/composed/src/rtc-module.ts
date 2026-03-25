import {
  isRecord,
  normalizeActionSuccess,
  pickString,
  type OpenChatSdkContext,
} from './sdk-context';
import type {
  OpenChatRealtimeSession,
  OpenChatRtcAnswerOptions,
  OpenChatRtcConnectionInfo,
  OpenChatRtcConnectionRequest,
  OpenChatRtcConversationTarget,
  OpenChatRtcCustomSignalOptions,
  OpenChatRtcIceCandidateOptions,
  OpenChatRtcOfferOptions,
  OpenChatRtcProviderConfig,
  OpenChatRtcRealtimeInfo,
  OpenChatRtcSignalOptions,
  OpenChatRtcSignalingInfo,
} from './types';

function isRtcCustomSignalOptions(
  value: unknown,
): value is OpenChatRtcCustomSignalOptions {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as OpenChatRtcCustomSignalOptions).eventName === 'string' &&
    typeof (value as OpenChatRtcCustomSignalOptions).signalType === 'string'
  );
}

function resolveCustomSignalArgs(
  eventNameOrPayload: string | OpenChatRtcCustomSignalOptions,
  payload?: OpenChatRtcSignalOptions,
): OpenChatRtcCustomSignalOptions {
  if (isRtcCustomSignalOptions(eventNameOrPayload)) {
    return eventNameOrPayload;
  }

  if (!payload) {
    throw new Error(
      'rtc.signaling.sendCustom requires either { eventName, signalType, ...payload } or (eventName, payload).',
    );
  }

  return {
    ...payload,
    eventName: eventNameOrPayload,
    signalType: eventNameOrPayload,
  };
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((item) => pickString(item))
    .filter((item): item is string => typeof item === 'string');
}

function normalizeRtcConversationTarget(
  value: unknown,
): OpenChatRtcConversationTarget | undefined {
  if (!isRecord(value)) {
    return undefined;
  }
  return {
    conversationType: pickString(value.conversationType) ?? 'GROUP',
    targetId: pickString(value.targetId) ?? '',
  };
}

function normalizeRtcSignalingInfo(value: unknown): OpenChatRtcSignalingInfo {
  const record = isRecord(value) ? value : {};
  const broadcastConversation = normalizeRtcConversationTarget(
    record.broadcastConversation,
  );
  return {
    transport: pickString(record.transport) ?? 'WUKONGIM_EVENT',
    eventType: pickString(record.eventType) ?? 'RTC_SIGNAL',
    namespace: pickString(record.namespace) ?? 'rtc',
    roomId: pickString(record.roomId) ?? '',
    directTargetField: pickString(record.directTargetField) ?? 'toUserId',
    ...(broadcastConversation ? { broadcastConversation } : {}),
    directSignalTypes: normalizeStringArray(record.directSignalTypes),
    broadcastSignalTypes: normalizeStringArray(record.broadcastSignalTypes),
  };
}

function normalizeRtcRealtimeInfo(value: unknown): OpenChatRtcRealtimeInfo {
  const record = isRecord(value) ? value : {};
  return {
    transport: pickString(record.transport) ?? 'WUKONGIM',
    uid: pickString(record.uid) ?? '',
    wsUrl: pickString(record.wsUrl) ?? '',
    ...(pickString(record.token) ? { token: pickString(record.token) } : {}),
    ...(pickString(record.apiUrl) ? { apiUrl: pickString(record.apiUrl) } : {}),
    ...(pickString(record.managerUrl)
      ? { managerUrl: pickString(record.managerUrl) }
      : {}),
    ...(pickString(record.tcpAddr) ? { tcpAddr: pickString(record.tcpAddr) } : {}),
  };
}

function normalizeRtcProviderConfig(value: unknown): OpenChatRtcProviderConfig {
  const record = isRecord(value) ? value : {};
  return {
    provider: pickString(record.provider) ?? '',
    ...(pickString(record.channelId)
      ? { channelId: pickString(record.channelId) }
      : {}),
    appId: pickString(record.appId) ?? '',
    providerRoomId: pickString(record.providerRoomId) ?? '',
    businessRoomId: pickString(record.businessRoomId) ?? '',
    userId: pickString(record.userId) ?? '',
    token: pickString(record.token) ?? '',
    ...(pickString(record.role) ? { role: pickString(record.role) } : {}),
    ...(pickString(record.expiresAt)
      ? { expiresAt: pickString(record.expiresAt) }
      : {}),
    ...(pickString(record.endpoint)
      ? { endpoint: pickString(record.endpoint) }
      : {}),
    ...(pickString(record.region) ? { region: pickString(record.region) } : {}),
    ...(isRecord(record.extras) ? { extras: record.extras } : {}),
  };
}

function normalizeRtcConnectionInfo(value: unknown): OpenChatRtcConnectionInfo {
  if (!isRecord(value)) {
    throw new Error('RTC connection info is unavailable.');
  }
  return {
    ...(isRecord(value.room) ? { room: value.room } : {}),
    ...(isRecord(value.rtcToken) ? { rtcToken: value.rtcToken } : {}),
    providerConfig: normalizeRtcProviderConfig(value.providerConfig),
    signaling: normalizeRtcSignalingInfo(value.signaling),
    realtime: normalizeRtcRealtimeInfo(value.realtime),
  };
}

function toRealtimeSession(
  realtime: OpenChatRtcRealtimeInfo,
): OpenChatRealtimeSession | undefined {
  if (!realtime.uid || !realtime.wsUrl || !realtime.token) {
    return undefined;
  }
  const extra = {
    ...(realtime.apiUrl ? { apiUrl: realtime.apiUrl } : {}),
    ...(realtime.managerUrl ? { managerUrl: realtime.managerUrl } : {}),
    ...(realtime.tcpAddr ? { tcpAddr: realtime.tcpAddr } : {}),
  };
  return {
    uid: realtime.uid,
    token: realtime.token,
    wsUrl: realtime.wsUrl,
    ...(Object.keys(extra).length > 0 ? { extra } : {}),
  };
}

export function createRealtimeModule(context: OpenChatSdkContext) {
  return {
    async connect(session?: OpenChatRealtimeSession) {
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
      throw new Error('Realtime session is unavailable. Call session.bootstrapRealtime() first.');
    },

    async disconnect() {
      if (context.realtimeAdapter) {
        await context.realtimeAdapter.disconnect();
      }
      return true;
    },

    isConnected() {
      return context.requireRealtimeAdapter().isConnected();
    },

    getSession() {
      return context.requireRealtimeAdapter().getSession() ?? context.authSession.realtime;
    },

    onMessage(listener: (frame: unknown) => void) {
      return context.requireRealtimeAdapter().onMessage(listener);
    },

    onEvent(listener: (frame: unknown) => void) {
      return context.requireRealtimeAdapter().onEvent(listener);
    },

    onRaw(listener: (frame: unknown) => void) {
      return context.requireRealtimeAdapter().onRaw(listener);
    },

    onConnectionStateChange(listener: (state: string) => void) {
      return context.requireRealtimeAdapter().onConnectionStateChange(listener);
    },
  };
}

export function createRtcModule(context: OpenChatSdkContext) {
  const getRtcConnectionInfo = async (
    roomId: string,
    request?: OpenChatRtcConnectionRequest,
  ): Promise<OpenChatRtcConnectionInfo> => {
    const response = await context.callApi(
      'rtc',
      'appControllerGetConnectionInfo',
      [roomId, request ?? {}],
      () => context.post(`/rtc/rooms/${roomId}/connection`, request ?? {}),
    );
    return normalizeRtcConnectionInfo(response);
  };

  return {
    connection: {
      get: getRtcConnectionInfo,

      async prepareCall(
        roomId: string,
        request?: OpenChatRtcConnectionRequest,
        applyRealtimeSession = true,
      ): Promise<OpenChatRtcConnectionInfo> {
        const info = await getRtcConnectionInfo(roomId, request);
        if (applyRealtimeSession) {
          const realtime = toRealtimeSession(info.realtime);
          if (realtime) {
            context.authSession = {
              ...context.authSession,
              realtime,
            };
          }
        }
        return info;
      },
    },

    rooms: {
      create: (payload: Record<string, unknown>) =>
        context.callApi('rtc', 'appControllerCreateRoom', [payload], () =>
          context.post('/rtc/rooms', payload),
        ),
      end: async (roomId: string) =>
        normalizeActionSuccess(
          await context.callApi('rtc', 'appControllerEndRoom', [roomId], () =>
            context.put(`/rtc/rooms/${roomId}/end`),
          ),
        ),
      get: (roomId: string) =>
        context.callApi('rtc', 'appControllerGetRoomById', [roomId], () =>
          context.get(`/rtc/rooms/${roomId}`),
        ),
      listByUser: (userId?: string) =>
        context.callApi('rtc', 'appControllerGetRoomsByUserId', [context.resolveCurrentUserId(userId)], () =>
          context.get(`/rtc/rooms/user/${context.resolveCurrentUserId(userId)}`),
        ),
    },

    tokens: {
      create: (payload: Record<string, unknown>) =>
        context.callApi('rtc', 'appControllerGenerateToken', [payload], () =>
          context.post('/rtc/tokens', payload),
        ),
      validate: (token: string) =>
        context.callApi('rtc', 'appControllerValidateToken', [{ token }], () =>
          context.post('/rtc/tokens/validate', { token }),
        ),
    },

    participants: {
      add: async (roomId: string, userId: string) =>
        normalizeActionSuccess(
          await context.callApi('rtc', 'appControllerAddParticipant', [roomId, { userId }], () =>
            context.post(`/rtc/rooms/${roomId}/participants`, { userId }),
          ),
        ),
      remove: async (roomId: string, userId: string) =>
        normalizeActionSuccess(
          await context.callApi('rtc', 'appControllerRemoveParticipant', [roomId, userId], () =>
            context.delete(`/rtc/rooms/${roomId}/participants/${userId}`),
          ),
        ),
    },

    providers: {
      capabilities: () =>
        context.callApi('rtc', 'appControllerGetProviderCapabilities', [], () =>
          context.get('/rtc/providers/capabilities'),
        ),
    },

    records: {
      startRoomRecording: (roomId: string, payload: Record<string, unknown> = {}) =>
        context.callApi('rtc', 'appControllerStartRoomRecording', [roomId, payload], () =>
          context.post(`/rtc/rooms/${roomId}/recordings/start`, payload),
        ),
      stopRoomRecording: (roomId: string, payload: Record<string, unknown> = {}) =>
        context.callApi('rtc', 'appControllerStopRoomRecording', [roomId, payload], () =>
          context.post(`/rtc/rooms/${roomId}/recordings/stop`, payload),
        ),
      create: (payload: Record<string, unknown>) =>
        context.callApi('rtc', 'appControllerCreateVideoRecord', [payload], () =>
          context.post('/rtc/video-records', payload),
        ),
      list: (params?: Record<string, unknown>) =>
        context.callApi('rtc', 'appControllerGetVideoRecords', [params], () =>
          context.get('/rtc/video-records', params),
        ),
      get: (recordId: string) =>
        context.callApi('rtc', 'appControllerGetVideoRecord', [recordId], () =>
          context.get(`/rtc/video-records/${recordId}`),
        ),
      delete: async (recordId: string) =>
        normalizeActionSuccess(
          await context.callApi('rtc', 'appControllerDeleteVideoRecord', [recordId], () =>
            context.delete(`/rtc/video-records/${recordId}`),
          ),
        ),
      listByRoom: (roomId: string) =>
        context.callApi('rtc', 'appControllerGetVideoRecordsByRoomId', [roomId], () =>
          context.get(`/rtc/rooms/${roomId}/video-records`),
        ),
      listByUser: (userId?: string) =>
        context.callApi('rtc', 'appControllerGetVideoRecordsByUserId', [context.resolveCurrentUserId(userId)], () =>
          context.get(`/rtc/users/${context.resolveCurrentUserId(userId)}/video-records`),
        ),
      updateStatus: (recordId: string, payload: Record<string, unknown>) =>
        context.callApi('rtc', 'appControllerUpdateVideoRecordStatus', [recordId, payload], () =>
          context.put(`/rtc/video-records/${recordId}/status`, payload),
        ),
      updateMetadata: (recordId: string, payload: Record<string, unknown>) =>
        context.callApi('rtc', 'appControllerUpdateVideoRecordMetadata', [recordId, payload], () =>
          context.put(`/rtc/video-records/${recordId}/metadata`, payload),
        ),
      sync: (recordId: string, payload: Record<string, unknown>) =>
        context.callApi('rtc', 'appControllerSyncVideoRecord', [recordId, payload], () =>
          context.post(`/rtc/video-records/${recordId}/sync`, payload),
        ),
    },

    signaling: {
      sendJoin: (payload: OpenChatRtcSignalOptions) =>
        context.sendRtcSignalEvent('rtc.join', 'join', payload),
      sendLeave: (payload: OpenChatRtcSignalOptions) =>
        context.sendRtcSignalEvent('rtc.leave', 'leave', payload),
      sendPublish: (payload: OpenChatRtcSignalOptions) =>
        context.sendRtcSignalEvent('rtc.publish', 'publish', payload),
      sendUnpublish: (payload: OpenChatRtcSignalOptions) =>
        context.sendRtcSignalEvent('rtc.unpublish', 'unpublish', payload),
      sendOffer: (payload: OpenChatRtcOfferOptions) =>
        context.sendRtcSignalEvent('rtc.offer', 'offer', {
          ...payload,
          payload: { sdp: payload.sdp },
        }),
      sendAnswer: (payload: OpenChatRtcAnswerOptions) =>
        context.sendRtcSignalEvent('rtc.answer', 'answer', {
          ...payload,
          payload: { sdp: payload.sdp },
        }),
      sendIceCandidate: (payload: OpenChatRtcIceCandidateOptions) =>
        context.sendRtcSignalEvent('rtc.ice-candidate', 'ice-candidate', {
          ...payload,
          payload: { candidate: payload.candidate },
        }),
      sendCustom: (
        eventNameOrPayload: string | OpenChatRtcCustomSignalOptions,
        payload?: OpenChatRtcSignalOptions,
      ) => {
        const customSignal = resolveCustomSignalArgs(
          eventNameOrPayload,
          payload,
        );
        return context.sendRtcSignalEvent(
          customSignal.eventName,
          customSignal.signalType,
          customSignal,
        );
      },
      subscribe: (listener: (frame: unknown) => void) =>
        context.requireRealtimeAdapter().onEvent((frame) => {
          if (
            frame.event.type === 'RTC_SIGNAL' ||
            frame.event.metadata?.namespace === 'rtc' ||
            frame.event.name?.startsWith('rtc.')
          ) {
            listener(frame);
          }
        }),
    },
  };
}
