import { decodeRealtimeEvent } from './message-codec.js';
import type { ImRealtimeModule } from './realtime-module.js';
import type {
  ImInternalRealtimeBatch,
  ImInternalReceiverDataEvent,
  ImInternalReceiverEvent,
  ImInternalReceiverMessageEvent,
  ImInternalReceiverPullAckResult,
  ImInternalReceiverRtcSignalEvent,
} from './receiver-internal-types.js';
import type {
  ImSubscription,
  QueryParams,
  RealtimeAckState,
  RealtimeEvent,
} from './types.js';

export class ImReceiver {
  private readonly anyHandlers = new Set<(event: ImInternalReceiverEvent) => void>();
  private readonly messageEventHandlers = new Set<
    (event: ImInternalReceiverMessageEvent) => void
  >();
  private readonly dataEventHandlers = new Set<
    (event: ImInternalReceiverDataEvent) => void
  >();
  private readonly rtcSignalEventHandlers = new Set<
    (event: ImInternalReceiverRtcSignalEvent) => void
  >();

  constructor(private readonly realtime: ImRealtimeModule) {}

  onEvent(handler: (event: ImInternalReceiverEvent) => void): ImSubscription {
    this.anyHandlers.add(handler);
    return () => {
      this.anyHandlers.delete(handler);
    };
  }

  onMessageEvent(
    handler: (event: ImInternalReceiverMessageEvent) => void,
  ): ImSubscription {
    this.messageEventHandlers.add(handler);
    return () => {
      this.messageEventHandlers.delete(handler);
    };
  }

  onDataEvent(
    handler: (event: ImInternalReceiverDataEvent) => void,
  ): ImSubscription {
    this.dataEventHandlers.add(handler);
    return () => {
      this.dataEventHandlers.delete(handler);
    };
  }

  onRtcSignalEvent(
    handler: (event: ImInternalReceiverRtcSignalEvent) => void,
  ): ImSubscription {
    this.rtcSignalEventHandlers.add(handler);
    return () => {
      this.rtcSignalEventHandlers.delete(handler);
    };
  }

  onScope(
    scopeType: string,
    scopeId: string | number,
    handler: (event: ImInternalReceiverEvent) => void,
  ): ImSubscription {
    const normalizedScopeId = String(scopeId);
    return this.onEvent((event) => {
      if (event.scopeType === scopeType && event.scopeId === normalizedScopeId) {
        handler(event);
      }
    });
  }

  dispatchRealtimeEvent(
    event: Parameters<typeof decodeRealtimeEvent>[0],
  ): ImInternalReceiverEvent {
    const decoded = decodeRealtimeEvent(event);

    for (const handler of this.anyHandlers) {
      handler(decoded);
    }

    if (decoded.kind === 'message') {
      for (const handler of this.messageEventHandlers) {
        handler(decoded);
      }
    } else if (decoded.kind === 'data') {
      for (const handler of this.dataEventHandlers) {
        handler(decoded);
      }
    } else if (decoded.kind === 'rtc_signal') {
      for (const handler of this.rtcSignalEventHandlers) {
        handler(decoded);
      }
    }

    return decoded;
  }

  async pull(params?: QueryParams): Promise<ImInternalRealtimeBatch> {
    const rawWindow = await this.realtime.pullEvents(params);
    const items = rawWindow.items.map((item: RealtimeEvent) =>
      this.dispatchRealtimeEvent(item),
    );
    const highestSeq = items.reduce(
      (currentMax: number, item: ImInternalReceiverEvent) =>
        Math.max(currentMax, item.realtimeSeq),
      rawWindow.ackedThroughSeq ?? 0,
    );

    return {
      items,
      highestSeq,
      rawWindow,
    };
  }

  ack(batchOrSeq: ImInternalRealtimeBatch | number): Promise<RealtimeAckState> {
    const ackedSeq =
      typeof batchOrSeq === 'number' ? batchOrSeq : batchOrSeq.highestSeq;
    return this.realtime.ackEvents({ ackedSeq });
  }

  async pullAndAck(
    params?: QueryParams,
  ): Promise<ImInternalReceiverPullAckResult> {
    const batch = await this.pull(params);
    const ack = batch.highestSeq > 0 ? await this.ack(batch) : undefined;

    return {
      batch,
      ack,
    };
  }
}
