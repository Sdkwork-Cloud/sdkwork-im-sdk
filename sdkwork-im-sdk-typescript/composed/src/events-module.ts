import type {
  OpenChatPublishEventOptions,
} from './types';
import type { OpenChatSdkContext } from './sdk-context';

export function createEventsModule(context: OpenChatSdkContext) {
  return {
    publish(payload: OpenChatPublishEventOptions) {
      return context.publishEvent(payload);
    },

    publishToUser(payload: {
      userId: string;
      type: string;
      name?: string;
      data?: Record<string, unknown>;
      metadata?: Record<string, unknown>;
    }) {
      return context.publishEvent({
        ...payload,
        toUserId: payload.userId,
      });
    },

    publishToGroup(payload: {
      groupId: string;
      type: string;
      name?: string;
      data?: Record<string, unknown>;
      metadata?: Record<string, unknown>;
    }) {
      return context.publishEvent({
        ...payload,
        groupId: payload.groupId,
      });
    },

    publishGameEvent(payload: {
      groupId: string;
      name: string;
      data?: Record<string, unknown>;
      metadata?: Record<string, unknown>;
      uuid?: string;
      replyToId?: string;
      forwardFromId?: string;
      clientSeq?: number;
      idempotencyKey?: string;
      extra?: Record<string, unknown>;
      needReadReceipt?: boolean;
    }) {
      return context.publishEvent({
        type: 'GAME_EVENT',
        name: payload.name,
        data: payload.data,
        metadata: {
          namespace: 'game',
          version: 1,
          ...payload.metadata,
        },
        groupId: payload.groupId,
        uuid: payload.uuid,
        replyToId: payload.replyToId,
        forwardFromId: payload.forwardFromId,
        clientSeq: payload.clientSeq,
        idempotencyKey: payload.idempotencyKey,
        extra: payload.extra,
        needReadReceipt: payload.needReadReceipt,
      });
    },
  };
}
