library openchat_sdk;

export 'package:backend_sdk/backend_sdk.dart'
    show SdkConfig, SdkworkBackendClient;
export 'package:backend_sdk/src/models.dart';
export 'package:openchat_wukongim_adapter/openchat_wukongim_adapter.dart';

import 'package:backend_sdk/backend_sdk.dart';
import 'package:backend_sdk/src/http/client.dart' as backend_http;
import 'package:openchat_wukongim_adapter/openchat_wukongim_adapter.dart';

import 'src/contacts_module.dart';
import 'src/context.dart';
import 'src/conversations_module.dart';
import 'src/events_module.dart';
import 'src/friends_module.dart';
import 'src/groups_module.dart';
import 'src/messages_module.dart';
import 'src/realtime_module.dart';
import 'src/rtc_module.dart';
import 'src/session_module.dart';
import 'src/types.dart';

class OpenChatImSdk {
  final OpenChatSdkContext _context;

  final SdkworkBackendClient backendClient;
  final backend_http.HttpClient? rawHttpClient;
  final OpenChatWukongimAdapter? realtimeAdapter;

  late final OpenChatSessionModule session;
  late final OpenChatRealtimeModule realtime;
  late final OpenChatMessagesModule messages;
  late final OpenChatEventsModule events;
  late final OpenChatFriendsModule friends;
  late final OpenChatConversationsModule conversations;
  late final OpenChatGroupsModule groups;
  late final OpenChatContactsModule contacts;
  late final OpenChatRtcModule rtc;

  OpenChatImSdk(OpenChatImSdkOptions options)
      : backendClient = options.backendClient,
        rawHttpClient = options.rawHttpClient,
        realtimeAdapter = options.realtimeAdapter,
        _context = OpenChatSdkContext(options) {
    session = OpenChatSessionModule(_context);
    realtime = OpenChatRealtimeModule(_context);
    messages = OpenChatMessagesModule(_context);
    events = OpenChatEventsModule(_context);
    friends = OpenChatFriendsModule(_context);
    conversations = OpenChatConversationsModule(_context);
    groups = OpenChatGroupsModule(_context);
    contacts = OpenChatContactsModule(_context);
    rtc = OpenChatRtcModule(_context);
  }

  factory OpenChatImSdk.create({
    SdkworkBackendClient? backendClient,
    backend_http.HttpClient? rawHttpClient,
    OpenChatWukongimAdapter? realtimeAdapter,
    OpenChatRealtimeSession? realtimeSession,
    OpenChatRealtimeBootstrapProvider? realtimeBootstrapProvider,
    SdkConfig? config,
    String? baseUrl,
    String? apiKey,
    String? authToken,
    String? accessToken,
    String apiKeyHeader = 'X-API-Key',
    bool apiKeyAsBearer = false,
    Map<String, String>? headers,
    int timeout = 30000,
  }) {
    final resolvedConfig = config ??
        (baseUrl == null
            ? null
            : SdkConfig(
                baseUrl: baseUrl,
                timeout: timeout,
                headers: headers ?? const <String, String>{},
                apiKey: apiKey,
                apiKeyHeader: apiKeyHeader,
                apiKeyAsBearer: apiKeyAsBearer,
                authToken: authToken,
                accessToken: accessToken,
              ));

    if (backendClient == null && resolvedConfig == null) {
      throw ArgumentError(
        'Provide backendClient or baseUrl/config when creating OpenChatImSdk.',
      );
    }

    final resolvedBackendClient =
        backendClient ?? SdkworkBackendClient(config: resolvedConfig!);
    final resolvedRawHttpClient = rawHttpClient ??
        (resolvedConfig == null
            ? null
            : backend_http.HttpClient(config: resolvedConfig));
    final resolvedRealtimeAdapter = realtimeAdapter ??
        OpenChatWukongimAdapter(
          config: OpenChatWukongimAdapterConfig(
            session: realtimeSession,
          ),
        );

    final sdk = OpenChatImSdk(
      OpenChatImSdkOptions(
        backendClient: resolvedBackendClient,
        rawHttpClient: resolvedRawHttpClient,
        realtimeAdapter: resolvedRealtimeAdapter,
        realtimeBootstrapProvider: realtimeBootstrapProvider,
      ),
    );

    final bootstrapToken = accessToken ?? authToken;
    if (bootstrapToken != null && bootstrapToken.isNotEmpty) {
      sdk.session.setAccessToken(bootstrapToken);
    }

    return sdk;
  }
}
