import 'package:im_sdk_generated/im_sdk_generated.dart';

import 'context.dart';

class ImInboxModule {
  final ImSdkContext context;

  ImInboxModule(this.context);

  Future<InboxResponse?> list() {
    return context.transportClient.inbox.getInbox();
  }
}
