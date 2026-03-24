import 'package:backend_sdk/src/models.dart';

import 'context.dart';
import 'types.dart';

class OpenChatFriendsModule {
  final OpenChatSdkContext context;

  OpenChatFriendsModule(this.context);

  Future<OpenChatFriendRequestResult> request({
    required String toUserId,
    String? message,
  }) async {
    final dynamic response =
        await context.backendClient.friends.friendControllerSendRequest(
      SendFriendRequestDto(
        toUserId: toUserId,
        message: message,
      ),
    );
    return OpenChatFriendRequestResult(
      success: context.normalizeActionSuccess(response),
      requestId: pickString(context.readValue(response, 'requestId')),
    );
  }

  Future<bool> accept(String requestId) async {
    final dynamic response =
        await context.backendClient.friends.friendControllerAcceptRequest(
      requestId,
    );
    return context.normalizeActionSuccess(response);
  }

  Future<bool> reject(String requestId) async {
    final dynamic response =
        await context.backendClient.friends.friendControllerRejectRequest(
      requestId,
    );
    return context.normalizeActionSuccess(response);
  }

  Future<bool> cancel(String requestId) async {
    final dynamic response =
        await context.backendClient.friends.friendControllerCancelRequest(
      requestId,
    );
    return context.normalizeActionSuccess(response);
  }

  Future<bool> remove(String friendId) async {
    final dynamic response =
        await context.backendClient.friends.friendControllerRemove(friendId);
    return context.normalizeActionSuccess(response);
  }

  Future<Object?> list() => context.backendClient.friends.friendControllerGet();

  Future<Object?> requests([Map<String, dynamic>? params]) {
    return context.backendClient.friends.friendControllerGetRequests(params);
  }

  Future<Object?> sentRequests() {
    return context.backendClient.friends.friendControllerGetSentRequests();
  }

  Future<Object?> checkFriendship(String friendId) {
    return context.backendClient.friends.friendControllerCheckFriendship(
      friendId,
    );
  }

  Future<bool> block(String friendId) async {
    final dynamic response =
        await context.backendClient.friends.friendControllerBlock(friendId);
    return context.normalizeActionSuccess(response);
  }

  Future<bool> unblock(String friendId) async {
    final dynamic response =
        await context.backendClient.friends.friendControllerUnblock(friendId);
    return context.normalizeActionSuccess(response);
  }

  Future<Object?> checkBlocked(String friendId) {
    return context.backendClient.friends.friendControllerCheckBlocked(friendId);
  }
}
