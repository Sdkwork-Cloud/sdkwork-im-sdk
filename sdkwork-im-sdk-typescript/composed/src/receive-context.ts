import type { ImInternalReceiverEvent } from './receiver-internal-types.js';
import type {
  ImDataContext,
  ImMessageContext,
  ImReceiveContext,
  ImReceiveSource,
  ImSignalContext,
  ImUnknownContext,
  RealtimeAckState,
} from './types.js';

export function toReceiveContext(
  event: ImInternalReceiverEvent,
  source: ImReceiveSource,
  ack: () => Promise<RealtimeAckState>,
): ImReceiveContext {
  const base = {
    sequence: event.realtimeSeq,
    source,
    receivedAt: event.rawEvent.occurredAt,
    sender: {
      principalId: event.rawEvent.principalId,
      deviceId: event.rawEvent.deviceId,
    },
    eventType: event.eventType,
    scopeType: event.scopeType,
    scopeId: event.scopeId,
    payload: event.payload,
    rawEvent: event.rawEvent,
    ack,
  };

  switch (event.kind) {
    case 'message':
      return {
        kind: 'message',
        ...base,
        messageId: event.messageId,
        conversationId: event.conversationId,
        message: event.message,
      } satisfies ImMessageContext;
    case 'data':
      return {
        kind: 'data',
        ...base,
        data: event.data,
      } satisfies ImDataContext;
    case 'rtc_signal':
      return {
        kind: 'signal',
        ...base,
        signal: event.signal,
      } satisfies ImSignalContext;
    default:
      return {
        kind: 'unknown',
        ...base,
      } satisfies ImUnknownContext;
  }
}
