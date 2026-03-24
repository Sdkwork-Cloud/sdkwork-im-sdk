package backend

import (
    "github.com/sdkwork/backend-sdk/api"
    sdkhttp "github.com/sdkwork/backend-sdk/http"
)

type SdkworkBackendClient struct {
    http *sdkhttp.Client
    Auth *api.AuthApi
    Users *api.UsersApi
    Friends *api.FriendsApi
    Contacts *api.ContactsApi
    Messages *api.MessagesApi
    MessageSearch *api.MessageSearchApi
    Groups *api.GroupsApi
    Conversations *api.ConversationsApi
    Rtc *api.RtcApi
    Wukongim *api.WukongimApi
    AiBot *api.AiBotApi
    Agent *api.AgentApi
    AgentMemory *api.AgentMemoryApi
    Bots *api.BotsApi
    BotsOpen *api.BotsOpenApi
    ThirdParty *api.ThirdPartyApi
    Iot *api.IotApi
    Craw *api.CrawApi
    Timeline *api.TimelineApi
}

func NewSdkworkBackendClient(baseURL string) *SdkworkBackendClient {
    cfg := sdkhttp.NewDefaultConfig(baseURL)
    return NewSdkworkBackendClientWithConfig(cfg)
}

func NewSdkworkBackendClientWithConfig(config sdkhttp.Config) *SdkworkBackendClient {
    client := sdkhttp.NewClient(config)
    return &SdkworkBackendClient{
        http: client,
        Auth: api.NewAuthApi(client),
        Users: api.NewUsersApi(client),
        Friends: api.NewFriendsApi(client),
        Contacts: api.NewContactsApi(client),
        Messages: api.NewMessagesApi(client),
        MessageSearch: api.NewMessageSearchApi(client),
        Groups: api.NewGroupsApi(client),
        Conversations: api.NewConversationsApi(client),
        Rtc: api.NewRtcApi(client),
        Wukongim: api.NewWukongimApi(client),
        AiBot: api.NewAiBotApi(client),
        Agent: api.NewAgentApi(client),
        AgentMemory: api.NewAgentMemoryApi(client),
        Bots: api.NewBotsApi(client),
        BotsOpen: api.NewBotsOpenApi(client),
        ThirdParty: api.NewThirdPartyApi(client),
        Iot: api.NewIotApi(client),
        Craw: api.NewCrawApi(client),
        Timeline: api.NewTimelineApi(client),
    }
}

func (c *SdkworkBackendClient) SetApiKey(apiKey string) *SdkworkBackendClient {
    c.http.SetApiKey(apiKey)
    return c
}

func (c *SdkworkBackendClient) SetAuthToken(token string) *SdkworkBackendClient {
    c.http.SetAuthToken(token)
    return c
}

func (c *SdkworkBackendClient) SetAccessToken(token string) *SdkworkBackendClient {
    c.http.SetAccessToken(token)
    return c
}

func (c *SdkworkBackendClient) SetHeader(key string, value string) *SdkworkBackendClient {
    c.http.SetHeader(key, value)
    return c
}

func (c *SdkworkBackendClient) Http() *sdkhttp.Client {
    return c.http
}
