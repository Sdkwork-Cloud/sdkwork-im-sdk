/**
 * API鏈嶅姟鍗曞厓娴嬭瘯
 * 娴嬭瘯API鏈嶅姟鐨勬牳蹇冨姛鑳? */

import { ApiService } from '../../src/services/api-service';
import { OpenChatSDKConfig } from '../../src/types';

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

describe('ApiService', () => {
  let apiService: ApiService;

  beforeEach(() => {
    apiService = new ApiService(testConfig);
  });

  describe('HTTP surface routing', () => {
    test('should route default business requests to /im/v3', async () => {
      const httpClient = jest.fn().mockResolvedValue({
        status: 200,
        data: { code: 0, message: 'ok', data: { ok: true } },
      });
      (apiService as any).httpClient = httpClient;

      const result = await (apiService as any).request({
        method: 'GET',
        url: '/auth/me',
        cache: false,
      });

      expect(httpClient).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'http://localhost:3000/im/v3/auth/me',
          method: 'GET',
        }),
      );
      expect(result).toEqual({ code: 0, message: 'ok', data: { ok: true } });
    });

    test('should keep requests on /im/v3 even when unknown surface metadata is passed', async () => {
      const httpClient = jest.fn().mockResolvedValue({
        status: 200,
        data: { code: 0, message: 'ok', data: [] },
      });
      (apiService as any).httpClient = httpClient;

      const result = await (apiService as any).request({
        method: 'GET',
        url: '/rtc/providers/stats',
        surface: 'admin',
        cache: false,
      });

      expect(httpClient).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'http://localhost:3000/im/v3/rtc/providers/stats',
          method: 'GET',
        }),
      );
      expect(result).toEqual({ code: 0, message: 'ok', data: [] });
    });

    test('should not expose admin RTC control-plane helpers in sdkwork-im-sdk', () => {
      expect((apiService as any).createRTCChannel).toBeUndefined();
      expect((apiService as any).getRTCChannels).toBeUndefined();
      expect((apiService as any).getRTCChannel).toBeUndefined();
      expect((apiService as any).updateRTCChannel).toBeUndefined();
      expect((apiService as any).deleteRTCChannel).toBeUndefined();
      expect((apiService as any).getRTCProviderStats).toBeUndefined();
      expect((apiService as any).getRTCProviderHealth).toBeUndefined();
    });
  });

  describe('鍩烘湰鍔熻兘娴嬭瘯', () => {
    test('搴旇鑳藉鍒涘缓API鏈嶅姟瀹炰緥', () => {
      expect(apiService).toBeDefined();
      expect(apiService instanceof ApiService).toBe(true);
    });

    test('搴旇鑳藉璁剧疆鍜岃幏鍙朤oken', () => {
      const testToken = 'new-test-token';
      apiService.setToken(testToken);
      expect(apiService.getToken()).toBe(testToken);
    });

    test('搴旇鑳藉澶勭悊绌篢oken', () => {
      apiService.setToken(null);
      expect(apiService.getToken()).toBeNull();
    });
  });

  describe('閿欒澶勭悊娴嬭瘯', () => {
    test('搴旇鑳藉鍒涘缓閿欒瀵硅薄', () => {
      const error = (apiService as any).createError(1001, 'Test error', { detail: 'test' });
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Test error');
      expect(error.code).toBe(1001);
      expect(error.data).toEqual({ detail: 'test' });
    });
  });

  describe('RTC鎺ュ彛鍚堝悓娴嬭瘯', () => {
    test('validateRTCToken 搴旇浣跨敤 POST body 璋冪敤 /rtc/tokens/validate', async () => {
      const expected = {
        valid: true,
        roomId: 'room-1',
        userId: 'user-1',
      };
      const requestSpy = jest
        .spyOn(apiService as any, 'request')
        .mockResolvedValue({ code: 0, message: 'ok', data: expected });

      const result = await apiService.validateRTCToken('token-abc');

      expect(requestSpy).toHaveBeenCalledWith({
        method: 'POST',
        url: '/rtc/tokens/validate',
        data: { token: 'token-abc' },
      });
      expect(result).toEqual(expected);
    });

    test('getRTCProviderCapabilities 搴旇璋冪敤 /rtc/providers/capabilities', async () => {
      const expected = {
        defaultProvider: 'volcengine',
        recommendedPrimary: 'tencent',
        fallbackOrder: ['tencent', 'volcengine'],
        activeProviders: ['tencent', 'volcengine'],
        providers: [],
      };
      const requestSpy = jest
        .spyOn(apiService as any, 'request')
        .mockResolvedValue({ code: 0, message: 'ok', data: expected });

      const result = await apiService.getRTCProviderCapabilities();

      expect(requestSpy).toHaveBeenCalledWith({
        method: 'GET',
        url: '/rtc/providers/capabilities',
      });
      expect(result).toEqual(expected);
    });

    test('getRTCConnectionInfo should call /rtc/rooms/:id/connection with POST body', async () => {
      const payload = {
        role: 'host',
        expireSeconds: 1800,
      };
      const expected = {
        room: { id: 'room-1' },
        providerConfig: {
          provider: 'volcengine',
          appId: '10001',
          providerRoomId: 'volc-room-1',
          businessRoomId: 'room-1',
          userId: 'user-1',
          token: 'rtc-token-value',
        },
      };
      const requestSpy = jest
        .spyOn(apiService as any, 'request')
        .mockResolvedValue({ code: 0, message: 'ok', data: expected });

      const result = await apiService.getRTCConnectionInfo('room-1', payload);

      expect(requestSpy).toHaveBeenCalledWith({
        method: 'POST',
        url: '/rtc/rooms/room-1/connection',
        data: payload,
      });
      expect(result).toEqual(expected);
    });

    test('startRTCRecording 搴旈€忎紶 body 鍒?start 绔偣', async () => {
      const payload = {
        taskId: 'task-1',
        metadata: { source: 'sdk-test' },
      };
      const expected = { id: 'record-1', roomId: 'room-1', status: 'recording' };
      const requestSpy = jest
        .spyOn(apiService as any, 'request')
        .mockResolvedValue({ code: 0, message: 'ok', data: expected });

      const result = await apiService.startRTCRecording('room-1', payload);

      expect(requestSpy).toHaveBeenCalledWith({
        method: 'POST',
        url: '/rtc/rooms/room-1/recordings/start',
        data: payload,
      });
      expect(result).toEqual(expected);
    });

    test('stopRTCRecording 搴旈€忎紶 body 鍒?stop 绔偣', async () => {
      const payload = {
        recordId: 'record-1',
        metadata: { reason: 'manual-stop' },
      };
      const expected = { id: 'record-1', roomId: 'room-1', status: 'completed' };
      const requestSpy = jest
        .spyOn(apiService as any, 'request')
        .mockResolvedValue({ code: 0, message: 'ok', data: expected });

      const result = await apiService.stopRTCRecording('room-1', payload);

      expect(requestSpy).toHaveBeenCalledWith({
        method: 'POST',
        url: '/rtc/rooms/room-1/recordings/stop',
        data: payload,
      });
      expect(result).toEqual(expected);
    });

    test('syncRTCVideoRecord 鏃?body 鏃朵粛搴斿懡涓?/sync 绔偣', async () => {
      const expected = { id: 'record-1', syncStatus: 'synced' };
      const requestSpy = jest
        .spyOn(apiService as any, 'request')
        .mockResolvedValue({ code: 0, message: 'ok', data: expected });

      const result = await apiService.syncRTCVideoRecord('record-1');

      expect(requestSpy).toHaveBeenCalledWith({
        method: 'POST',
        url: '/rtc/video-records/record-1/sync',
        data: undefined,
      });
      expect(result).toEqual(expected);
    });

    test('syncRTCVideoRecord 鏈?body 鏃跺簲閫忎紶鍙傛暟', async () => {
      const payload = {
        roomId: 'room-1',
        taskId: 'task-1',
      };
      const expected = { id: 'record-1', syncStatus: 'synced' };
      const requestSpy = jest
        .spyOn(apiService as any, 'request')
        .mockResolvedValue({ code: 0, message: 'ok', data: expected });

      const result = await apiService.syncRTCVideoRecord('record-1', payload);

      expect(requestSpy).toHaveBeenCalledWith({
        method: 'POST',
        url: '/rtc/video-records/record-1/sync',
        data: payload,
      });
      expect(result).toEqual(expected);
    });
  });
});

