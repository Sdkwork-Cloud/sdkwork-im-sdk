import { OpenChatClient } from '../../src/openchat-client';
import { ApiService } from '../../src/services/api-service';
import { WukongIMService } from '../../src/services/im-service-wukong';
import {
  ConversationType,
  MessageStatus,
  OpenChatEvent,
  OpenChatSDKConfig,
} from '../../src/types';
import { ResourceBuilder } from '../../src/types/message';

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

function buildMessage(overrides: Record<string, unknown> = {}) {
  return {
    id: 'msg-1',
    type: 'TEXT',
    content: {
      text: {
        text: 'default',
      },
    },
    status: MessageStatus.SENT,
    createdAt: '2026-03-25T00:00:00.000Z',
    updatedAt: '2026-03-25T00:00:00.000Z',
    ...overrides,
  };
}

describe('OpenChatClient message transport alignment', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('sendText should use HTTP message envelope and unwrap SendMessageResult', async () => {
    const sendMessageSpy = jest
      .spyOn(ApiService.prototype, 'sendMessage')
      .mockResolvedValue({
        success: true,
        message: buildMessage({
          content: {
            text: {
              text: 'Hello via HTTP',
            },
          },
        }),
      } as any);
    const legacySendSpy = jest
      .spyOn(WukongIMService.prototype, 'sendText')
      .mockRejectedValue(new Error('legacy transport should not be used'));

    const client = new OpenChatClient(testConfig);
    const messageSentListener = jest.fn();
    client.on(OpenChatEvent.MESSAGE_SENT, messageSentListener);
    const result = await client.im.messages.sendText({
      targetId: 'user-2',
      conversationType: ConversationType.SINGLE,
      text: 'Hello via HTTP',
      mentions: ['user-3'],
      mentionAll: true,
      replyTo: 'msg-prev',
      extras: {
        traceId: 'trace-1',
      },
    });

    expect(sendMessageSpy).toHaveBeenCalledWith({
      version: 2,
      conversation: {
        type: 'SINGLE',
        targetId: 'user-2',
      },
      message: {
        type: 'TEXT',
        text: {
          text: 'Hello via HTTP',
          mentions: ['user-3'],
        },
      },
      replyToId: 'msg-prev',
      extra: {
        traceId: 'trace-1',
        mentionAll: true,
      },
    });
    expect(legacySendSpy).not.toHaveBeenCalled();
    expect(messageSentListener).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'msg-1',
      }),
    );
    expect(result).toEqual(
      expect.objectContaining({
        id: 'msg-1',
        status: MessageStatus.SENT,
      }),
    );
  });

  test('sendImage should route optimized params to HTTP group envelope', async () => {
    const sendMessageSpy = jest
      .spyOn(ApiService.prototype, 'sendMessage')
      .mockResolvedValue({
        success: true,
        message: buildMessage({
          type: 'IMAGE',
          content: {
            image: {
              url: 'https://example.com/image.png',
            },
          },
        }),
      } as any);
    const legacySendSpy = jest
      .spyOn(WukongIMService.prototype, 'sendImage')
      .mockRejectedValue(new Error('legacy transport should not be used'));

    const client = new OpenChatClient(testConfig);
    await client.im.messages.sendImage({
      groupId: 'group-1',
      resource: ResourceBuilder.image('https://example.com/image.png', {
        width: 640,
        height: 480,
      }),
    });

    expect(sendMessageSpy).toHaveBeenCalledWith({
      version: 2,
      conversation: {
        type: 'GROUP',
        targetId: 'group-1',
      },
      message: {
        type: 'IMAGE',
        image: {
          type: 'IMAGE',
          url: 'https://example.com/image.png',
          width: 640,
          height: 480,
        },
      },
    });
    expect(legacySendSpy).not.toHaveBeenCalled();
  });

  test('sendCombined should preserve combined payload via CUSTOM message envelope', async () => {
    const sendMessageSpy = jest
      .spyOn(ApiService.prototype, 'sendMessage')
      .mockResolvedValue({
        success: true,
        message: buildMessage({
          id: 'msg-combined',
          type: 'CUSTOM',
          content: {
            custom: {
              customType: 'combined',
              data: {},
            },
          },
        }),
      } as any);
    const legacySendSpy = jest
      .spyOn(WukongIMService.prototype, 'sendCombined')
      .mockRejectedValue(new Error('legacy transport should not be used'));

    const client = new OpenChatClient(testConfig);
    await client.im.messages.sendCombined({
      toUserId: 'user-9',
      resources: [
        ResourceBuilder.image('https://example.com/1.png'),
        ResourceBuilder.image('https://example.com/2.png'),
      ],
      caption: 'album',
    });

    expect(sendMessageSpy).toHaveBeenCalledWith({
      version: 2,
      conversation: {
        type: 'SINGLE',
        targetId: 'user-9',
      },
      message: {
        type: 'CUSTOM',
        custom: {
          customType: 'combined',
          data: {
            resources: [
              {
                type: 'IMAGE',
                url: 'https://example.com/1.png',
              },
              {
                type: 'IMAGE',
                url: 'https://example.com/2.png',
              },
            ],
            caption: 'album',
          },
        },
      },
    });
    expect(legacySendSpy).not.toHaveBeenCalled();
  });

  test('sendUserCard should use versioned CUSTOM envelope for compatibility', async () => {
    const sendMessageSpy = jest
      .spyOn(ApiService.prototype, 'sendMessage')
      .mockResolvedValue(
        buildMessage({
          id: 'msg-user-card',
          type: 'CUSTOM',
          content: {
            custom: {
              customType: 'user_card',
              data: {},
            },
          },
        }) as any,
      );
    const legacySendSpy = jest
      .spyOn(WukongIMService.prototype, 'sendUserCard')
      .mockRejectedValue(new Error('legacy transport should not be used'));

    const client = new OpenChatClient(testConfig);
    const result = await client.im.messages.sendUserCard({
      toUserId: 'user-7',
      resource: {
        userId: 'user-8',
        nickname: 'Alice',
        avatar: 'https://example.com/avatar.png',
      },
    });

    expect(sendMessageSpy).toHaveBeenCalledWith({
      version: 2,
      conversation: {
        type: 'SINGLE',
        targetId: 'user-7',
      },
      message: {
        type: 'CUSTOM',
        custom: {
          customType: 'user_card',
          data: {
            userId: 'user-8',
            nickname: 'Alice',
            avatar: 'https://example.com/avatar.png',
          },
        },
      },
    });
    expect(legacySendSpy).not.toHaveBeenCalled();
    expect(result).toEqual(
      expect.objectContaining({
        id: 'msg-user-card',
      }),
    );
  });
});
