using System;
using SDKwork.Common.Core;
using SdkHttpClient = Sdkwork.Im.Sdk.Generated.Http.HttpClient;
using Sdkwork.Im.Sdk.Generated.Api;

namespace Sdkwork.Im.Sdk.Generated
{
    public class ImTransportClient
    {
        private readonly SdkHttpClient _httpClient;

        public AuthApi Auth { get; }
        public PortalApi Portal { get; }
        public SessionApi Session { get; }
        public PresenceApi Presence { get; }
        public RealtimeApi Realtime { get; }
        public DeviceApi Device { get; }
        public InboxApi Inbox { get; }
        public ConversationApi Conversation { get; }
        public MessageApi Message { get; }
        public MediaApi Media { get; }
        public StreamApi Stream { get; }
        public RtcApi Rtc { get; }

        public ImTransportClient(string baseUrl)
        {
            _httpClient = new SdkHttpClient(baseUrl);
            Auth = new AuthApi(_httpClient);
            Portal = new PortalApi(_httpClient);
            Session = new SessionApi(_httpClient);
            Presence = new PresenceApi(_httpClient);
            Realtime = new RealtimeApi(_httpClient);
            Device = new DeviceApi(_httpClient);
            Inbox = new InboxApi(_httpClient);
            Conversation = new ConversationApi(_httpClient);
            Message = new MessageApi(_httpClient);
            Media = new MediaApi(_httpClient);
            Stream = new StreamApi(_httpClient);
            Rtc = new RtcApi(_httpClient);
        }

        public ImTransportClient(SdkConfig config)
        {
            _httpClient = new SdkHttpClient(config);
            Auth = new AuthApi(_httpClient);
            Portal = new PortalApi(_httpClient);
            Session = new SessionApi(_httpClient);
            Presence = new PresenceApi(_httpClient);
            Realtime = new RealtimeApi(_httpClient);
            Device = new DeviceApi(_httpClient);
            Inbox = new InboxApi(_httpClient);
            Conversation = new ConversationApi(_httpClient);
            Message = new MessageApi(_httpClient);
            Media = new MediaApi(_httpClient);
            Stream = new StreamApi(_httpClient);
            Rtc = new RtcApi(_httpClient);
        }

        public ImTransportClient SetAuthToken(string token)
        {
            _httpClient.SetAuthToken(token);
            return this;
        }

        public ImTransportClient SetHeader(string key, string value)
        {
            _httpClient.SetHeader(key, value);
            return this;
        }
    }
}
