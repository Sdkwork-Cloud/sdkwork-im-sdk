import 'package:im_sdk_generated/im_sdk_generated.dart';

import 'context.dart';

class ImSessionModule {
  final ImSdkContext context;

  ImSessionModule(this.context);

  Future<SessionResumeView?> resume(ResumeSessionRequest body) {
    return context.transportClient.session.resume(body);
  }

  Future<PresenceSnapshotView?> disconnectDevice(PresenceDeviceRequest body) {
    return context.transportClient.session.disconnect(body);
  }
}
