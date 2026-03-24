export 'src/http/sdk_config.dart';

import 'src/http/sdk_config.dart';
import 'src/http/client.dart';
import 'src/api/auth.dart';
import 'src/api/users.dart';
import 'src/api/friends.dart';
import 'src/api/contacts.dart';
import 'src/api/messages.dart';
import 'src/api/message_search.dart';
import 'src/api/groups.dart';
import 'src/api/conversations.dart';
import 'src/api/rtc.dart';
import 'src/api/wukongim.dart';
import 'src/api/ai_bot.dart';
import 'src/api/agent.dart';
import 'src/api/agent_memory.dart';
import 'src/api/bots.dart';
import 'src/api/bots_open.dart';
import 'src/api/third_party.dart';
import 'src/api/iot.dart';
import 'src/api/craw.dart';
import 'src/api/timeline.dart';

class SdkworkBackendClient {
  final HttpClient _httpClient;

  late final AuthApi auth;
  late final UsersApi users;
  late final FriendsApi friends;
  late final ContactsApi contacts;
  late final MessagesApi messages;
  late final MessageSearchApi messageSearch;
  late final GroupsApi groups;
  late final ConversationsApi conversations;
  late final RtcApi rtc;
  late final WukongimApi wukongim;
  late final AiBotApi aiBot;
  late final AgentApi agent;
  late final AgentMemoryApi agentMemory;
  late final BotsApi bots;
  late final BotsOpenApi botsOpen;
  late final ThirdPartyApi thirdParty;
  late final IotApi iot;
  late final CrawApi craw;
  late final TimelineApi timeline;

  SdkworkBackendClient({
    required SdkConfig config,
  }) : _httpClient = HttpClient(config: config) {
    auth = AuthApi(_httpClient);
    users = UsersApi(_httpClient);
    friends = FriendsApi(_httpClient);
    contacts = ContactsApi(_httpClient);
    messages = MessagesApi(_httpClient);
    messageSearch = MessageSearchApi(_httpClient);
    groups = GroupsApi(_httpClient);
    conversations = ConversationsApi(_httpClient);
    rtc = RtcApi(_httpClient);
    wukongim = WukongimApi(_httpClient);
    aiBot = AiBotApi(_httpClient);
    agent = AgentApi(_httpClient);
    agentMemory = AgentMemoryApi(_httpClient);
    bots = BotsApi(_httpClient);
    botsOpen = BotsOpenApi(_httpClient);
    thirdParty = ThirdPartyApi(_httpClient);
    iot = IotApi(_httpClient);
    craw = CrawApi(_httpClient);
    timeline = TimelineApi(_httpClient);
  }

  factory SdkworkBackendClient.withBaseUrl({
    required String baseUrl,
    String? apiKey,
    String? authToken,
    String? accessToken,
    String apiKeyHeader = 'X-API-Key',
    bool apiKeyAsBearer = false,
    Map<String, String>? headers,
    int timeout = 30000,
  }) {
    return SdkworkBackendClient(
      config: SdkConfig(
        baseUrl: baseUrl,
        timeout: timeout,
        headers: headers ?? const {},
        apiKey: apiKey,
        apiKeyHeader: apiKeyHeader,
        apiKeyAsBearer: apiKeyAsBearer,
        authToken: authToken,
        accessToken: accessToken,
      ),
    );
  }

  void setApiKey(String apiKey) {
    _httpClient.setApiKey(apiKey);
  }

  void setAuthToken(String token) {
    _httpClient.setAuthToken(token);
  }

  void setAccessToken(String token) {
    _httpClient.setAccessToken(token);
  }

  void setHeader(String key, String value) {
    _httpClient.setHeader(key, value);
  }
}
