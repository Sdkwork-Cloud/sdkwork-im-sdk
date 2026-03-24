namespace Backend.Api
{
    /// <summary>
    /// API modules for sdkwork-im-sdk
    /// </summary>
    public static class Api
    {
        public static AuthApi Auth { get; set; }
        public static UsersApi Users { get; set; }
        public static FriendsApi Friends { get; set; }
        public static ContactsApi Contacts { get; set; }
        public static MessagesApi Messages { get; set; }
        public static MessageSearchApi MessageSearch { get; set; }
        public static GroupsApi Groups { get; set; }
        public static ConversationsApi Conversations { get; set; }
        public static RtcApi Rtc { get; set; }
        public static WukongimApi Wukongim { get; set; }
        public static AiBotApi AiBot { get; set; }
        public static AgentApi Agent { get; set; }
        public static AgentMemoryApi AgentMemory { get; set; }
        public static BotsApi Bots { get; set; }
        public static BotsOpenApi BotsOpen { get; set; }
        public static ThirdPartyApi ThirdParty { get; set; }
        public static IotApi Iot { get; set; }
        public static CrawApi Craw { get; set; }
        public static TimelineApi Timeline { get; set; }
    }
}
