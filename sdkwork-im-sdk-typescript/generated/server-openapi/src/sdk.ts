import { HttpClient, createHttpClient } from './http/client';
import type { SdkworkBackendConfig } from './types/common';
import type { AuthTokenManager } from '@sdkwork/sdk-common';

import { AuthApi, createAuthApi } from './api/auth';
import { UsersApi, createUsersApi } from './api/users';
import { FriendsApi, createFriendsApi } from './api/friends';
import { ContactsApi, createContactsApi } from './api/contacts';
import { MessagesApi, createMessagesApi } from './api/messages';
import { MessageSearchApi, createMessageSearchApi } from './api/message-search';
import { GroupsApi, createGroupsApi } from './api/groups';
import { ConversationsApi, createConversationsApi } from './api/conversations';
import { RtcApi, createRtcApi } from './api/rtc';
import { WukongimApi, createWukongimApi } from './api/wukongim';
import { AiBotApi, createAiBotApi } from './api/ai-bot';
import { AgentApi, createAgentApi } from './api/agent';
import { AgentMemoryApi, createAgentMemoryApi } from './api/agent-memory';
import { BotsApi, createBotsApi } from './api/bots';
import { BotsOpenApi, createBotsOpenApi } from './api/bots-open';
import { ThirdPartyApi, createThirdPartyApi } from './api/third-party';
import { IotApi, createIotApi } from './api/iot';
import { CrawApi, createCrawApi } from './api/craw';
import { TimelineApi, createTimelineApi } from './api/timeline';

export class SdkworkBackendClient {
  private httpClient: HttpClient;

  public readonly auth: AuthApi;
  public readonly users: UsersApi;
  public readonly friends: FriendsApi;
  public readonly contacts: ContactsApi;
  public readonly messages: MessagesApi;
  public readonly messageSearch: MessageSearchApi;
  public readonly groups: GroupsApi;
  public readonly conversations: ConversationsApi;
  public readonly rtc: RtcApi;
  public readonly wukongim: WukongimApi;
  public readonly aiBot: AiBotApi;
  public readonly agent: AgentApi;
  public readonly agentMemory: AgentMemoryApi;
  public readonly bots: BotsApi;
  public readonly botsOpen: BotsOpenApi;
  public readonly thirdParty: ThirdPartyApi;
  public readonly iot: IotApi;
  public readonly craw: CrawApi;
  public readonly timeline: TimelineApi;

  constructor(config: SdkworkBackendConfig) {
    this.httpClient = createHttpClient(config);
    this.auth = createAuthApi(this.httpClient);

    this.users = createUsersApi(this.httpClient);

    this.friends = createFriendsApi(this.httpClient);

    this.contacts = createContactsApi(this.httpClient);

    this.messages = createMessagesApi(this.httpClient);

    this.messageSearch = createMessageSearchApi(this.httpClient);

    this.groups = createGroupsApi(this.httpClient);

    this.conversations = createConversationsApi(this.httpClient);

    this.rtc = createRtcApi(this.httpClient);

    this.wukongim = createWukongimApi(this.httpClient);

    this.aiBot = createAiBotApi(this.httpClient);

    this.agent = createAgentApi(this.httpClient);

    this.agentMemory = createAgentMemoryApi(this.httpClient);

    this.bots = createBotsApi(this.httpClient);

    this.botsOpen = createBotsOpenApi(this.httpClient);

    this.thirdParty = createThirdPartyApi(this.httpClient);

    this.iot = createIotApi(this.httpClient);

    this.craw = createCrawApi(this.httpClient);

    this.timeline = createTimelineApi(this.httpClient);
  }

  setApiKey(apiKey: string): this {
    this.httpClient.setApiKey(apiKey);
    return this;
  }

  setAuthToken(token: string): this {
    this.httpClient.setAuthToken(token);
    return this;
  }

  setAccessToken(token: string): this {
    this.httpClient.setAccessToken(token);
    return this;
  }

  setTokenManager(manager: AuthTokenManager): this {
    this.httpClient.setTokenManager(manager);
    return this;
  }

  get http(): HttpClient {
    return this.httpClient;
  }
}

export function createClient(config: SdkworkBackendConfig): SdkworkBackendClient {
  return new SdkworkBackendClient(config);
}

export default SdkworkBackendClient;
