import 'package:im_sdk_generated/im_sdk_generated.dart';

import 'context.dart';
import 'types.dart';

class ImRealtimeModule {
  final ImSdkContext context;

  ImRealtimeModule(this.context);

  Future<RealtimeSubscriptionSnapshot?> replaceSubscriptions(
    SyncRealtimeSubscriptionsRequest body,
  ) {
    return context.transportClient.realtime.syncRealtimeSubscriptions(body);
  }

  Future<RealtimeEventWindow?> pullEvents([ImQueryParams? params]) {
    return context.transportClient.realtime.listRealtimeEvents(params);
  }

  Future<RealtimeAckState?> ackEvents(AckRealtimeEventsRequest body) {
    return context.transportClient.realtime.ackRealtimeEvents(body);
  }
}
