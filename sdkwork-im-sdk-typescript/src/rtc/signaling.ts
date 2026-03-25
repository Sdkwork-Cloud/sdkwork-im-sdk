import { IIMService } from '../services/im-service';
import {
  RTCError,
  RTCErrorCode,
  RTCSignalAnswer,
  RTCSignalIceCandidate,
  RTCSignalMessage,
  RTCSignalOffer,
  RTCSignalType,
} from './types';

interface RTCSignalingConfig {
  imService: IIMService;
  uid: string;
  onSignal: (message: RTCSignalMessage) => void;
  sendMessage?: (payload: Record<string, unknown>) => Promise<unknown>;
  timeout?: number;
  maxRetries?: number;
}

interface SignalSendOptions {
  targetUserId?: string;
  requireAck?: boolean;
  timeout?: number;
}

type PendingAck = {
  resolve: () => void;
  reject: (reason?: unknown) => void;
  timer: NodeJS.Timeout;
};

type RecordValue = Record<string, any>;

export class RTCSignaling {
  private readonly imService: IIMService;
  private readonly uid: string;
  private readonly onSignal: (message: RTCSignalMessage) => void;
  private readonly sendMessage?: (payload: Record<string, unknown>) => Promise<unknown>;
  private readonly timeout: number;
  private readonly maxRetries: number;
  private readonly messageReceivedHandler: (message: unknown) => void;

  private initialized = false;
  private readonly pendingAcks = new Map<string, PendingAck>();

  private readonly SIGNAL_CUSTOM_TYPE = 'rtc_signal';
  private readonly DEFAULT_TIMEOUT = 10000;
  private readonly DEFAULT_MAX_RETRIES = 3;

