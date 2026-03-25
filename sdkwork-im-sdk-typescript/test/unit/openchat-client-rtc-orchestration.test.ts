import { OpenChatClient } from '../../src/openchat-client';
import { ApiService } from '../../src/services/api-service';
import { OpenChatSDKConfig, RTCRoomType } from '../../src/types';
import { RTCManager } from '../../src/rtc/rtc-manager';
import { RTCProviderType } from '../../src/rtc/types';

const testConfig: OpenChatSDKConfig = {
  server: {
    baseUrl: 'http://localhost:3000',
    timeout: 30000,
    maxRetries: 3,
  },
  im: {
    wsUrl: 'ws://localhost:3000/ws',
  },
  auth: {
    uid: 'test-user-1',
    token: 'test-token-123',
  },
};

describe('OpenChatClient RTC orchestration', () => {
  let client: OpenChatClient;

  beforeEach(() => {
    client = new OpenChatClient(testConfig);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('createRoom 应透传参数到 ApiService.createRTCRoom', async () => {
    const params = {
      type: RTCRoomType.GROUP,
      participants: ['test-user-1', 'test-user-2'],
      provider: 'tencent' as const,
      name: 'team-room',
    };
    const expected = {
      id: 'room-1',
      ...params,
      creatorId: 'test-user-1',
      status: 'active',
      startedAt: '2026-03-07T00:00:00.000Z',
    };
    const spy = jest
      .spyOn(ApiService.prototype, 'createRTCRoom')
      .mockResolvedValue(expected as any);

    const result = await client.rtc.createRoom(params);

    expect(spy).toHaveBeenCalledWith(params);
    expect(result).toEqual(expected);
  });

  test('getMyRooms 应使用当前登录 uid', async () => {
    const expected = [{ id: 'room-1' }, { id: 'room-2' }];
    const spy = jest
      .spyOn(ApiService.prototype, 'getRTCRoomsByUserId')
      .mockResolvedValue(expected as any);

    const result = await client.rtc.getMyRooms();

    expect(spy).toHaveBeenCalledWith('test-user-1');
    expect(result).toEqual(expected);
  });

  test('generateToken/validateToken 应透传参数', async () => {
    const tokenParams = {
      roomId: 'room-1',
      provider: 'volcengine' as const,
      role: 'host',
    };
    const generated = { token: 'rtc-token-1' };
    const validated = { valid: true, roomId: 'room-1', userId: 'test-user-1' };
    const generateSpy = jest
      .spyOn(ApiService.prototype, 'generateRTCToken')
      .mockResolvedValue(generated as any);
    const validateSpy = jest
      .spyOn(ApiService.prototype, 'validateRTCToken')
      .mockResolvedValue(validated as any);

    const token = await client.rtc.generateToken(tokenParams as any);
    const validation = await client.rtc.validateToken('rtc-token-1');

    expect(generateSpy).toHaveBeenCalledWith(tokenParams);
    expect(validateSpy).toHaveBeenCalledWith('rtc-token-1');
    expect(token).toEqual(generated);
    expect(validation).toEqual(validated);
  });

  test('addParticipant/removeParticipant 应透传参数', async () => {
    const addSpy = jest
      .spyOn(ApiService.prototype, 'addRTCParticipant')
      .mockResolvedValue(true);
    const removeSpy = jest
      .spyOn(ApiService.prototype, 'removeRTCParticipant')
      .mockResolvedValue(true);

    const addResult = await client.rtc.addParticipant('room-1', 'test-user-2');
    const removeResult = await client.rtc.removeParticipant('room-1', 'test-user-2');

    expect(addSpy).toHaveBeenCalledWith('room-1', 'test-user-2');
    expect(removeSpy).toHaveBeenCalledWith('room-1', 'test-user-2');
    expect(addResult).toBe(true);
    expect(removeResult).toBe(true);
  });

  test('provider capabilities stay app-facing and admin controls are absent', async () => {
    const capabilities = {
      defaultProvider: 'volcengine',
      fallbackOrder: ['volcengine'],
      activeProviders: ['volcengine'],
      providers: [],
    };
    const capabilitiesSpy = jest
      .spyOn(ApiService.prototype, 'getRTCProviderCapabilities')
      .mockResolvedValue(capabilities as any);

    const capabilitiesResult = await client.rtc.getProviderCapabilities();

    expect(capabilitiesSpy).toHaveBeenCalledTimes(1);
    expect(capabilitiesResult).toEqual(capabilities);
    expect((client.rtc as any).getProviderStats).toBeUndefined();
    expect((client.rtc as any).getProviderHealth).toBeUndefined();
  });

  test('startRecording/stopRecording 应透传 roomId 与 payload', async () => {
    const startPayload = { taskId: 'task-1', metadata: { source: 'sdk-test' } };
    const stopPayload = { taskId: 'task-1', metadata: { reason: 'manual-stop' } };
    const recording = { id: 'record-1', roomId: 'room-1', status: 'recording' };
    const stopped = { id: 'record-1', roomId: 'room-1', status: 'completed' };
    const startSpy = jest
      .spyOn(ApiService.prototype, 'startRTCRecording')
      .mockResolvedValue(recording as any);
    const stopSpy = jest
      .spyOn(ApiService.prototype, 'stopRTCRecording')
      .mockResolvedValue(stopped as any);

    const startResult = await client.rtc.startRecording('room-1', startPayload as any);
    const stopResult = await client.rtc.stopRecording('room-1', stopPayload as any);

    expect(startSpy).toHaveBeenCalledWith('room-1', startPayload);
    expect(stopSpy).toHaveBeenCalledWith('room-1', stopPayload);
    expect(startResult).toEqual(recording);
    expect(stopResult).toEqual(stopped);
  });

  test('视频记录接口应透传参数', async () => {
    const record = { id: 'record-1', roomId: 'room-1' };
    const list = [{ id: 'record-1' }, { id: 'record-2' }];
    const syncPayload = { roomId: 'room-1', taskId: 'task-1' };
    const metadata = { source: 'transcoder', retry: 1 };
    const syncSpy = jest
      .spyOn(ApiService.prototype, 'syncRTCVideoRecord')
      .mockResolvedValue(record as any);
    const metadataSpy = jest
      .spyOn(ApiService.prototype, 'updateVideoRecordMetadata')
      .mockResolvedValue(record as any);
    const roomRecordsSpy = jest
      .spyOn(ApiService.prototype, 'getVideoRecordsByRoomId')
      .mockResolvedValue(list as any);
    const myRecordsSpy = jest
      .spyOn(ApiService.prototype, 'getVideoRecords')
      .mockResolvedValue(list as any);

    const syncResult = await client.rtc.syncVideoRecord('record-1', syncPayload as any);
    const metadataResult = await client.rtc.updateVideoRecordMetadata('record-1', metadata);
    const roomRecords = await client.rtc.getRoomVideoRecords('room-1');
    const myRecords = await client.rtc.getMyVideoRecords({ status: 'completed' } as any);

    expect(syncSpy).toHaveBeenCalledWith('record-1', syncPayload);
    expect(metadataSpy).toHaveBeenCalledWith('record-1', metadata);
    expect(roomRecordsSpy).toHaveBeenCalledWith('room-1');
    expect(myRecordsSpy).toHaveBeenCalledWith({ status: 'completed' });
    expect(syncResult).toEqual(record);
    expect(metadataResult).toEqual(record);
    expect(roomRecords).toEqual(list);
    expect(myRecords).toEqual(list);
  });
  test('getConnectionInfo should proxy to ApiService and preserve payload', async () => {
    const connectionInfo = {
      room: { id: 'room-1', participants: ['test-user-1', 'test-user-2'] },
      rtcToken: { id: 'rtc-token-1', token: 'rtc-token-value' },
      providerConfig: {
        provider: 'volcengine',
        appId: '10001',
        providerRoomId: 'volc-room-1',
        businessRoomId: 'room-1',
        userId: 'test-user-1',
        token: 'rtc-token-value',
      },
      signaling: {
        transport: 'WUKONGIM_EVENT',
        eventType: 'RTC_SIGNAL',
        namespace: 'rtc',
        roomId: 'room-1',
      },
      realtime: {
        transport: 'WUKONGIM',
        uid: 'test-user-1',
        wsUrl: 'ws://localhost:5172',
        token: 'wk-token',
      },
    };
    const spy = jest
      .spyOn(ApiService.prototype as any, 'getRTCConnectionInfo')
      .mockResolvedValue(connectionInfo);

    const result = await (client.rtc as any).getConnectionInfo('room-1', {
      role: 'host',
      expireSeconds: 1800,
    });

    expect(spy).toHaveBeenCalledWith('room-1', {
      role: 'host',
      expireSeconds: 1800,
    });
    expect(result).toEqual(connectionInfo);
  });

  test('prepareCall should bootstrap RTC manager from server connection info', async () => {
    const connectionInfo = {
      room: {
        id: 'room-1',
        participants: ['test-user-1', 'test-user-2'],
      },
      providerConfig: {
        provider: 'volcengine',
        appId: '10001',
        providerRoomId: 'volc-room-1',
        businessRoomId: 'room-1',
        userId: 'test-user-1',
        token: 'rtc-token-value',
      },
      realtime: {
        transport: 'WUKONGIM',
        uid: 'test-user-1',
        wsUrl: 'ws://localhost:5172',
        token: 'wk-token',
      },
    };
    const connectionSpy = jest
      .spyOn(ApiService.prototype as any, 'getRTCConnectionInfo')
      .mockResolvedValue(connectionInfo);
    const initializeSpy = jest
      .spyOn(RTCManager.prototype, 'initialize')
      .mockResolvedValue(undefined);

    const result = await (client.rtc as any).prepareCall('room-1');

    expect(connectionSpy).toHaveBeenCalledWith('room-1', undefined);
    expect(initializeSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        provider: RTCProviderType.VOLCENGINE,
        providerConfig: expect.objectContaining({
          appId: '10001',
          token: 'rtc-token-value',
        }),
      }),
    );
    expect(result).toEqual(connectionInfo);
  });
});
