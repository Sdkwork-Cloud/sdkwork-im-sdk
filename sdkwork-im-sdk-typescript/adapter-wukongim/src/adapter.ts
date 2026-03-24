import { EventDispatcher } from './event-dispatcher';
import { normalizeRealtimeFrame } from './normalize';
import { resolveRuntime } from './runtime';
import type {
  OpenChatConnectionState,
  OpenChatRealtimeEventFrame,
  OpenChatRealtimeFrame,
  OpenChatRealtimeMessageFrame,
  OpenChatRealtimeSession,
  OpenChatWukongimAdapterConfig,
  OpenChatWukongimRuntime,
  RuntimeHandler,
} from './types';

const MESSAGE_EVENTS = ['message', 'message_received'];
const CONNECT_EVENTS = ['connect', 'connected'];
const DISCONNECT_EVENTS = ['disconnect', 'disconnected'];
const ERROR_EVENTS = ['error'];

export class OpenChatWukongimAdapter {
  private readonly config: OpenChatWukongimAdapterConfig;
  private runtime?: OpenChatWukongimRuntime;
  private session?: OpenChatRealtimeSession;
  private connectionState: OpenChatConnectionState = 'idle';
  private readonly rawDispatcher = new EventDispatcher<OpenChatRealtimeFrame>();
  private readonly messageDispatcher =
    new EventDispatcher<OpenChatRealtimeMessageFrame>();
  private readonly eventDispatcher =
    new EventDispatcher<OpenChatRealtimeEventFrame>();
  private readonly stateDispatcher =
    new EventDispatcher<OpenChatConnectionState>();
  private readonly boundHandlers = new Map<string, RuntimeHandler>();

  constructor(config: OpenChatWukongimAdapterConfig = {}) {
    this.config = config;
    this.session = config.session;
  }

  getConfig(): OpenChatWukongimAdapterConfig {
    return { ...this.config };
  }

  getSession(): OpenChatRealtimeSession | undefined {
    return this.session ? { ...this.session } : undefined;
  }

  isConnected(): boolean {
    return this.connectionState === 'connected';
  }

  async connect(
    session?: OpenChatRealtimeSession,
  ): Promise<OpenChatRealtimeSession> {
    this.setConnectionState('connecting');
    this.runtime = await resolveRuntime(this.config);
    this.bindRuntime();

    const nextSession = session ?? this.session ?? this.config.session;
    if (!nextSession) {
      throw new Error('WukongIM realtime session is required before connect');
    }

    this.session = { ...nextSession };
    await this.runtime.connect?.(this.session);
    this.setConnectionState('connected');
    return { ...this.session };
  }

  async disconnect(): Promise<void> {
    await this.runtime?.disconnect?.();
    this.setConnectionState('disconnected');
  }

  onMessage(
    listener: (frame: OpenChatRealtimeMessageFrame) => void,
  ): () => void {
    return this.messageDispatcher.subscribe(listener);
  }

  onEvent(listener: (frame: OpenChatRealtimeEventFrame) => void): () => void {
    return this.eventDispatcher.subscribe(listener);
  }

  onRaw(listener: (frame: OpenChatRealtimeFrame) => void): () => void {
    return this.rawDispatcher.subscribe(listener);
  }

  onConnectionStateChange(
    listener: (state: OpenChatConnectionState) => void,
  ): () => void {
    return this.stateDispatcher.subscribe(listener);
  }

  private bindRuntime(): void {
    if (!this.runtime) {
      return;
    }

    for (const event of [...MESSAGE_EVENTS, ...CONNECT_EVENTS, ...DISCONNECT_EVENTS, ...ERROR_EVENTS]) {
      if (this.boundHandlers.has(event)) {
        continue;
      }

      const handler = this.createRuntimeHandler(event);
      this.boundHandlers.set(event, handler);
      this.runtime.on?.(event, handler);
    }
  }

  private createRuntimeHandler(event: string): RuntimeHandler {
    if (MESSAGE_EVENTS.includes(event)) {
      return (payload?: unknown) => {
        const frame = normalizeRealtimeFrame(payload);
        if (!frame) {
          return;
        }
        this.rawDispatcher.emit(frame);
        if ('message' in frame) {
          this.messageDispatcher.emit(frame);
          return;
        }
        this.eventDispatcher.emit(frame);
      };
    }

    if (CONNECT_EVENTS.includes(event)) {
      return () => {
        this.setConnectionState('connected');
      };
    }

    if (DISCONNECT_EVENTS.includes(event)) {
      return () => {
        this.setConnectionState('disconnected');
      };
    }

    return () => {
      this.setConnectionState('error');
    };
  }

  private setConnectionState(state: OpenChatConnectionState): void {
    if (this.connectionState === state) {
      return;
    }
    this.connectionState = state;
    this.stateDispatcher.emit(state);
  }
}

export class WukongImAdapter extends OpenChatWukongimAdapter {}
