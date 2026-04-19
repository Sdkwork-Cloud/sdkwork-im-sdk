import 'package:im_sdk_generated/im_sdk_generated.dart';

import 'context.dart';

class ImPresenceModule {
  final ImSdkContext context;

  ImPresenceModule(this.context);

  Future<PresenceSnapshotView?> heartbeat(PresenceDeviceRequest body) {
    return context.transportClient.presence.heartbeat(body);
  }

  Future<PresenceSnapshotView?> current() {
    return context.transportClient.presence.getPresenceMe();
  }
}
