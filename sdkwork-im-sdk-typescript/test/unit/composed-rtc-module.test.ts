import { createRtcModule } from '../../composed/src/rtc-module';

describe('composed rtc module connection helpers', () => {
  test('connection.get should request aggregated rtc bootstrap info through the app-facing API surface', async () => {
    const connectionInfo = {
      room: {
        id: 'room-1',
        participants: ['user-1', 'user-2'],
      },
      rtcToken: {
        id: 'rtc-token-1',
        token: 'rtc-token-value',
      },
      providerConfig: {
        provider: 'volcengine',
        channelId: 'channel-1',
        appId: '10001',
        providerRoomId: 'volc-room-1',
        businessRoomId: 'room-1',
        userId: 'user-1',
        token: 'provider-token',
        role: 'host',
        endpoint: 'https://rtc.example.com',
        region: 'cn-north-1',
        extras: {
          cluster: 'beijing-a',
        },
      },
      signaling: {
        transport: 'WUKONGIM_EVENT',
        eventType: 'RTC_SIGNAL',
        namespace: 'rtc',
        roomId: 'room-1',
        directTargetField: 'toUserId',
        broadcastConversation: {
          conversationType: 'GROUP',
          targetId: 'room-1',
        },
        directSignalTypes: ['offer', 'answer', 'ice-candidate'],
        broadcastSignalTypes: ['join', 'leave', 'publish', 'unpublish'],
      },
      realtime: {
        transport: 'WUKONGIM',
        uid: 'user-1',
        wsUrl: 'wss://im.example.com/ws',
        token: 'wk-token',
        apiUrl: 'https://im.example.com',
        managerUrl: 'https://im.example.com/manager',
        tcpAddr: 'tcp://im.example.com:5100',
      },
    };
    const callApi = jest.fn().mockResolvedValue(connectionInfo);
    const rtc = createRtcModule({
      authSession: {},
      callApi,
      post: jest.fn(),
    } as any);

    const result = await rtc.connection.get('room-1', {
      provider: 'volcengine',
      role: 'host',
      includeRealtimeToken: true,
    });

    expect(callApi).toHaveBeenCalledWith(
      'rtc',
      'appControllerGetConnectionInfo',
      [
        'room-1',
        {
          provider: 'volcengine',
          role: 'host',
          includeRealtimeToken: true,
        },
      ],
      expect.any(Function),
    );
    expect(result).toEqual(connectionInfo);
  });

  test('connection.prepareCall should apply the returned realtime bootstrap to the sdk session by default', async () => {
    const callApi = jest.fn().mockResolvedValue({
      room: {
        id: 'room-1',
      },
      rtcToken: {
        id: 'rtc-token-1',
        token: 'rtc-token-value',
      },
      providerConfig: {
        provider: 'volcengine',
        appId: '10001',
        providerRoomId: 'volc-room-1',
        businessRoomId: 'room-1',
        userId: 'user-1',
        token: 'provider-token',
      },
      signaling: {
        transport: 'WUKONGIM_EVENT',
        eventType: 'RTC_SIGNAL',
        namespace: 'rtc',
        roomId: 'room-1',
        directTargetField: 'toUserId',
        broadcastConversation: {
          conversationType: 'GROUP',
          targetId: 'room-1',
        },
        directSignalTypes: ['offer'],
        broadcastSignalTypes: ['join'],
      },
      realtime: {
        transport: 'WUKONGIM',
        uid: 'user-1',
        wsUrl: 'wss://im.example.com/ws',
        token: 'wk-token',
        apiUrl: 'https://im.example.com',
      },
    });
    const context = {
      authSession: {
        token: 'access-token',
      },
      callApi,
      post: jest.fn(),
    } as any;
    const rtc = createRtcModule(context);

    const result = await rtc.connection.prepareCall('room-1', {
      includeRealtimeToken: true,
    });

    expect(result.realtime).toEqual({
      transport: 'WUKONGIM',
      uid: 'user-1',
      wsUrl: 'wss://im.example.com/ws',
      token: 'wk-token',
      apiUrl: 'https://im.example.com',
    });
    expect(context.authSession).toEqual({
      token: 'access-token',
      realtime: {
        uid: 'user-1',
        token: 'wk-token',
        wsUrl: 'wss://im.example.com/ws',
        extra: {
          apiUrl: 'https://im.example.com',
        },
      },
    });
  });
});
