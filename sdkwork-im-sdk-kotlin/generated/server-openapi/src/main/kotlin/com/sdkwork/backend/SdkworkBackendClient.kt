package com.sdkwork.backend

import com.sdkwork.common.core.SdkConfig
import com.sdkwork.backend.http.HttpClient
import com.sdkwork.backend.api.AuthApi
import com.sdkwork.backend.api.UsersApi
import com.sdkwork.backend.api.FriendsApi
import com.sdkwork.backend.api.ContactsApi
import com.sdkwork.backend.api.MessagesApi
import com.sdkwork.backend.api.MessageSearchApi
import com.sdkwork.backend.api.GroupsApi
import com.sdkwork.backend.api.ConversationsApi
import com.sdkwork.backend.api.RtcApi
import com.sdkwork.backend.api.WukongimApi
import com.sdkwork.backend.api.AiBotApi
import com.sdkwork.backend.api.AgentApi
import com.sdkwork.backend.api.AgentMemoryApi
import com.sdkwork.backend.api.BotsApi
import com.sdkwork.backend.api.BotsOpenApi
import com.sdkwork.backend.api.ThirdPartyApi
import com.sdkwork.backend.api.IotApi
import com.sdkwork.backend.api.CrawApi
import com.sdkwork.backend.api.TimelineApi

class SdkworkBackendClient {
    private val httpClient: HttpClient

    lateinit var auth: AuthApi
    lateinit var users: UsersApi
    lateinit var friends: FriendsApi
    lateinit var contacts: ContactsApi
    lateinit var messages: MessagesApi
    lateinit var messageSearch: MessageSearchApi
    lateinit var groups: GroupsApi
    lateinit var conversations: ConversationsApi
    lateinit var rtc: RtcApi
    lateinit var wukongim: WukongimApi
    lateinit var aiBot: AiBotApi
    lateinit var agent: AgentApi
    lateinit var agentMemory: AgentMemoryApi
    lateinit var bots: BotsApi
    lateinit var botsOpen: BotsOpenApi
    lateinit var thirdParty: ThirdPartyApi
    lateinit var iot: IotApi
    lateinit var craw: CrawApi
    lateinit var timeline: TimelineApi

    constructor(baseUrl: String) {
        this.httpClient = HttpClient(baseUrl)
        auth = AuthApi(httpClient)
        users = UsersApi(httpClient)
        friends = FriendsApi(httpClient)
        contacts = ContactsApi(httpClient)
        messages = MessagesApi(httpClient)
        messageSearch = MessageSearchApi(httpClient)
        groups = GroupsApi(httpClient)
        conversations = ConversationsApi(httpClient)
        rtc = RtcApi(httpClient)
        wukongim = WukongimApi(httpClient)
        aiBot = AiBotApi(httpClient)
        agent = AgentApi(httpClient)
        agentMemory = AgentMemoryApi(httpClient)
        bots = BotsApi(httpClient)
        botsOpen = BotsOpenApi(httpClient)
        thirdParty = ThirdPartyApi(httpClient)
        iot = IotApi(httpClient)
        craw = CrawApi(httpClient)
        timeline = TimelineApi(httpClient)
    }

    constructor(config: SdkConfig) {
        this.httpClient = HttpClient(config)
        auth = AuthApi(httpClient)
        users = UsersApi(httpClient)
        friends = FriendsApi(httpClient)
        contacts = ContactsApi(httpClient)
        messages = MessagesApi(httpClient)
        messageSearch = MessageSearchApi(httpClient)
        groups = GroupsApi(httpClient)
        conversations = ConversationsApi(httpClient)
        rtc = RtcApi(httpClient)
        wukongim = WukongimApi(httpClient)
        aiBot = AiBotApi(httpClient)
        agent = AgentApi(httpClient)
        agentMemory = AgentMemoryApi(httpClient)
        bots = BotsApi(httpClient)
        botsOpen = BotsOpenApi(httpClient)
        thirdParty = ThirdPartyApi(httpClient)
        iot = IotApi(httpClient)
        craw = CrawApi(httpClient)
        timeline = TimelineApi(httpClient)
    }

    fun setApiKey(apiKey: String): SdkworkBackendClient {
        httpClient.setApiKey(apiKey)
        return this
    }

    fun setAuthToken(token: String): SdkworkBackendClient {
        httpClient.setAuthToken(token)
        return this
    }

    fun setAccessToken(token: String): SdkworkBackendClient {
        httpClient.setAccessToken(token)
        return this
    }

    fun setHeader(key: String, value: String): SdkworkBackendClient {
        httpClient.setHeader(key, value)
        return this
    }
}
