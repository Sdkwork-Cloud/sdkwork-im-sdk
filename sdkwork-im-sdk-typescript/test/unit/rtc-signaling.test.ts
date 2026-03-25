import { EventEmitter } from 'eventemitter3';
import { RTCManager } from '../../src/rtc/rtc-manager';
import { RTCSignaling } from '../../src/rtc/signaling';
import {
  IRTCProvider,
  RTCConfig,
  RTCProviderType,
  RTCRoomOptions,
  RTCStreamOptions,
  RTCSubscribeOptions,
  RTCLocalStream,
  RTCRemoteStream,
  RTCRoomState,
  RTCStatistics,
} from '../../src/rtc/types';
import { ChannelType, MessageStatus } from '../../src/types';
import {
  ConnectionState,
  IIMService,
  IMServiceConfig,
} from '../../src/services/im-service';

class MockIMService extends EventEmitter implements IIMService {
  connect(_config: IMServiceConfig): Promise<void> {
    return Promise.resolve();
  }

  disconnect(): void {}

  reconnect(): Promise<void> {
    return Promise.resolve();
  }

  isConnected(): boolean {
    return true;
  }

  getConnectionState(): ConnectionState {
    return ConnectionState.CONNECTED;
  }

  sendText(): Promise<any> {
    throw new Error('Not implemented in unit test');
  }

  sendImage(): Promise<any> {
    throw new Error('Not implemented in unit test');
  }

  sendAudio(): Promise<any> {
    throw new Error('Not implemented in unit test');
  }

  sendVideo(): Promise<any> {
    throw new Error('Not implemented in unit test');
  }

  sendFile(): Promise<any> {
    throw new Error('Not implemented in unit test');
  }

  sendLocation(): Promise<any> {
    throw new Error('Not implemented in unit test');
  }

  sendCard(): Promise<any> {
    throw new Error('Not implemented in unit test');
  }

  sendCharacter(): Promise<any> {
    throw new Error('Not implemented in unit test');
  }

  sendMusic(): Promise<any> {
    throw new Error('Not implemented in unit test');
  }

  sendModel3D(): Promise<any> {
    throw new Error('Not implemented in unit test');
  }

  sendCustom(): Promise<any> {
    throw new Error('Legacy custom signaling should not be used');
  }

  sendCombined(): Promise<any> {
    throw new Error('Not implemented in unit test');
  }

  forwardMessage(): Promise<any> {
    throw new Error('Not implemented in unit test');
  }

  replyMessage(): Promise<any> {
    throw new Error('Not implemented in unit test');
  }

  translateMessage(): Promise<{ original: string; translated: string }> {
    throw new Error('Not implemented in unit test');
  }

  recallMessage(): Promise<boolean> {
    throw new Error('Not implemented in unit test');
  }

  deleteMessage(): Promise<boolean> {
    throw new Error('Not implemented in unit test');
  }

  getMessage(): Promise<any> {
    throw new Error('Not implemented in unit test');
  }

  getMessageList(): Promise<any[]> {
    throw new Error('Not implemented in unit test');
  }

  searchMessages(): Promise<any[]> {
    throw new Error('Not implemented in unit test');
  }

  markMessageAsRead(): Promise<void> {
    throw new Error('Not implemented in unit test');
  }

  markConversationAsRead(): Promise<void> {
    throw new Error('Not implemented in unit test');
  }

  getMessageReadReceipt(): Promise<any[]> {
    throw new Error('Not implemented in unit test');
  }

  createConversation(): Promise<any> {
    throw new Error('Not implemented in unit test');
  }

  getConversationList(): Promise<any[]> {
    throw new Error('Not implemented in unit test');
  }

  getConversation(): Promise<any> {
    throw new Error('Not implemented in unit test');
  }

  deleteConversation(): Promise<void> {
    throw new Error('Not implemented in unit test');
  }

  clearConversationMessages(): Promise<void> {
    throw new Error('Not implemented in unit test');
  }

  setConversationPinned(): Promise<void> {
    throw new Error('Not implemented in unit test');
  }

  setConversationMuted(): Promise<void> {
    throw new Error('Not implemented in unit test');
  }

  setConversationDraft(): Promise<void> {
    throw new Error('Not implemented in unit test');
  }

  getConversationDraft(): Promise<string | null> {
    throw new Error('Not implemented in unit test');
  }

  clearConversationDraft(): Promise<void> {
    throw new Error('Not implemented in unit test');
  }

  getConversationMembers(): Promise<any[]> {
    throw new Error('Not implemented in unit test');
  }

  syncMessages(): Promise<any[]> {
    throw new Error('Not implemented in unit test');
  }

  syncConversations(): Promise<any[]> {
    throw new Error('Not implemented in unit test');
  }
}

class MockRTCProvider extends EventEmitter implements IRTCProvider {
  readonly providerType = RTCProviderType.CUSTOM;
  readonly roomState = RTCRoomState.IDLE;

