import { ImRealtimeModule } from './realtime-module.js';
import { toReceiveContext } from './receive-context.js';
import { ImWebSocketReceiver } from './websocket-receiver.js';
import { ImSdkError } from './errors.js';
import type {
  ImConnectOptions,
  ImDataContext,
  ImLiveErrorContext,
  ImLiveConnection,
  ImLiveDataStream,
  ImLiveEventStream,
  ImLiveLifecycleStream,
  ImLiveMessageStream,
  ImLiveState,
  ImMessageContext,
  ImReceiveContext,
  ImRealtimeSubscriptionGroups,
  ImSignalContext,
  ImLiveSignalStream,
  ImSubscription,
  RealtimeSubscriptionItemInput,
} from './types.js';
import type { ImSdkContext } from './sdk-context.js';

class ImLiveRuntime implements ImLiveConnection {
  private readonly stateHandlers = new Set<(state: ImLiveState) => void>();
  private readonly errorHandlers = new Set<
    (context: ImLiveErrorContext) => void
  >();
  readonly messages: ImLiveMessageStream;
  readonly data: ImLiveDataStream;
  readonly signals: ImLiveSignalStream;
  readonly events: ImLiveEventStream;
  readonly lifecycle: ImLiveLifecycleStream;
  private state: ImLiveState = {
    status: 'connected',
    updatedAt: new Date().toISOString(),
  };

  constructor(private readonly receiver: ImWebSocketReceiver) {
    this.receiver.onConnected((frame) => {
      this.updateState({
        status: 'connected',
        connectedFrame: frame,
      });
    });

    this.receiver.onRealtimeError((frame) => {
      const error = new ImSdkError('websocket_protocol_error', frame.message, {
        code: frame.code,
        requestId: frame.requestId ?? undefined,
      });
      this.emitError({
        code: frame.code,
        source: 'realtime',
        error,
        requestId: frame.requestId ?? undefined,
        frame,
      });
      this.updateState({
        status: 'error',
        error,
      });
    });

    this.receiver.onSocketError((event) => {
      const error =
        event instanceof Error
          ? event
          : new ImSdkError(
              'websocket_transport_error',
              'Realtime websocket transport error.',
            );
      this.emitError({
        code: 'socket_error',
        source: 'socket',
        error,
      });
      this.updateState({
        status: 'error',
        error,
      });
    });

    this.receiver.onClose((event) => {
      this.updateState({
        status: 'closed',
        closeEvent: event,
      });
    });

    this.messages = {
      on: (handler) => this.subscribeMessageContexts((context) => {
        handler(context.message, context);
      }),
      onConversation: (conversationId, handler) =>
        this.subscribeConversationMessages(conversationId, (context) => {
          handler(context.message, context);
        }),
    };
    this.data = {
      on: (handler) => this.subscribeDataContexts((context) => {
        handler(context.data, context);
      }),
    };
    this.signals = {
      on: (handler) => this.subscribeSignalContexts((context) => {
        handler(context.signal, context);
      }),
      onRtcSession: (rtcSessionId, handler) => {
        const normalizedRtcSessionId = String(rtcSessionId);
        return this.subscribeSignalContexts((context) => {
          if (String(context.scopeId) === normalizedRtcSessionId) {
            handler(context.signal, context);
          }
        });
      },
    };
    this.events = {
      on: (handler) => this.subscribeRawEvents(handler),
    };
    this.lifecycle = {
      onStateChange: (handler) => this.subscribeStateChanges(handler),
      onError: (handler) => this.subscribeErrors(handler),
      getState: () => this.state,
    };
  }

  private subscribeRawEvents(
    handler: (context: ImReceiveContext) => void,
  ): ImSubscription {
    return this.receiver.onEvent((event) => {
      handler(this.toContext(event));
    });
  }

  private subscribeMessageContexts(
    handler: (context: ImMessageContext) => void,
  ): ImSubscription {
    return this.receiver.onMessageEvent((event) => {
      handler(this.toContext(event) as ImMessageContext);
    });
  }

