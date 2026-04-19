library im_sdk;

export 'package:im_sdk_generated/im_sdk_generated.dart';

export 'src/auth_module.dart';
export 'src/builders.dart';
export 'src/context.dart';
export 'src/conversations_module.dart';
export 'src/device_module.dart';
export 'src/inbox_module.dart';
export 'src/media_module.dart';
export 'src/messages_module.dart';
export 'src/portal_module.dart';
export 'src/presence_module.dart';
export 'src/realtime_module.dart';
export 'src/rtc_module.dart';
export 'src/session_module.dart';
export 'src/streams_module.dart';
export 'src/types.dart';

import 'package:im_sdk_generated/im_sdk_generated.dart';

import 'src/auth_module.dart';
import 'src/context.dart';
import 'src/conversations_module.dart';
import 'src/device_module.dart';
import 'src/inbox_module.dart';
import 'src/media_module.dart';
import 'src/messages_module.dart';
import 'src/portal_module.dart';
import 'src/presence_module.dart';
import 'src/realtime_module.dart';
import 'src/rtc_module.dart';
import 'src/session_module.dart';
import 'src/streams_module.dart';
import 'src/types.dart';

class ImSdkClient {
  final ImSdkContext _context;

  final ImTransportClient transportClient;

  late final ImAuthModule auth;
  late final ImPortalModule portal;
  late final ImSessionModule session;
  late final ImPresenceModule presence;
  late final ImRealtimeModule realtime;
  late final ImDevicesModule devices;
  late final ImInboxModule inbox;
  late final ImConversationsModule conversations;
  late final ImMessagesModule messages;
  late final ImMediaModule media;
  late final ImStreamsModule streams;
  late final ImRtcModule rtc;

  ImSdkClient(ImSdkClientOptions options)
      : transportClient = options.transportClient,
        _context = ImSdkContext(options.transportClient) {
    auth = ImAuthModule(_context);
    portal = ImPortalModule(_context);
    session = ImSessionModule(_context);
    presence = ImPresenceModule(_context);
    realtime = ImRealtimeModule(_context);
    devices = ImDevicesModule(_context);
    inbox = ImInboxModule(_context);
    conversations = ImConversationsModule(_context);
    messages = ImMessagesModule(_context);
    media = ImMediaModule(_context);
    streams = ImStreamsModule(_context);
    rtc = ImRtcModule(_context);
  }

  factory ImSdkClient.create({
    ImTransportClient? transportClient,
    String? baseUrl,
    String? authToken,
    Map<String, String>? headers,
    int timeout = 30000,
  }) {
    final resolvedConfig = baseUrl == null
        ? null
        : ImGeneratedConfig(
            baseUrl: baseUrl,
            timeout: timeout,
            authToken: authToken,
            headers: headers ?? const <String, String>{},
          );

    if (transportClient == null && resolvedConfig == null) {
      throw ArgumentError(
        'Provide transportClient or baseUrl when creating ImSdkClient.',
      );
    }

    final resolvedTransportClient =
        transportClient ?? ImTransportClient(config: resolvedConfig!);

    return ImSdkClient(
      ImSdkClientOptions(
        transportClient: resolvedTransportClient,
      ),
    );
  }

  void setAuthToken(String token) {
    _context.setAuthToken(token);
  }
}
