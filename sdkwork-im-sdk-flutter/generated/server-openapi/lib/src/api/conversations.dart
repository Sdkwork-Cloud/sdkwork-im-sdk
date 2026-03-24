import '../http/client.dart';
import '../models.dart';
import 'paths.dart';
import '../http/response_mapper.dart';

class ConversationsApi {
  final HttpClient _client;
  
  ConversationsApi(this._client);

  /// 创建会话
  Future<Conversation?> conversationControllerCreate(ConversationControllerCreateRequest body) async {
    final response = await _client.post(ApiPaths.backendPath('/conversations'), body: body, contentType: 'application/json');
    return decodeResponse<Conversation>(response, Conversation.fromJson);
  }

  /// 获取用户的会话列表
  Future<ConversationControllerGetByUserIdResponse?> conversationControllerGetByUserId(Map<String, dynamic>? params) async {
    final response = await _client.get(ApiPaths.backendPath('/conversations'), params: params);
    return decodeResponse<ConversationControllerGetByUserIdResponse>(response, ConversationControllerGetByUserIdResponse.fromJson);
  }

  /// 获取会话同步状态
  Future<dynamic> conversationControllerGetSyncState(Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/conversations/sync-state'), params: params);
  }

  /// 批量获取会话同步状态
  Future<dynamic> conversationControllerGetSyncStates(ConversationControllerGetSyncStatesRequest body) async {
    return await _client.post(ApiPaths.backendPath('/conversations/sync-state/batch'), body: body, contentType: 'application/json');
  }

  /// 删除设备会话读游标
  Future<dynamic> conversationControllerDeleteDeviceSyncState(String deviceId) async {
    return await _client.delete(ApiPaths.backendPath('/conversations/sync-state/device/${deviceId}'));
  }

  /// 获取设备会话游标摘要
  Future<dynamic> conversationControllerGetDeviceSyncStateSummaries(Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/conversations/sync-state/devices'), params: params);
  }

  /// 清理失活设备会话游标
  Future<dynamic> conversationControllerDeleteStaleDeviceSyncStates(Map<String, dynamic>? params) async {
    return await _client.delete(ApiPaths.backendPath('/conversations/sync-state/devices/stale'), params: params);
  }

  /// 获取用户与特定目标的会话
  Future<Conversation?> conversationControllerGetByTarget(String targetId, Map<String, dynamic>? params) async {
    final response = await _client.get(ApiPaths.backendPath('/conversations/target/${targetId}'), params: params);
    return decodeResponse<Conversation>(response, Conversation.fromJson);
  }

  /// 获取未读消息总数
  Future<dynamic> conversationControllerGetTotalUnreadCount() async {
    return await _client.get(ApiPaths.backendPath('/conversations/unread-total/me'));
  }

  /// 获取会话详情
  Future<Conversation?> conversationControllerGetById(String id) async {
    final response = await _client.get(ApiPaths.backendPath('/conversations/${id}'));
    return decodeResponse<Conversation>(response, Conversation.fromJson);
  }

  /// 更新会话
  Future<Conversation?> conversationControllerUpdate(String id, ConversationControllerUpdateRequest body) async {
    final response = await _client.put(ApiPaths.backendPath('/conversations/${id}'), body: body, contentType: 'application/json');
    return decodeResponse<Conversation>(response, Conversation.fromJson);
  }

  /// 删除会话
  Future<dynamic> conversationControllerDelete(String id) async {
    return await _client.delete(ApiPaths.backendPath('/conversations/${id}'));
  }

  /// 置顶/取消置顶会话
  Future<dynamic> conversationControllerPin(String id, ConversationControllerPinRequest body) async {
    return await _client.put(ApiPaths.backendPath('/conversations/${id}/pin'), body: body, contentType: 'application/json');
  }

  /// 设置免打扰
  Future<dynamic> conversationControllerMute(String id, ConversationControllerMuteRequest body) async {
    return await _client.put(ApiPaths.backendPath('/conversations/${id}/mute'), body: body, contentType: 'application/json');
  }

  /// 清空未读消息数
  Future<dynamic> conversationControllerClearUnreadCount(String id) async {
    return await _client.put(ApiPaths.backendPath('/conversations/${id}/read'));
  }

  /// 批量删除会话
  Future<dynamic> conversationControllerBatchDelete() async {
    return await _client.delete(ApiPaths.backendPath('/conversations/batch'));
  }
}
