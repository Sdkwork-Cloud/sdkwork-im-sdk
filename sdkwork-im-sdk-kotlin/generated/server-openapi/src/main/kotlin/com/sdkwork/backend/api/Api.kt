package com.sdkwork.backend.api

import com.sdkwork.backend.http.HttpClient

/**
 * API modules for sdkwork-im-sdk
 */
class Api(private val client: HttpClient) {
    val auth: AuthApi = AuthApi(client)
    val users: UsersApi = UsersApi(client)
    val friends: FriendsApi = FriendsApi(client)
    val contacts: ContactsApi = ContactsApi(client)
    val messages: MessagesApi = MessagesApi(client)
    val messageSearch: MessageSearchApi = MessageSearchApi(client)
    val groups: GroupsApi = GroupsApi(client)
    val conversations: ConversationsApi = ConversationsApi(client)
    val rtc: RtcApi = RtcApi(client)
    val wukongim: WukongimApi = WukongimApi(client)
    val aiBot: AiBotApi = AiBotApi(client)
    val agent: AgentApi = AgentApi(client)
    val agentMemory: AgentMemoryApi = AgentMemoryApi(client)
    val bots: BotsApi = BotsApi(client)
    val botsOpen: BotsOpenApi = BotsOpenApi(client)
    val thirdParty: ThirdPartyApi = ThirdPartyApi(client)
    val iot: IotApi = IotApi(client)
    val craw: CrawApi = CrawApi(client)
    val timeline: TimelineApi = TimelineApi(client)
}
