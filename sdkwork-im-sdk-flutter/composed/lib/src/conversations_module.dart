import 'package:backend_sdk/src/models.dart';

import 'context.dart';
import 'types.dart';

class OpenChatConversationsModule {
  final OpenChatSdkContext context;

  OpenChatConversationsModule(this.context);

  Future<Conversation?> create(ConversationControllerCreateRequest payload) {
    return context.backendClient.conversations.conversationControllerCreate(
      payload,
    );
  }

  Future<Object?> list([Map<String, dynamic>? params]) {
    return context.backendClient.conversations
        .conversationControllerGetByUserId(params);
  }

  Future<Object?> getSyncState([Map<String, dynamic>? params]) {
    return context.backendClient.conversations
        .conversationControllerGetSyncState(params);
  }

  Future<Object?> getSyncStates(
    ConversationControllerGetSyncStatesRequest payload,
  ) {
    return context.backendClient.conversations
        .conversationControllerGetSyncStates(payload);
  }

  Future<Object?> deleteDeviceSyncState(String deviceId) {
    return context.backendClient.conversations
        .conversationControllerDeleteDeviceSyncState(deviceId);
  }

  Future<Object?> getDeviceSyncStateSummaries([Map<String, dynamic>? params]) {
    return context.backendClient.conversations
        .conversationControllerGetDeviceSyncStateSummaries(params);
  }

  Future<Object?> deleteStaleDeviceSyncStates([Map<String, dynamic>? params]) {
    return context.backendClient.conversations
        .conversationControllerDeleteStaleDeviceSyncStates(params);
  }

  Future<Conversation?> getByTarget(
    String targetId, [
    Map<String, dynamic>? params,
  ]) {
    return context.backendClient.conversations.conversationControllerGetByTarget(
      targetId,
      params,
    );
  }

  Future<Object?> getTotalUnreadCount() {
    return context.backendClient.conversations
        .conversationControllerGetTotalUnreadCount();
  }

  Future<Conversation?> get(String id) {
    return context.backendClient.conversations.conversationControllerGetById(
      id,
    );
  }

  Future<Conversation?> update(
    String id,
    ConversationControllerUpdateRequest payload,
  ) {
    return context.backendClient.conversations.conversationControllerUpdate(
      id,
      payload,
    );
  }

  Future<bool> delete(String id) async {
    final dynamic response =
        await context.backendClient.conversations.conversationControllerDelete(
      id,
    );
    return context.normalizeActionSuccess(response);
  }

  Future<Object?> batchDelete(List<String> ids) {
    return context.deleteJson(
      '$imApiPrefix/conversations/batch',
      body: <String, dynamic>{
        'ids': ids,
      },
    );
  }

  Future<bool> pin(String id, bool isPinned) async {
    final dynamic response =
        await context.backendClient.conversations.conversationControllerPin(
      id,
      ConversationControllerPinRequest(isPinned: isPinned),
    );
    return context.normalizeActionSuccess(response);
  }

  Future<bool> mute(String id, bool isMuted) async {
    final dynamic response =
        await context.backendClient.conversations.conversationControllerMute(
      id,
      ConversationControllerMuteRequest(isMuted: isMuted),
    );
    return context.normalizeActionSuccess(response);
  }

  Future<bool> clearUnreadCount(String id) async {
    final dynamic response = await context.backendClient.conversations
        .conversationControllerClearUnreadCount(id);
    return context.normalizeActionSuccess(response);
  }
}