  async initialize(_config: RTCConfig): Promise<void> {}
  async destroy(): Promise<void> {}
  async joinRoom(_options?: RTCRoomOptions): Promise<void> {}
  async leaveRoom(): Promise<void> {}
  async createLocalStream(_options?: RTCStreamOptions): Promise<RTCLocalStream> {
    throw new Error('Not implemented for this unit test');
  }
  async destroyLocalStream(_streamId: string): Promise<void> {}
  async publishStream(_stream: RTCLocalStream): Promise<void> {}
  async unpublishStream(_streamId: string): Promise<void> {}
  async subscribeStream(
    _userId: string,
    _options?: RTCSubscribeOptions,
  ): Promise<RTCRemoteStream> {
    throw new Error('Not implemented for this unit test');
  }
  async unsubscribeStream(_userId: string): Promise<void> {}
  async switchCamera(_deviceId?: string): Promise<void> {}
  async switchMicrophone(_deviceId?: string): Promise<void> {}
  async enableVideo(_enabled: boolean): Promise<void> {}
  async enableAudio(_enabled: boolean): Promise<void> {}
  async getStatistics(): Promise<RTCStatistics> {
    return { timestamp: Date.now(), localStreams: [], remoteStreams: [] };
  }
}

describe('RTC signaling transport alignment', () => {
  afterEach(() => {
    RTCManager.unregisterProvider(RTCProviderType.CUSTOM);
    jest.restoreAllMocks();
  });

  test('RTCSignaling should send RTC events through HTTP message envelope with canonical ice-candidate naming', async () => {
    const imService = new MockIMService();
    const sendMessage = jest.fn().mockResolvedValue({ success: true });
    const onSignal = jest.fn();
    const signaling = new RTCSignaling({
      imService,
      uid: 'user-1',
      onSignal,
      sendMessage,
    } as any);

    await signaling.sendIceCandidate('room-1', 'user-2', {
      candidate: 'candidate-1',
      sdpMid: '0',
      sdpMLineIndex: 0,
    });

    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        version: 2,
        conversation: {
          type: 'SINGLE',
          targetId: 'user-2',
        },
        event: expect.objectContaining({
          type: 'RTC_SIGNAL',
          name: 'rtc.ice-candidate',
          data: expect.objectContaining({
            roomId: 'room-1',
            toUserId: 'user-2',
            signalType: 'ice-candidate',
            payload: expect.objectContaining({
              candidate: expect.objectContaining({
                candidate: 'candidate-1',
              }),
            }),
          }),
          metadata: expect.objectContaining({
            namespace: 'rtc',
            version: 1,
            roomId: 'room-1',
          }),
        }),
      }),
    );
    expect(onSignal).not.toHaveBeenCalled();
  });

  test('RTCSignaling should parse standard RTC_SIGNAL event messages from realtime channel', async () => {
    const imService = new MockIMService();
    const onSignal = jest.fn();
    const signaling = new RTCSignaling({
      imService,
      uid: 'user-1',
      onSignal,
      sendMessage: jest.fn().mockResolvedValue({ success: true }),
    } as any);

    await signaling.initialize();

    imService.emit('message_received', {
      id: 'msg-1',
      type: 'SYSTEM',
      status: MessageStatus.SENT,
      channelId: 'room-1',
      channelType: ChannelType.GROUP,
      fromUserId: 'user-2',
      timestamp: 1710000000000,
      content: {
        event: {
          type: 'RTC_SIGNAL',
          name: 'rtc.offer',
          data: {
            roomId: 'room-1',
            toUserId: 'user-1',
            signalType: 'offer',
            payload: {
              sdp: 'v=0',
            },
          },
          metadata: {
            namespace: 'rtc',
            version: 1,
            roomId: 'room-1',
          },
        },
      },
    });

    expect(onSignal).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'offer',
        roomId: 'room-1',
        userId: 'user-2',
        targetUserId: 'user-1',
        data: {
          sdp: 'v=0',
        },
        timestamp: 1710000000000,
      }),
    );
  });

  test('RTCManager should initialize realtime signaling listener and send join signal through HTTP event transport', async () => {
    RTCManager.registerProvider(
      RTCProviderType.CUSTOM,
      () => new MockRTCProvider(),
      { availability: 'custom' },
    );

    const imService = new MockIMService();
    const onSpy = jest.spyOn(imService, 'on');
    const sendMessage = jest.fn().mockResolvedValue({ success: true });
    const manager = new RTCManager({
      imService,
      uid: 'user-1',
      sendMessage,
    } as any);

    await manager.initialize({
      provider: RTCProviderType.CUSTOM,
      providerConfig: {
        appId: 'rtc-app-id',
      },
    });
    await manager.startCall('room-1');

    expect(onSpy).toHaveBeenCalledWith(
      'message_received',
      expect.any(Function),
    );
    expect(sendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        version: 2,
        conversation: {
          type: 'GROUP',
          targetId: 'room-1',
        },
        event: expect.objectContaining({
          type: 'RTC_SIGNAL',
          name: 'rtc.join',
          data: expect.objectContaining({
            roomId: 'room-1',
            signalType: 'join',
          }),
        }),
      }),
    );
  });
});
