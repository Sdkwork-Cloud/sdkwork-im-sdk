import 'dart:convert';

import 'package:backend_sdk/src/models.dart';

import 'context.dart';

class OpenChatGroupsModule {
  final OpenChatSdkContext context;

  OpenChatGroupsModule(this.context);

  Future<Group?> create(Object payload) {
    final body = payload is String ? payload : jsonEncode(payload);
    return context.backendClient.groups.groupControllerCreate(body);
  }

  Future<Group?> get(String id) {
    return context.backendClient.groups.groupControllerGetById(id);
  }

  Future<Group?> update(String id, Object payload) {
    final body = payload is String ? payload : jsonEncode(payload);
    return context.backendClient.groups.groupControllerUpdate(id, body);
  }

  Future<bool> delete(String id) async {
    final dynamic response =
        await context.backendClient.groups.groupControllerDelete(id);
    return context.normalizeActionSuccess(response);
  }

  Future<GroupMember?> addMember(
    String groupId,
    GroupControllerAddMemberRequest payload,
  ) {
    return context.backendClient.groups.groupControllerAddMember(
      groupId,
      payload,
    );
  }

  Future<Object?> members(String groupId) {
    return context.backendClient.groups.groupControllerGetMembers(groupId);
  }

  Future<bool> removeMember(String groupId, String userId) async {
    final dynamic response =
        await context.backendClient.groups.groupControllerRemoveMember(
      groupId,
      userId,
    );
    return context.normalizeActionSuccess(response);
  }

  Future<bool> updateMemberRole(
    String groupId,
    String userId,
    String role,
  ) async {
    final dynamic response = await context.backendClient.groups
        .groupControllerUpdateMemberRole(
      groupId,
      userId,
      GroupControllerUpdateMemberRoleRequest(role: role),
    );
    return context.normalizeActionSuccess(response);
  }

  Future<Object?> listByUser([String? userId]) {
    return context.backendClient.groups.groupControllerGetByUserId(
      context.resolveCurrentUserId(userId),
    );
  }

  Future<GroupInvitation?> sendInvitation(
    GroupControllerSendInvitationRequest payload,
  ) {
    return context.backendClient.groups.groupControllerSendInvitation(payload);
  }

  Future<bool> acceptInvitation(String invitationId) async {
    final dynamic response =
        await context.backendClient.groups.groupControllerAcceptInvitation(
      invitationId,
    );
    return context.normalizeActionSuccess(response);
  }

  Future<bool> rejectInvitation(String invitationId) async {
    final dynamic response =
        await context.backendClient.groups.groupControllerRejectInvitation(
      invitationId,
    );
    return context.normalizeActionSuccess(response);
  }

  Future<bool> cancelInvitation(String invitationId) async {
    final dynamic response =
        await context.backendClient.groups.groupControllerCancelInvitation(
      invitationId,
    );
    return context.normalizeActionSuccess(response);
  }

  Future<bool> addToBlacklist(String groupId, String userId) async {
    final dynamic response =
        await context.backendClient.groups.groupControllerAddToBlacklist(
      groupId,
      GroupControllerAddToBlacklistRequest(userId: userId),
    );
    return context.normalizeActionSuccess(response);
  }

  Future<Object?> getBlacklist(String groupId) {
    return context.backendClient.groups.groupControllerGetBlacklist(groupId);
  }

  Future<bool> removeFromBlacklist(String groupId, String userId) async {
    final dynamic response =
        await context.backendClient.groups.groupControllerRemoveFromBlacklist(
      groupId,
      userId,
    );
    return context.normalizeActionSuccess(response);
  }

  Future<bool> addToWhitelist(String groupId, String userId) async {
    final dynamic response =
        await context.backendClient.groups.groupControllerAddToWhitelist(
      groupId,
      GroupControllerAddToWhitelistRequest(userId: userId),
    );
    return context.normalizeActionSuccess(response);
  }

  Future<Object?> getWhitelist(String groupId) {
    return context.backendClient.groups.groupControllerGetWhitelist(groupId);
  }

  Future<bool> removeFromWhitelist(String groupId, String userId) async {
    final dynamic response =
        await context.backendClient.groups.groupControllerRemoveFromWhitelist(
      groupId,
      userId,
    );
    return context.normalizeActionSuccess(response);
  }

  Future<bool> kickMember(String groupId, String userId) async {
    final dynamic response =
        await context.backendClient.groups.groupControllerKickMember(
      groupId,
      userId,
    );
    return context.normalizeActionSuccess(response);
  }

  Future<bool> quit(String groupId, [String? userId]) async {
    final dynamic response =
        await context.backendClient.groups.groupControllerQuit(
      groupId,
      GroupControllerQuitRequest(
        userId: context.resolveCurrentUserId(userId),
      ),
    );
    return context.normalizeActionSuccess(response);
  }

  Future<Group?> updateAnnouncement(String groupId, String announcement) {
    return context.backendClient.groups.groupControllerUpdateAnnouncement(
      groupId,
      GroupControllerUpdateAnnouncementRequest(announcement: announcement),
    );
  }

  Future<Group?> setMuteAll(String groupId, bool muteAll) {
    return context.backendClient.groups.groupControllerSetMuteAll(
      groupId,
      GroupControllerSetMuteAllRequest(muteAll: muteAll),
    );
  }

  Future<bool> muteMember(
    String groupId,
    String userId,
    int duration,
  ) async {
    final dynamic response =
        await context.backendClient.groups.groupControllerMuteMember(
      groupId,
      userId,
      GroupControllerMuteMemberRequest(duration: duration.toDouble()),
    );
    return context.normalizeActionSuccess(response);
  }

  Future<Group?> transfer(String groupId, String newOwnerId) {
    return context.backendClient.groups.groupControllerTransfer(
      groupId,
      GroupControllerTransferRequest(newOwnerId: newOwnerId),
    );
  }
}
