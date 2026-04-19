import 'package:im_sdk_generated/im_sdk_generated.dart';

import 'context.dart';

class ImAuthModule {
  final ImSdkContext context;

  ImAuthModule(this.context);

  Future<PortalLoginResponse?> login(PortalLoginRequest body) async {
    final session = await context.transportClient.auth.login(body);
    final accessToken = session?.accessToken;
    if (accessToken != null && accessToken.isNotEmpty) {
      useToken(accessToken);
    }
    return session;
  }

  Future<PortalMeResponse?> me() {
    return context.transportClient.auth.me();
  }

  void useToken(String token) {
    context.setAuthToken(token);
  }

  void clearToken() {
    context.clearAuthToken();
  }
}
