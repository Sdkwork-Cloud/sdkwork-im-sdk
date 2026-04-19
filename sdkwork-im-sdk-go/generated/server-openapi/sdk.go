package generated

import (
    "github.com/sdkwork/im-sdk-generated/api"
    sdkhttp "github.com/sdkwork/im-sdk-generated/http"
)

type ImTransportClient struct {
    http *sdkhttp.Client
    Auth *api.AuthApi
    Portal *api.PortalApi
    Session *api.SessionApi
    Presence *api.PresenceApi
    Realtime *api.RealtimeApi
    Device *api.DeviceApi
    Inbox *api.InboxApi
    Conversation *api.ConversationApi
    Message *api.MessageApi
    Media *api.MediaApi
    Stream *api.StreamApi
    Rtc *api.RtcApi
}

func NewImTransportClient(baseURL string) *ImTransportClient {
    cfg := sdkhttp.NewDefaultConfig(baseURL)
    return NewImTransportClientWithConfig(cfg)
}

func NewImTransportClientWithConfig(config sdkhttp.Config) *ImTransportClient {
    client := sdkhttp.NewClient(config)
    return &ImTransportClient{
        http: client,
        Auth: api.NewAuthApi(client),
        Portal: api.NewPortalApi(client),
        Session: api.NewSessionApi(client),
        Presence: api.NewPresenceApi(client),
        Realtime: api.NewRealtimeApi(client),
        Device: api.NewDeviceApi(client),
        Inbox: api.NewInboxApi(client),
        Conversation: api.NewConversationApi(client),
        Message: api.NewMessageApi(client),
        Media: api.NewMediaApi(client),
        Stream: api.NewStreamApi(client),
        Rtc: api.NewRtcApi(client),
    }
}

func (c *ImTransportClient) SetAuthToken(token string) *ImTransportClient {
    c.http.SetAuthToken(token)
    return c
}

func (c *ImTransportClient) SetHeader(key string, value string) *ImTransportClient {
    c.http.SetHeader(key, value)
    return c
}

func (c *ImTransportClient) Http() *sdkhttp.Client {
    return c.http
}
