import '../http/client.dart';
import '../models.dart';
import 'paths.dart';
import '../http/response_mapper.dart';

class FriendsApi {
  final HttpClient _client;
  
  FriendsApi(this._client);

  /// Send friend request
  Future<FriendControllerSendRequestResponse?> friendControllerSendRequest(SendFriendRequestDto body) async {
    final response = await _client.post(ApiPaths.backendPath('/friends/request'), body: body, contentType: 'application/json');
    return decodeResponse<FriendControllerSendRequestResponse>(response, FriendControllerSendRequestResponse.fromJson);
  }

  /// Accept friend request
  Future<FriendControllerAcceptRequestResponse?> friendControllerAcceptRequest(String id) async {
    final response = await _client.post(ApiPaths.backendPath('/friends/request/${id}/accept'));
    return decodeResponse<FriendControllerAcceptRequestResponse>(response, FriendControllerAcceptRequestResponse.fromJson);
  }

  /// Reject friend request
  Future<FriendControllerRejectRequestResponse?> friendControllerRejectRequest(String id) async {
    final response = await _client.post(ApiPaths.backendPath('/friends/request/${id}/reject'));
    return decodeResponse<FriendControllerRejectRequestResponse>(response, FriendControllerRejectRequestResponse.fromJson);
  }

  /// Cancel friend request
  Future<FriendControllerCancelRequestResponse?> friendControllerCancelRequest(String id) async {
    final response = await _client.delete(ApiPaths.backendPath('/friends/request/${id}'));
    return decodeResponse<FriendControllerCancelRequestResponse>(response, FriendControllerCancelRequestResponse.fromJson);
  }

  /// Remove friend
  Future<FriendControllerRemoveResponse?> friendControllerRemove(String friendId) async {
    final response = await _client.delete(ApiPaths.backendPath('/friends/${friendId}'));
    return decodeResponse<FriendControllerRemoveResponse>(response, FriendControllerRemoveResponse.fromJson);
  }

  /// Get friend requests
  Future<FriendControllerGetRequestsResponse?> friendControllerGetRequests(Map<String, dynamic>? params) async {
    final response = await _client.get(ApiPaths.backendPath('/friends/requests'), params: params);
    return decodeResponse<FriendControllerGetRequestsResponse>(response, FriendControllerGetRequestsResponse.fromJson);
  }

  /// Get sent friend requests
  Future<FriendControllerGetSentRequestsResponse?> friendControllerGetSentRequests() async {
    final response = await _client.get(ApiPaths.backendPath('/friends/requests/sent'));
    return decodeResponse<FriendControllerGetSentRequestsResponse>(response, FriendControllerGetSentRequestsResponse.fromJson);
  }

  /// Get friends list
  Future<FriendControllerGetResponse?> friendControllerGet() async {
    final response = await _client.get(ApiPaths.backendPath('/friends'));
    return decodeResponse<FriendControllerGetResponse>(response, FriendControllerGetResponse.fromJson);
  }

  /// Check friendship status
  Future<FriendControllerCheckFriendshipResponse?> friendControllerCheckFriendship(String friendId) async {
    final response = await _client.get(ApiPaths.backendPath('/friends/${friendId}/check'));
    return decodeResponse<FriendControllerCheckFriendshipResponse>(response, FriendControllerCheckFriendshipResponse.fromJson);
  }

  /// Block friend
  Future<FriendControllerBlockResponse?> friendControllerBlock(String friendId) async {
    final response = await _client.post(ApiPaths.backendPath('/friends/${friendId}/block'));
    return decodeResponse<FriendControllerBlockResponse>(response, FriendControllerBlockResponse.fromJson);
  }

  /// Unblock friend
  Future<FriendControllerUnblockResponse?> friendControllerUnblock(String friendId) async {
    final response = await _client.post(ApiPaths.backendPath('/friends/${friendId}/unblock'));
    return decodeResponse<FriendControllerUnblockResponse>(response, FriendControllerUnblockResponse.fromJson);
  }

  /// Check if blocked
  Future<FriendControllerCheckBlockedResponse?> friendControllerCheckBlocked(String friendId) async {
    final response = await _client.get(ApiPaths.backendPath('/friends/${friendId}/blocked'));
    return decodeResponse<FriendControllerCheckBlockedResponse>(response, FriendControllerCheckBlockedResponse.fromJson);
  }
}
