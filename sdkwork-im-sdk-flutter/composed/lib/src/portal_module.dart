import 'package:im_sdk_generated/im_sdk_generated.dart';

import 'context.dart';

class ImPortalModule {
  final ImSdkContext context;

  ImPortalModule(this.context);

  Future<Map<String, dynamic>?> getHome() {
    return context.transportClient.portal.getHome();
  }

  Future<Map<String, dynamic>?> getAuth() {
    return context.transportClient.portal.getAuth();
  }

  Future<PortalWorkspaceView?> getWorkspace() {
    return context.transportClient.portal.getWorkspace();
  }

  Future<Map<String, dynamic>?> getDashboard() {
    return context.transportClient.portal.getDashboard();
  }

  Future<Map<String, dynamic>?> getConversations() {
    return context.transportClient.portal.getConversations();
  }

  Future<Map<String, dynamic>?> getRealtime() {
    return context.transportClient.portal.getRealtime();
  }

  Future<Map<String, dynamic>?> getMedia() {
    return context.transportClient.portal.getMedia();
  }

  Future<Map<String, dynamic>?> getAutomation() {
    return context.transportClient.portal.getAutomation();
  }

  Future<Map<String, dynamic>?> getGovernance() {
    return context.transportClient.portal.getGovernance();
  }
}
