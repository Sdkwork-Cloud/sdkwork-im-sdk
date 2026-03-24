using System;
using Backend.Http;
using SDKwork.Common.Core;
using Backend.Api;
using Backend.Api;
using Backend.Api;
using Backend.Api;
using Backend.Api;
using Backend.Api;
using Backend.Api;
using Backend.Api;
using Backend.Api;
using Backend.Api;
using Backend.Api;
using Backend.Api;
using Backend.Api;
using Backend.Api;
using Backend.Api;
using Backend.Api;
using Backend.Api;
using Backend.Api;
using Backend.Api;

namespace Backend
{
    public class SdkworkBackendClient
    {
        private readonly HttpClient _httpClient;

        public AuthApi Auth { get; }
        public UsersApi Users { get; }
        public FriendsApi Friends { get; }
        public ContactsApi Contacts { get; }
        public MessagesApi Messages { get; }
        public MessageSearchApi MessageSearch { get; }
        public GroupsApi Groups { get; }
        public ConversationsApi Conversations { get; }
        public RtcApi Rtc { get; }
        public WukongimApi Wukongim { get; }
        public AiBotApi AiBot { get; }
        public AgentApi Agent { get; }
        public AgentMemoryApi AgentMemory { get; }
        public BotsApi Bots { get; }
        public BotsOpenApi BotsOpen { get; }
        public ThirdPartyApi ThirdParty { get; }
        public IotApi Iot { get; }
        public CrawApi Craw { get; }
        public TimelineApi Timeline { get; }

        public SdkworkBackendClient(string baseUrl)
        {
            _httpClient = new HttpClient(baseUrl);
            Auth = new AuthApi(_httpClient);
            Users = new UsersApi(_httpClient);
            Friends = new FriendsApi(_httpClient);
            Contacts = new ContactsApi(_httpClient);
            Messages = new MessagesApi(_httpClient);
            MessageSearch = new MessageSearchApi(_httpClient);
            Groups = new GroupsApi(_httpClient);
            Conversations = new ConversationsApi(_httpClient);
            Rtc = new RtcApi(_httpClient);
            Wukongim = new WukongimApi(_httpClient);
            AiBot = new AiBotApi(_httpClient);
            Agent = new AgentApi(_httpClient);
            AgentMemory = new AgentMemoryApi(_httpClient);
            Bots = new BotsApi(_httpClient);
            BotsOpen = new BotsOpenApi(_httpClient);
            ThirdParty = new ThirdPartyApi(_httpClient);
            Iot = new IotApi(_httpClient);
            Craw = new CrawApi(_httpClient);
            Timeline = new TimelineApi(_httpClient);
        }

        public SdkworkBackendClient(SdkConfig config)
        {
            _httpClient = new HttpClient(config);
            Auth = new AuthApi(_httpClient);
            Users = new UsersApi(_httpClient);
            Friends = new FriendsApi(_httpClient);
            Contacts = new ContactsApi(_httpClient);
            Messages = new MessagesApi(_httpClient);
            MessageSearch = new MessageSearchApi(_httpClient);
            Groups = new GroupsApi(_httpClient);
            Conversations = new ConversationsApi(_httpClient);
            Rtc = new RtcApi(_httpClient);
            Wukongim = new WukongimApi(_httpClient);
            AiBot = new AiBotApi(_httpClient);
            Agent = new AgentApi(_httpClient);
            AgentMemory = new AgentMemoryApi(_httpClient);
            Bots = new BotsApi(_httpClient);
            BotsOpen = new BotsOpenApi(_httpClient);
            ThirdParty = new ThirdPartyApi(_httpClient);
            Iot = new IotApi(_httpClient);
            Craw = new CrawApi(_httpClient);
            Timeline = new TimelineApi(_httpClient);
        }

        public SdkworkBackendClient SetApiKey(string apiKey)
        {
            _httpClient.SetApiKey(apiKey);
            return this;
        }

        public SdkworkBackendClient SetAuthToken(string token)
        {
            _httpClient.SetAuthToken(token);
            return this;
        }

        public SdkworkBackendClient SetAccessToken(string token)
        {
            _httpClient.SetAccessToken(token);
            return this;
        }

        public SdkworkBackendClient SetHeader(string key, string value)
        {
            _httpClient.SetHeader(key, value);
            return this;
        }
    }
}
