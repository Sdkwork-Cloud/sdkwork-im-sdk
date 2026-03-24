package com.sdkwork.backend;

import com.sdkwork.common.core.Types;
import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.api.AuthApi;
import com.sdkwork.backend.api.UsersApi;
import com.sdkwork.backend.api.FriendsApi;
import com.sdkwork.backend.api.ContactsApi;
import com.sdkwork.backend.api.MessagesApi;
import com.sdkwork.backend.api.MessageSearchApi;
import com.sdkwork.backend.api.GroupsApi;
import com.sdkwork.backend.api.ConversationsApi;
import com.sdkwork.backend.api.RtcApi;
import com.sdkwork.backend.api.WukongimApi;
import com.sdkwork.backend.api.AiBotApi;
import com.sdkwork.backend.api.AgentApi;
import com.sdkwork.backend.api.AgentMemoryApi;
import com.sdkwork.backend.api.BotsApi;
import com.sdkwork.backend.api.BotsOpenApi;
import com.sdkwork.backend.api.ThirdPartyApi;
import com.sdkwork.backend.api.IotApi;
import com.sdkwork.backend.api.CrawApi;
import com.sdkwork.backend.api.TimelineApi;

public class SdkworkBackendClient {
    private final HttpClient httpClient;
    private AuthApi auth;
    private UsersApi users;
    private FriendsApi friends;
    private ContactsApi contacts;
    private MessagesApi messages;
    private MessageSearchApi messageSearch;
    private GroupsApi groups;
    private ConversationsApi conversations;
    private RtcApi rtc;
    private WukongimApi wukongim;
    private AiBotApi aiBot;
    private AgentApi agent;
    private AgentMemoryApi agentMemory;
    private BotsApi bots;
    private BotsOpenApi botsOpen;
    private ThirdPartyApi thirdParty;
    private IotApi iot;
    private CrawApi craw;
    private TimelineApi timeline;

    public SdkworkBackendClient(String baseUrl) {
        this.httpClient = new HttpClient(baseUrl);
        this.auth = new AuthApi(httpClient);
        this.users = new UsersApi(httpClient);
        this.friends = new FriendsApi(httpClient);
        this.contacts = new ContactsApi(httpClient);
        this.messages = new MessagesApi(httpClient);
        this.messageSearch = new MessageSearchApi(httpClient);
        this.groups = new GroupsApi(httpClient);
        this.conversations = new ConversationsApi(httpClient);
        this.rtc = new RtcApi(httpClient);
        this.wukongim = new WukongimApi(httpClient);
        this.aiBot = new AiBotApi(httpClient);
        this.agent = new AgentApi(httpClient);
        this.agentMemory = new AgentMemoryApi(httpClient);
        this.bots = new BotsApi(httpClient);
        this.botsOpen = new BotsOpenApi(httpClient);
        this.thirdParty = new ThirdPartyApi(httpClient);
        this.iot = new IotApi(httpClient);
        this.craw = new CrawApi(httpClient);
        this.timeline = new TimelineApi(httpClient);
    }

    public SdkworkBackendClient(Types.SdkConfig config) {
        this.httpClient = new HttpClient(config);
        this.auth = new AuthApi(httpClient);
        this.users = new UsersApi(httpClient);
        this.friends = new FriendsApi(httpClient);
        this.contacts = new ContactsApi(httpClient);
        this.messages = new MessagesApi(httpClient);
        this.messageSearch = new MessageSearchApi(httpClient);
        this.groups = new GroupsApi(httpClient);
        this.conversations = new ConversationsApi(httpClient);
        this.rtc = new RtcApi(httpClient);
        this.wukongim = new WukongimApi(httpClient);
        this.aiBot = new AiBotApi(httpClient);
        this.agent = new AgentApi(httpClient);
        this.agentMemory = new AgentMemoryApi(httpClient);
        this.bots = new BotsApi(httpClient);
        this.botsOpen = new BotsOpenApi(httpClient);
        this.thirdParty = new ThirdPartyApi(httpClient);
        this.iot = new IotApi(httpClient);
        this.craw = new CrawApi(httpClient);
        this.timeline = new TimelineApi(httpClient);
    }

    public AuthApi getAuth() {
        return this.auth;
    }

    public UsersApi getUsers() {
        return this.users;
    }

    public FriendsApi getFriends() {
        return this.friends;
    }

    public ContactsApi getContacts() {
        return this.contacts;
    }

    public MessagesApi getMessages() {
        return this.messages;
    }

    public MessageSearchApi getMessageSearch() {
        return this.messageSearch;
    }

    public GroupsApi getGroups() {
        return this.groups;
    }

    public ConversationsApi getConversations() {
        return this.conversations;
    }

    public RtcApi getRtc() {
        return this.rtc;
    }

    public WukongimApi getWukongim() {
        return this.wukongim;
    }

    public AiBotApi getAiBot() {
        return this.aiBot;
    }

    public AgentApi getAgent() {
        return this.agent;
    }

    public AgentMemoryApi getAgentMemory() {
        return this.agentMemory;
    }

    public BotsApi getBots() {
        return this.bots;
    }

    public BotsOpenApi getBotsOpen() {
        return this.botsOpen;
    }

    public ThirdPartyApi getThirdParty() {
        return this.thirdParty;
    }

    public IotApi getIot() {
        return this.iot;
    }

    public CrawApi getCraw() {
        return this.craw;
    }

    public TimelineApi getTimeline() {
        return this.timeline;
    }

    public SdkworkBackendClient setApiKey(String apiKey) {
        httpClient.setApiKey(apiKey);
        return this;
    }

    public SdkworkBackendClient setAuthToken(String token) {
        httpClient.setAuthToken(token);
        return this;
    }

    public SdkworkBackendClient setAccessToken(String token) {
        httpClient.setAccessToken(token);
        return this;
    }

    public SdkworkBackendClient setHeader(String key, String value) {
        httpClient.setHeader(key, value);
        return this;
    }

    public HttpClient getHttpClient() {
        return httpClient;
    }
}
