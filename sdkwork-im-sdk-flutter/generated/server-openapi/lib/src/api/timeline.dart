import '../http/client.dart';
import '../models.dart';
import 'paths.dart';

class TimelineApi {
  final HttpClient _client;
  
  TimelineApi(this._client);

  /// Create a timeline post
  Future<dynamic> controllerCreatePost(CreateTimelinePostDto body) async {
    return await _client.post(ApiPaths.backendPath('/timeline/posts'), body: body, contentType: 'application/json');
  }

  /// Get timeline feed
  Future<dynamic> controllerGetFeed(Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/timeline/feed'), params: params);
  }

  /// Get timeline post detail
  Future<dynamic> controllerGetPost(String postId) async {
    return await _client.get(ApiPaths.backendPath('/timeline/posts/${postId}'));
  }

  /// Delete own timeline post
  Future<dynamic> controllerDeletePost(String postId) async {
    return await _client.delete(ApiPaths.backendPath('/timeline/posts/${postId}'));
  }

  /// Get user timeline posts
  Future<dynamic> controllerGetUserPosts(String userId, Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/timeline/users/${userId}/posts'), params: params);
  }

  /// Like or unlike timeline post
  Future<dynamic> controllerToggleLike(String postId, ToggleTimelineLikeDto body) async {
    return await _client.post(ApiPaths.backendPath('/timeline/posts/${postId}/likes'), body: body, contentType: 'application/json');
  }
}
