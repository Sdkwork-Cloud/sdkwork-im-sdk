import '../http/client.dart';
import '../models.dart';
import 'paths.dart';
import '../http/response_mapper.dart';

class MessagesApi {
  final HttpClient _client;
  
  MessagesApi(this._client);

  /// 发送消息
  Future<dynamic> messageControllerSend(SendMessage body) async {
    return await _client.post(ApiPaths.backendPath('/messages'), body: body, contentType: 'application/json');
  }

  /// 批量发送消息
  Future<dynamic> messageControllerBatchSend(BatchSendMessage body) async {
    return await _client.post(ApiPaths.backendPath('/messages/batch'), body: body, contentType: 'application/json');
  }

  /// 获取用户消息列表
  Future<dynamic> messageControllerGetByUserId(String userId, Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/messages/user/${userId}'), params: params);
  }

  /// 获取群组消息列表
  Future<dynamic> messageControllerGetByGroupId(String groupId, Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/messages/group/${groupId}'), params: params);
  }

  /// 按序列号增量拉取会话消息
  Future<dynamic> messageControllerGetHistoryBySeq(Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/messages/history/seq'), params: params);
  }

  /// 确认会话同步序列（支持设备维度）
  Future<dynamic> messageControllerAckConversationSeq(AckConversationSeqRequest body) async {
    return await _client.post(ApiPaths.backendPath('/messages/sync/ack-seq'), body: body, contentType: 'application/json');
  }

  /// 批量确认会话同步序列（支持设备维度）
  Future<dynamic> messageControllerAckConversationSeqBatch(AckConversationSeqBatchRequest body) async {
    return await _client.post(ApiPaths.backendPath('/messages/sync/ack-seq/batch'), body: body, contentType: 'application/json');
  }

  /// 获取消息详情
  Future<dynamic> messageControllerGetById(String id) async {
    return await _client.get(ApiPaths.backendPath('/messages/${id}'));
  }

  /// 删除消息
  Future<dynamic> messageControllerDelete(String id) async {
    return await _client.delete(ApiPaths.backendPath('/messages/${id}'));
  }

  /// 获取消息回执详情
  Future<dynamic> messageControllerGetReceipts(String id, Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/messages/${id}/receipts'), params: params);
  }

  /// 获取消息回执统计
  Future<dynamic> messageControllerGetReceiptSummary(String id) async {
    return await _client.get(ApiPaths.backendPath('/messages/${id}/receipt-summary'));
  }

  /// 获取群消息未读成员列表
  Future<MessageUnreadMembersResponse?> messageControllerGetGroupUnreadMembers(String id, Map<String, dynamic>? params) async {
    final response = await _client.get(ApiPaths.backendPath('/messages/${id}/unread-members'), params: params);
    return decodeResponse<MessageUnreadMembersResponse>(response, MessageUnreadMembersResponse.fromJson);
  }

  /// 获取群消息已读成员列表
  Future<MessageReadMembersResponse?> messageControllerGetGroupReadMembers(String id, Map<String, dynamic>? params) async {
    final response = await _client.get(ApiPaths.backendPath('/messages/${id}/read-members'), params: params);
    return decodeResponse<MessageReadMembersResponse>(response, MessageReadMembersResponse.fromJson);
  }

  /// 更新消息状态
  Future<dynamic> messageControllerUpdateStatus(String id, UpdateMessageStatus body) async {
    return await _client.put(ApiPaths.backendPath('/messages/${id}/status'), body: body, contentType: 'application/json');
  }

  /// 编辑消息内容
  Future<dynamic> messageControllerEdit(String id, EditMessage body) async {
    return await _client.put(ApiPaths.backendPath('/messages/${id}/content'), body: body, contentType: 'application/json');
  }

  /// 获取消息反应汇总
  Future<dynamic> messageControllerGetReactionSummary(String id) async {
    return await _client.get(ApiPaths.backendPath('/messages/${id}/reactions'));
  }

  /// 设置消息反应
  Future<dynamic> messageControllerSetReaction(String id, SetMessageReaction body) async {
    return await _client.put(ApiPaths.backendPath('/messages/${id}/reactions'), body: body, contentType: 'application/json');
  }

  /// 标记群消息为已读
  Future<dynamic> messageControllerMarkGroupAsRead(String groupId, MarkMessagesRead body) async {
    return await _client.post(ApiPaths.backendPath('/messages/group/${groupId}/read'), body: body, contentType: 'application/json');
  }

  /// 标记消息为已读
  Future<dynamic> messageControllerMarkAsRead(String userId, MarkMessagesRead body) async {
    return await _client.post(ApiPaths.backendPath('/messages/${userId}/read'), body: body, contentType: 'application/json');
  }

  /// 撤回消息
  Future<dynamic> messageControllerRecall(String id) async {
    return await _client.post(ApiPaths.backendPath('/messages/${id}/recall'));
  }

  /// 转发消息
  Future<dynamic> messageControllerForward(String id, ForwardMessage body) async {
    return await _client.post(ApiPaths.backendPath('/messages/${id}/forward'), body: body, contentType: 'application/json');
  }

  /// 重试发送失败的消息
  Future<dynamic> messageControllerRetryFailed(String id) async {
    return await _client.post(ApiPaths.backendPath('/messages/${id}/retry'));
  }
}
