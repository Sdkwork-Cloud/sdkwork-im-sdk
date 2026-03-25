import { ImMessageBuilder, normalizeSendRequest } from './builders';
import {
  normalizeActionSuccess,
  type OpenChatSdkContext,
} from './sdk-context';
import type {
  OpenChatSendCombinedOptions,
  OpenChatSendMediaOptions,
  OpenChatSendRequest,
  OpenChatSendResult,
  OpenChatSendTextOptions,
  OpenChatSendUserCardOptions,
} from './types';

export function createMessagesModule(context: OpenChatSdkContext) {
  const mediaSender =
    (factory: (resource: Record<string, unknown>) => Record<string, unknown>) =>
    (payload: OpenChatSendMediaOptions<Record<string, unknown>>) =>
      context.sendMessageEnvelope(payload, factory(payload.resource));
  const customSender =
    (customType: string) =>
    (
      payload:
        | OpenChatSendMediaOptions<Record<string, unknown>>
        | OpenChatSendUserCardOptions,
    ) =>
      context.sendMessageEnvelope(
        payload,
        ImMessageBuilder.custom({
          customType,
          data: payload.resource,
        }),
      );

  return {
    send(payload: OpenChatSendRequest): Promise<OpenChatSendResult> {
      return context.send(payload);
    },

    sendText(payload: OpenChatSendTextOptions): Promise<OpenChatSendResult> {
      return context.sendMessageEnvelope(
        {
          ...payload,
          ...(payload.mentionAll !== undefined
            ? {
                extra: {
                  ...(payload.extra ?? {}),
                  mentionAll: payload.mentionAll,
                },
              }
            : {}),
        },
        ImMessageBuilder.text(payload.text, {
          mentions: payload.mentions,
          annotations: payload.annotations,
        }),
      );
    },

    sendImage: mediaSender(ImMessageBuilder.image),
    sendAudio: mediaSender(ImMessageBuilder.audio),
    sendVideo: mediaSender(ImMessageBuilder.video),
    sendFile: mediaSender(ImMessageBuilder.file),
    sendLocation: mediaSender(ImMessageBuilder.location),
    sendCard: mediaSender(ImMessageBuilder.card),
    sendUserCard: customSender('user_card'),
    sendCustom: mediaSender(ImMessageBuilder.custom),
    sendCombined(payload: OpenChatSendCombinedOptions): Promise<OpenChatSendResult> {
      return context.sendMessageEnvelope(
        payload,
        ImMessageBuilder.custom({
          customType: 'combined',
          data: {
            resources: payload.resources,
            ...(payload.caption ? { caption: payload.caption } : {}),
          },
        }),
      );
    },
    sendSystem: mediaSender(ImMessageBuilder.system),
    sendMusic: mediaSender(ImMessageBuilder.music),
    sendDocument: mediaSender(ImMessageBuilder.document),
    sendCode: mediaSender(ImMessageBuilder.code),
    sendPpt: mediaSender(ImMessageBuilder.ppt),
    sendCharacter: mediaSender(ImMessageBuilder.character),
    sendModel3d: mediaSender(ImMessageBuilder.model3d),

    batchSend(messages: OpenChatSendRequest[]): Promise<unknown> {
      const normalizedMessages = messages.map((message) =>
        normalizeSendRequest(message),
      );
      return context.callApi(
        'messages',
        'messageControllerBatchSend',
        [{ messages: normalizedMessages }],
        () => context.post('/messages/batch', { messages: normalizedMessages }),
      );
    },

    getByUserId(userId?: string, params?: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'messages',
        'messageControllerGetByUserId',
        [context.resolveCurrentUserId(userId), params],
        () =>
          context.get(
            `/messages/user/${context.resolveCurrentUserId(userId)}`,
            params,
          ),
      );
    },

    getByGroupId(groupId: string, params?: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'messages',
        'messageControllerGetByGroupId',
        [groupId, params],
        () => context.get(`/messages/group/${groupId}`, params),
      );
    },

    getHistoryBySeq(params?: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'messages',
        'messageControllerGetHistoryBySeq',
        [params],
        () => context.get('/messages/history/seq', params),
      );
    },

    ackConversationSeq(payload: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'messages',
        'messageControllerAckConversationSeq',
        [payload],
        () => context.post('/messages/sync/ack-seq', payload),
      );
    },

    ackConversationSeqBatch(payload: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'messages',
        'messageControllerAckConversationSeqBatch',
        [payload],
        () => context.post('/messages/sync/ack-seq/batch', payload),
      );
    },

    get(id: string): Promise<unknown> {
      return context.callApi(
        'messages',
        'messageControllerGetById',
        [id],
        () => context.get(`/messages/${id}`),
      );
    },

    async delete(id: string): Promise<boolean> {
      return normalizeActionSuccess(
        await context.callApi(
          'messages',
          'messageControllerDelete',
          [id],
          () => context.delete(`/messages/${id}`),
        ),
      );
    },

    getReceipts(id: string, params?: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'messages',
        'messageControllerGetReceipts',
        [id, params],
        () => context.get(`/messages/${id}/receipts`, params),
      );
    },

    getReceiptSummary(id: string): Promise<unknown> {
      return context.callApi(
        'messages',
        'messageControllerGetReceiptSummary',
        [id],
        () => context.get(`/messages/${id}/receipt-summary`),
      );
    },

    getUnreadMembers(id: string, params?: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'messages',
        'messageControllerGetGroupUnreadMembers',
        [id, params],
        () => context.get(`/messages/${id}/unread-members`, params),
      );
    },

    getReadMembers(id: string, params?: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'messages',
        'messageControllerGetGroupReadMembers',
        [id, params],
        () => context.get(`/messages/${id}/read-members`, params),
      );
    },

    updateStatus(id: string, payload: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'messages',
        'messageControllerUpdateStatus',
        [id, payload],
        () => context.put(`/messages/${id}/status`, payload),
      );
    },

    edit(id: string, payload: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'messages',
        'messageControllerEdit',
        [id, payload],
        () => context.put(`/messages/${id}/content`, payload),
      );
    },

    getReactionSummary(id: string): Promise<unknown> {
      return context.callApi(
        'messages',
        'messageControllerGetReactionSummary',
        [id],
        () => context.get(`/messages/${id}/reactions`),
      );
    },

    setReaction(id: string, payload: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'messages',
        'messageControllerSetReaction',
        [id, payload],
        () => context.put(`/messages/${id}/reactions`, payload),
      );
    },

    markGroupAsRead(groupId: string, payload: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'messages',
        'messageControllerMarkGroupAsRead',
        [groupId, payload],
        () => context.post(`/messages/group/${groupId}/read`, payload),
      );
    },

    markAsRead(userId: string, payload: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'messages',
        'messageControllerMarkAsRead',
        [userId, payload],
        () => context.post(`/messages/${userId}/read`, payload),
      );
    },

    async recall(id: string): Promise<boolean> {
      return normalizeActionSuccess(
        await context.callApi(
          'messages',
          'messageControllerRecall',
          [id],
          () => context.post(`/messages/${id}/recall`),
        ),
      );
    },

    forward(id: string, payload: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'messages',
        'messageControllerForward',
        [id, payload],
        () => context.post(`/messages/${id}/forward`, payload),
      );
    },

    async retryFailed(id: string): Promise<boolean> {
      return normalizeActionSuccess(
        await context.callApi(
          'messages',
          'messageControllerRetryFailed',
          [id],
          () => context.post(`/messages/${id}/retry`),
        ),
      );
    },
  };
}
