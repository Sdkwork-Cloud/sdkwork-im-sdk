import Foundation
import SDKworkCommon

public class SdkworkBackendClient {
    private let httpClient: HttpClient
    public let auth: AuthApi
    public let users: UsersApi
    public let friends: FriendsApi
    public let contacts: ContactsApi
    public let messages: MessagesApi
    public let messageSearch: MessageSearchApi
    public let groups: GroupsApi
    public let conversations: ConversationsApi
    public let rtc: RtcApi
    public let wukongim: WukongimApi
    public let aiBot: AiBotApi
    public let agent: AgentApi
    public let agentMemory: AgentMemoryApi
    public let bots: BotsApi
    public let botsOpen: BotsOpenApi
    public let thirdParty: ThirdPartyApi
    public let iot: IotApi
    public let craw: CrawApi
    public let timeline: TimelineApi

    public init(baseURL: String) {
        self.httpClient = HttpClient(baseURL: baseURL)
        self.auth = AuthApi(client: httpClient)
        self.users = UsersApi(client: httpClient)
        self.friends = FriendsApi(client: httpClient)
        self.contacts = ContactsApi(client: httpClient)
        self.messages = MessagesApi(client: httpClient)
        self.messageSearch = MessageSearchApi(client: httpClient)
        self.groups = GroupsApi(client: httpClient)
        self.conversations = ConversationsApi(client: httpClient)
        self.rtc = RtcApi(client: httpClient)
        self.wukongim = WukongimApi(client: httpClient)
        self.aiBot = AiBotApi(client: httpClient)
        self.agent = AgentApi(client: httpClient)
        self.agentMemory = AgentMemoryApi(client: httpClient)
        self.bots = BotsApi(client: httpClient)
        self.botsOpen = BotsOpenApi(client: httpClient)
        self.thirdParty = ThirdPartyApi(client: httpClient)
        self.iot = IotApi(client: httpClient)
        self.craw = CrawApi(client: httpClient)
        self.timeline = TimelineApi(client: httpClient)
    }

    public init(config: SdkConfig) {
        self.httpClient = HttpClient(config: config)
        self.auth = AuthApi(client: httpClient)
        self.users = UsersApi(client: httpClient)
        self.friends = FriendsApi(client: httpClient)
        self.contacts = ContactsApi(client: httpClient)
        self.messages = MessagesApi(client: httpClient)
        self.messageSearch = MessageSearchApi(client: httpClient)
        self.groups = GroupsApi(client: httpClient)
        self.conversations = ConversationsApi(client: httpClient)
        self.rtc = RtcApi(client: httpClient)
        self.wukongim = WukongimApi(client: httpClient)
        self.aiBot = AiBotApi(client: httpClient)
        self.agent = AgentApi(client: httpClient)
        self.agentMemory = AgentMemoryApi(client: httpClient)
        self.bots = BotsApi(client: httpClient)
        self.botsOpen = BotsOpenApi(client: httpClient)
        self.thirdParty = ThirdPartyApi(client: httpClient)
        self.iot = IotApi(client: httpClient)
        self.craw = CrawApi(client: httpClient)
        self.timeline = TimelineApi(client: httpClient)
    }

    public func setApiKey(_ apiKey: String) -> SdkworkBackendClient {
        httpClient.setApiKey(apiKey)
        return self
    }

    public func setAuthToken(_ token: String) -> SdkworkBackendClient {
        httpClient.setAuthToken(token)
        return self
    }

    public func setAccessToken(_ token: String) -> SdkworkBackendClient {
        httpClient.setAccessToken(token)
        return self
    }

    public func setHeader(_ key: String, value: String) -> SdkworkBackendClient {
        httpClient.setHeader(key, value: value)
        return self
    }
}
