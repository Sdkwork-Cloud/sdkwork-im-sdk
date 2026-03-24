import { createEventsModule } from './events-module';
import { createMessagesModule } from './messages-module';
import { createRealtimeModule, createRtcModule } from './rtc-module';
import {
  OpenChatSdkContext,
  resolveSdkOptions,
} from './sdk-context';
import { createSessionModule } from './session-module';
import {
  createContactsModule,
  createConversationsModule,
  createFriendsModule,
  createGroupsModule,
} from './social-module';
import type {
  OpenChatImSdkCreateOptions,
  OpenChatImSdkOptions,
} from './types';

export class OpenChatImSdk {
  private readonly context: OpenChatSdkContext;

  readonly session;
  readonly realtime;
  readonly messages;
  readonly events;
  readonly friends;
  readonly conversations;
  readonly groups;
  readonly contacts;
  readonly rtc;

  constructor(options: OpenChatImSdkOptions) {
    this.context = new OpenChatSdkContext(
      options.backendClient,
      options.realtimeAdapter,
    );

    this.session = createSessionModule(this.context);
    this.realtime = createRealtimeModule(this.context);
    this.messages = createMessagesModule(this.context);
    this.events = createEventsModule(this.context);
    this.friends = createFriendsModule(this.context);
    this.conversations = createConversationsModule(this.context);
    this.groups = createGroupsModule(this.context);
    this.contacts = createContactsModule(this.context);
    this.rtc = createRtcModule(this.context);
  }

  static async create(
    options: OpenChatImSdkCreateOptions,
  ): Promise<OpenChatImSdk> {
    const resolved = await resolveSdkOptions(options);
    return new OpenChatImSdk(resolved);
  }
}
