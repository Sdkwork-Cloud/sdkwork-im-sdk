import Foundation

/// API modules for sdkwork-im-sdk
public struct API {
    public static let auth = AuthApi.self
    public static let users = UsersApi.self
    public static let friends = FriendsApi.self
    public static let contacts = ContactsApi.self
    public static let messages = MessagesApi.self
    public static let messageSearch = MessageSearchApi.self
    public static let groups = GroupsApi.self
    public static let conversations = ConversationsApi.self
    public static let rtc = RtcApi.self
    public static let wukongim = WukongimApi.self
    public static let aiBot = AiBotApi.self
    public static let agent = AgentApi.self
    public static let agentMemory = AgentMemoryApi.self
    public static let bots = BotsApi.self
    public static let botsOpen = BotsOpenApi.self
    public static let thirdParty = ThirdPartyApi.self
    public static let iot = IotApi.self
    public static let craw = CrawApi.self
    public static let timeline = TimelineApi.self
}
