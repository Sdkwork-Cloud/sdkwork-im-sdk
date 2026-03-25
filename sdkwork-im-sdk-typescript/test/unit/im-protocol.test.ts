import { WukongIMProtocol } from '../../src/protocol/im-protocol';

type InitSpy = jest.MockedFunction<
  (url: string, config: Record<string, unknown>) => {
    on: jest.Mock;
    disconnect: jest.Mock;
  }
>;

function createProtocolHarness() {
  const init = jest.fn().mockReturnValue({
    on: jest.fn(),
    disconnect: jest.fn(),
  }) as InitSpy;
  const protocol = new WukongIMProtocol() as any;

  protocol.loadWKIMSDK = jest.fn().mockResolvedValue({
    WKIM: {
      init,
    },
    WKIMEvent: {
      Connect: 'connect',
      Disconnect: 'disconnect',
      Message: 'message',
      Error: 'error',
    },
  });

  return {
    protocol: protocol as WukongIMProtocol,
    init,
  };
}

describe('WukongIMProtocol connection bootstrap', () => {
  test('connect should initialize WKIM with the caller provided wsUrl', async () => {
    const { protocol, init } = createProtocolHarness();

    await protocol.connect({
      uid: 'user-1',
      token: 'token-1',
      wsUrl: 'wss://im.example.com/ws',
    } as any);

    expect(init).toHaveBeenCalledWith(
      'wss://im.example.com/ws',
      expect.objectContaining({
        uid: 'user-1',
        token: 'token-1',
        deviceFlag: 2,
      }),
    );
  });

  test('connect should also accept serverUrl for compatibility', async () => {
    const { protocol, init } = createProtocolHarness();

    await protocol.connect({
      uid: 'user-2',
      token: 'token-2',
      serverUrl: 'wss://im-backup.example.com/ws',
    } as any);

    expect(init).toHaveBeenCalledWith(
      'wss://im-backup.example.com/ws',
      expect.objectContaining({
        uid: 'user-2',
        token: 'token-2',
      }),
    );
  });

  test('connect should reject when ws endpoint is missing', async () => {
    const { protocol, init } = createProtocolHarness();

    await expect(
      protocol.connect({
        uid: 'user-3',
        token: 'token-3',
      } as any),
    ).rejects.toThrow('WukongIM WebSocket URL is required');

    expect(init).not.toHaveBeenCalled();
  });
});