  constructor(config: RTCSignalingConfig) {
    this.imService = config.imService;
    this.uid = config.uid;
    this.onSignal = config.onSignal;
    this.sendMessage = config.sendMessage;
    this.timeout = config.timeout || this.DEFAULT_TIMEOUT;
    this.maxRetries = config.maxRetries || this.DEFAULT_MAX_RETRIES;
    this.messageReceivedHandler = this.handleIMMessage.bind(this);
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      this.imService.on('message_received', this.messageReceivedHandler);
      this.initialized = true;
    } catch (error) {
      throw new RTCError(
        RTCErrorCode.SIGNALING_ERROR,
        `Failed to initialize RTC signaling: ${error instanceof Error ? error.message : 'unknown error'}`,
        error,
      );
    }
  }

  async destroy(): Promise<void> {
    if (!this.initialized) {
      return;
    }

    for (const [signalId, pending] of this.pendingAcks) {
      clearTimeout(pending.timer);
      pending.reject(
        new RTCError(
          RTCErrorCode.SIGNALING_ERROR,
          'RTC signaling was destroyed before ACK arrived',
        ),
      );
      this.pendingAcks.delete(signalId);
    }

    this.imService.off('message_received', this.messageReceivedHandler);
    this.initialized = false;
  }

  async sendJoinSignal(
    roomId: string,
    options?: SignalSendOptions,
  ): Promise<void> {
    const signal: RTCSignalMessage = {
      type: RTCSignalType.JOIN,
      roomId,
      userId: this.uid,
      timestamp: Date.now(),
      data: {
        userName: options?.targetUserId,
      },
    };
    await this.sendSignal(signal, options);
  }

  async sendLeaveSignal(
    roomId: string,
    options?: SignalSendOptions,
  ): Promise<void> {
    const signal: RTCSignalMessage = {
      type: RTCSignalType.LEAVE,
      roomId,
      userId: this.uid,
      timestamp: Date.now(),
      data: {},
    };
    await this.sendSignal(signal, options);
  }

  async sendPublishSignal(
    roomId: string,
    streamId: string,
    options?: SignalSendOptions,
  ): Promise<void> {
    const signal: RTCSignalMessage = {
      type: RTCSignalType.PUBLISH,
      roomId,
      userId: this.uid,
      timestamp: Date.now(),
      data: {
        streamId,
        hasVideo: true,
        hasAudio: true,
      },
    };
    await this.sendSignal(signal, options);
  }

  async sendUnpublishSignal(
    roomId: string,
    streamId: string,
    options?: SignalSendOptions,
  ): Promise<void> {
    const signal: RTCSignalMessage = {
      type: RTCSignalType.UNPUBLISH,
      roomId,
      userId: this.uid,
      timestamp: Date.now(),
      data: {
        streamId,
      },
    };
    await this.sendSignal(signal, options);
  }

  async sendSubscribeSignal(
    roomId: string,
    targetUserId: string,
    options?: SignalSendOptions,
  ): Promise<void> {
    const signal: RTCSignalMessage = {
      type: RTCSignalType.SUBSCRIBE,
      roomId,
      userId: this.uid,
      targetUserId,
      timestamp: Date.now(),
      data: {
        video: true,
        audio: true,
      },
    };
    await this.sendSignal(signal, { ...options, targetUserId });
  }

  async sendUnsubscribeSignal(
    roomId: string,
    targetUserId: string,
    options?: SignalSendOptions,
  ): Promise<void> {
    const signal: RTCSignalMessage = {
      type: RTCSignalType.UNSUBSCRIBE,
      roomId,
      userId: this.uid,
      targetUserId,
      timestamp: Date.now(),
      data: {},
    };
    await this.sendSignal(signal, { ...options, targetUserId });
  }

  async sendOffer(
    roomId: string,
    targetUserId: string,
    sdp: string,
    options?: SignalSendOptions,
  ): Promise<void> {
    const offerData: RTCSignalOffer = {
      sdp,
      streamId: `stream-${this.uid}`,
    };

    const signal: RTCSignalMessage = {
      type: RTCSignalType.OFFER,
      roomId,
      userId: this.uid,
      targetUserId,
      timestamp: Date.now(),
      data: offerData,
    };
    await this.sendSignal(signal, { ...options, targetUserId });
  }

  async sendAnswer(
    roomId: string,
    targetUserId: string,
    sdp: string,
    options?: SignalSendOptions,
  ): Promise<void> {
    const answerData: RTCSignalAnswer = {
      sdp,
      streamId: `stream-${this.uid}`,
    };

    const signal: RTCSignalMessage = {
      type: RTCSignalType.ANSWER,
      roomId,
      userId: this.uid,
      targetUserId,
      timestamp: Date.now(),
      data: answerData,
    };
    await this.sendSignal(signal, { ...options, targetUserId });
  }

  async sendIceCandidate(
    roomId: string,
    targetUserId: string,
    candidate: RTCIceCandidateInit,
    options?: SignalSendOptions,
  ): Promise<void> {
    const iceData: RTCSignalIceCandidate = {
      candidate,
      streamId: `stream-${this.uid}`,
    };

    const signal: RTCSignalMessage = {
      type: RTCSignalType.ICE_CANDIDATE,
      roomId,
      userId: this.uid,
      targetUserId,
      timestamp: Date.now(),
      data: iceData,
    };
    await this.sendSignal(signal, { ...options, targetUserId });
  }

  private async sendSignal(
    signal: RTCSignalMessage,
    options?: SignalSendOptions,
  ): Promise<void> {
    try {
      if (this.sendMessage) {
        await this.sendMessage(this.buildSignalEnvelope(signal, options));
      } else if (options?.targetUserId) {
        await this.imService.sendCustom({
          toUserId: options.targetUserId,
          customType: this.SIGNAL_CUSTOM_TYPE,
          data: signal,
        });
      } else {
        await this.imService.sendCustom({
          groupId: signal.roomId,
          customType: this.SIGNAL_CUSTOM_TYPE,
          data: signal,
        });
      }

      if (options?.requireAck) {
        await this.waitForAck(signal);
      }
    } catch (error) {
      throw new RTCError(
        RTCErrorCode.SIGNALING_ERROR,
        `发送信令失败: ${error instanceof Error ? error.message : '未知错误'}`,
        error,
      );
    }
  }

  private waitForAck(signal: RTCSignalMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      const signalId = `${signal.type}-${signal.timestamp}`;
      const timer = setTimeout(() => {
        this.pendingAcks.delete(signalId);
        reject(
          new RTCError(
            RTCErrorCode.SIGNALING_ERROR,
            `信令超时: ${signal.type}`,
          ),
        );
      }, this.timeout);

      this.pendingAcks.set(signalId, { resolve, reject, timer });
    });
  }

  private handleAck(signalId: string): void {
    const pending = this.pendingAcks.get(signalId);
    if (!pending) {
      return;
    }
    clearTimeout(pending.timer);
    pending.resolve();
    this.pendingAcks.delete(signalId);
  }

  private handleIMMessage(message: unknown): void {
    try {
      const signal = this.extractSignalMessage(message);
      if (!signal) {
        return;
      }

      if (!this.validateSignal(signal)) {
        console.warn('收到无效的RTC信令:', signal);
        return;
      }

      if (signal.userId === this.uid) {
        return;
      }

      if (signal.type === RTCSignalType.ACK) {
        this.handleAck(String(signal.data?.signalId || ''));
        return;
      }

      if (this.requiresAck(signal)) {
        void this.sendAck(signal);
      }

      this.onSignal(signal);
    } catch (error) {
      console.error('处理RTC信令失败:', error);
    }
  }

  private async sendAck(signal: RTCSignalMessage): Promise<void> {
    if (!signal.userId) {
      return;
    }

    const ackSignal: RTCSignalMessage = {
      type: RTCSignalType.ACK,
      roomId: signal.roomId,
      userId: this.uid,
      targetUserId: signal.userId,
      timestamp: Date.now(),
      data: {
        signalId: `${signal.type}-${signal.timestamp}`,
      },
    };

    await this.sendSignal(ackSignal, { targetUserId: signal.userId });
  }

  private validateSignal(signal: unknown): signal is RTCSignalMessage {
    const record = this.toRecord(signal);
    return !!(
      record &&
      typeof record.type === 'string' &&
      typeof record.roomId === 'string' &&
      typeof record.userId === 'string' &&
      typeof record.timestamp === 'number' &&
      record.data !== undefined
    );
  }

  private requiresAck(signal: RTCSignalMessage): boolean {
    const ackRequiredTypes = [
      RTCSignalType.OFFER,
      RTCSignalType.ANSWER,
      RTCSignalType.JOIN,
      RTCSignalType.LEAVE,
    ];
    return ackRequiredTypes.includes(signal.type);
  }

  private buildSignalEnvelope(
    signal: RTCSignalMessage,
    options?: SignalSendOptions,
  ): Record<string, unknown> {
    const signalType = this.normalizeOutgoingSignalType(signal.type);
    const payload = this.toPayloadRecord(signal.data);

    return {
      version: 2,
      conversation: options?.targetUserId
        ? {
          type: 'SINGLE',
          targetId: options.targetUserId,
        }
        : {
          type: 'GROUP',
          targetId: signal.roomId,
        },
      event: {
        type: 'RTC_SIGNAL',
        name: `rtc.${signalType}`,
        data: this.stripUndefinedValues({
          roomId: signal.roomId,
          ...(options?.targetUserId ? { toUserId: options.targetUserId } : {}),
          signalType,
          ...(Object.keys(payload).length > 0 ? { payload } : {}),
        }),
        metadata: {
          namespace: 'rtc',
          version: 1,
          roomId: signal.roomId,
        },
      },
    };
  }

  private extractSignalMessage(message: unknown): RTCSignalMessage | null {
    return (
      this.extractStandardEventSignal(message) ||
      this.extractLegacyCustomSignal(message)
    );
  }

  private extractStandardEventSignal(message: unknown): RTCSignalMessage | null {
    const messageRecord = this.toRecord(message);
    const content = this.toRecord(messageRecord?.content);
    const event = this.toRecord(content?.event);
    if (!event) {
      return null;
    }

    const eventType = this.pickString(event.type)?.toUpperCase();
    const eventName = this.pickString(event.name);
    const metadata = this.toRecord(event.metadata);
    const namespace = this.pickString(metadata?.namespace)?.toLowerCase();
    if (
      eventType !== 'RTC_SIGNAL' &&
      namespace !== 'rtc' &&
      !(eventName && eventName.startsWith('rtc.'))
    ) {
      return null;
    }

    const data = this.toRecord(event.data);
    const signalType = this.normalizeIncomingSignalType(
      this.pickString(
        data?.signalType,
        eventName?.startsWith('rtc.') ? eventName.slice(4) : undefined,
      ),
    );
    const roomId = this.pickString(
      data?.roomId,
      metadata?.roomId,
      messageRecord?.channelId,
    );
    const userId = this.pickString(messageRecord?.fromUserId, messageRecord?.fromUid);
    if (!signalType || !roomId || !userId) {
      return null;
    }

    return {
      type: signalType,
      roomId,
      userId,
      ...(this.pickString(data?.toUserId)
        ? { targetUserId: this.pickString(data?.toUserId) }
        : {}),
      data: this.toPayloadValue(data?.payload),
      timestamp: this.pickNumber(messageRecord?.timestamp) || Date.now(),
    };
  }

  private extractLegacyCustomSignal(message: unknown): RTCSignalMessage | null {
    const messageRecord = this.toRecord(message);
    if (
      this.pickString(messageRecord?.type)?.toLowerCase() !== 'custom' ||
      this.pickString(messageRecord?.customType) !== this.SIGNAL_CUSTOM_TYPE
    ) {
      return null;
    }

    const signal = this.toRecord(messageRecord?.data);
    const signalType = this.normalizeIncomingSignalType(this.pickString(signal?.type));
    const roomId = this.pickString(signal?.roomId);
    const userId = this.pickString(signal?.userId);
    if (!signalType || !roomId || !userId) {
      return null;
    }

    return {
      type: signalType,
      roomId,
      userId,
      ...(this.pickString(signal?.targetUserId)
        ? { targetUserId: this.pickString(signal?.targetUserId) }
        : {}),
      data: signal?.data,
      timestamp: this.pickNumber(signal?.timestamp) || Date.now(),
    };
  }

  private normalizeIncomingSignalType(value?: string): RTCSignalType | null {
    const normalized = value?.trim().toLowerCase().replace(/_/g, '-');
    switch (normalized) {
      case 'offer':
        return RTCSignalType.OFFER;
      case 'answer':
        return RTCSignalType.ANSWER;
      case 'ice-candidate':
        return RTCSignalType.ICE_CANDIDATE;
      case 'join':
        return RTCSignalType.JOIN;
      case 'leave':
        return RTCSignalType.LEAVE;
      case 'publish':
        return RTCSignalType.PUBLISH;
      case 'unpublish':
        return RTCSignalType.UNPUBLISH;
      case 'subscribe':
        return RTCSignalType.SUBSCRIBE;
      case 'unsubscribe':
        return RTCSignalType.UNSUBSCRIBE;
      case 'ack':
        return RTCSignalType.ACK;
      default:
        return null;
    }
  }

  private normalizeOutgoingSignalType(type: RTCSignalType): string {
    return String(type).trim().toLowerCase().replace(/_/g, '-');
  }

  private toPayloadRecord(value: unknown): Record<string, unknown> {
    const record = this.toRecord(value);
    return record ? { ...record } : {};
  }

  private toPayloadValue(value: unknown): any {
    const record = this.toRecord(value);
    if (record) {
      return record;
    }
    if (value === undefined) {
      return {};
    }
    return value;
  }

  private toRecord(value: unknown): RecordValue | null {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return null;
    }
    return value as RecordValue;
  }

  private pickString(...values: unknown[]): string | undefined {
    for (const value of values) {
      if (typeof value === 'string' && value.trim().length > 0) {
        return value.trim();
      }
    }
    return undefined;
  }

  private pickNumber(...values: unknown[]): number | undefined {
    for (const value of values) {
      if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
      }
    }
    return undefined;
  }

  private stripUndefinedValues(
    value: Record<string, unknown>,
  ): Record<string, unknown> {
    return Object.fromEntries(
      Object.entries(value).filter(([, entryValue]) => entryValue !== undefined),
    );
  }
}

export default RTCSignaling;
