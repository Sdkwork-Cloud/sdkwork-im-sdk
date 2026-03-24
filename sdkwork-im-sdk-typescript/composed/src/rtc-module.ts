import {
  normalizeActionSuccess,
  type OpenChatSdkContext,
} from './sdk-context';
import type {
  OpenChatRealtimeSession,
  OpenChatRtcAnswerOptions,
  OpenChatRtcCustomSignalOptions,
  OpenChatRtcIceCandidateOptions,
  OpenChatRtcOfferOptions,
  OpenChatRtcSignalOptions,
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
  return {
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
