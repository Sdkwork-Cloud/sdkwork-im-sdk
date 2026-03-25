import { createMessagesModule } from '../../composed/src/messages-module';

describe('composed messages module compatibility helpers', () => {
  test('sendUserCard should serialize compatibility payload through CUSTOM envelope', async () => {
    const sendMessageEnvelope = jest.fn().mockResolvedValue({
      accepted: true,
    });
    const messages = createMessagesModule({
      sendMessageEnvelope,
    } as any);

    await messages.sendUserCard({
      toUserId: 'user-1',
      resource: {
        userId: 'user-2',
        nickname: 'Alice',
        avatar: 'https://example.com/avatar.png',
      },
    });

    expect(sendMessageEnvelope).toHaveBeenCalledWith(
      expect.objectContaining({
        toUserId: 'user-1',
      }),
      {
        type: 'CUSTOM',
        custom: {
          customType: 'user_card',
          data: {
            userId: 'user-2',
            nickname: 'Alice',
            avatar: 'https://example.com/avatar.png',
          },
        },
      },
    );
  });

  test('sendText should forward mentionAll through extra compatibility fields', async () => {
    const sendMessageEnvelope = jest.fn().mockResolvedValue({
      accepted: true,
    });
    const messages = createMessagesModule({
      sendMessageEnvelope,
    } as any);

    await messages.sendText({
      groupId: 'group-2',
      text: '@all update',
      mentionAll: true,
    });

    expect(sendMessageEnvelope).toHaveBeenCalledWith(
      expect.objectContaining({
        groupId: 'group-2',
        extra: {
          mentionAll: true,
        },
      }),
      {
        type: 'TEXT',
        text: {
          text: '@all update',
        },
      },
    );
  });

  test('sendCombined should serialize resources through CUSTOM envelope', async () => {
    const sendMessageEnvelope = jest.fn().mockResolvedValue({
      accepted: true,
    });
    const messages = createMessagesModule({
      sendMessageEnvelope,
    } as any);

    await messages.sendCombined({
      groupId: 'group-1',
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
    });

    expect(sendMessageEnvelope).toHaveBeenCalledWith(
      expect.objectContaining({
        groupId: 'group-1',
      }),
      {
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
    );
  });
});