  private subscribeConversationMessages(
    conversationId: string | number,
    handler: (context: ImMessageContext) => void,
  ): ImSubscription {
    const normalizedConversationId = String(conversationId);
    return this.receiver.onMessageEvent((event) => {
      const context = this.toContext(event);
      if (
        context.kind === 'message'
        && String(context.conversationId ?? context.scopeId) === normalizedConversationId
      ) {
        handler(context);
      }
    });
  }

  private subscribeDataContexts(
    handler: (context: ImDataContext) => void,
  ): ImSubscription {
    return this.receiver.onDataEvent((event) => {
      const context = this.toContext(event);
      if (context.kind === 'data') {
        handler(context);
      }
    });
  }

  private subscribeSignalContexts(
    handler: (context: ImSignalContext) => void,
  ): ImSubscription {
    return this.receiver.onRtcSignalEvent((event) => {
      const context = this.toContext(event);
      if (context.kind === 'signal') {
        handler(context);
      }
    });
  }

  private subscribeStateChanges(
    handler: (state: ImLiveState) => void,
  ): ImSubscription {
    this.stateHandlers.add(handler);
    handler(this.state);
    return () => {
      this.stateHandlers.delete(handler);
    };
  }

  private subscribeErrors(
    handler: (context: ImLiveErrorContext) => void,
  ): ImSubscription {
    this.errorHandlers.add(handler);
    return () => {
      this.errorHandlers.delete(handler);
    };
  }

  disconnect(code?: number, reason?: string): void {
    this.receiver.close(code, reason);
  }

  private toContext(event: Parameters<typeof toReceiveContext>[0]): ImReceiveContext {
    return toReceiveContext(
      event,
      'live',
      () => this.receiver.ackWindow(event.realtimeSeq),
    );
  }

  private updateState(
    partialState: Omit<Partial<ImLiveState>, 'updatedAt'> & Pick<ImLiveState, 'status'>,
  ): void {
    this.state = {
      ...this.state,
      ...partialState,
      updatedAt: new Date().toISOString(),
    };

    for (const handler of this.stateHandlers) {
      handler(this.state);
    }
  }

  private emitError(context: ImLiveErrorContext): void {
    for (const handler of this.errorHandlers) {
      handler(context);
    }
  }
}

export class ImLiveModule {
  constructor(private readonly context: ImSdkContext) {}

  async connect(options: ImConnectOptions = {}): Promise<ImLiveConnection> {
    const receiver = new ImWebSocketReceiver(
      new ImRealtimeModule(this.context),
      this.context,
      {
        url: options.url,
        mode: 'legacy_json',
        authToken: this.context.getAuthToken(),
        headers: options.headers,
        protocols: options.protocols,
        socket: options.socket,
        createSocket: options.socket ? undefined : this.context.webSocketFactory,
        requestTimeoutMs: options.requestTimeoutMs,
      },
    );

    try {
      if (options.deviceId) {
        await this.context.transportClient.session.resume({
          deviceId: options.deviceId,
        });
      }

      await receiver.connect();

      if (options.subscriptions) {
        await this.context.transportClient.realtime.syncRealtimeSubscriptions({
          deviceId: options.deviceId,
          items: toRealtimeSubscriptionItems(options.subscriptions),
        });
      }

      return new ImLiveRuntime(receiver);
    } catch (error) {
      receiver.close();
      throw error;
    }
  }
}

function toRealtimeSubscriptionItems(
  groups: ImRealtimeSubscriptionGroups,
): RealtimeSubscriptionItemInput[] {
  const items: RealtimeSubscriptionItemInput[] = [];

  for (const conversationId of groups.conversations ?? []) {
    items.push({
      scopeType: 'conversation',
      scopeId: String(conversationId),
      eventTypes: ['message.created', 'message.updated', 'message.recalled'],
    });
  }

  for (const rtcSessionId of groups.rtcSessions ?? []) {
    items.push({
      scopeType: 'rtc_session',
      scopeId: String(rtcSessionId),
      eventTypes: ['rtc.signal'],
    });
  }

  for (const item of groups.items ?? []) {
    items.push(item);
  }

  return items;
}
