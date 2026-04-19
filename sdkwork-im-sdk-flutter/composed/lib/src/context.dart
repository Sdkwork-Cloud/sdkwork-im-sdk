import 'package:im_sdk_generated/im_sdk_generated.dart';

class ImSdkContext {
  final ImTransportClient transportClient;

  ImSdkContext(this.transportClient);

  void setAuthToken(String token) {
    transportClient.setAuthToken(token);
  }

  void clearAuthToken() {
    transportClient.setAuthToken('');
  }
}
