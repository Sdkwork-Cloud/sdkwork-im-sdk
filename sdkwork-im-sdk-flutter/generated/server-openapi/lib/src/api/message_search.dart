import '../http/client.dart';
import 'paths.dart';

class MessageSearchApi {
  final HttpClient _client;
  
  MessageSearchApi(this._client);

  /// 搜索消息
  Future<dynamic> controller(Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/messages/search'), params: params);
  }

  /// 快速搜索
  Future<dynamic> controllerQuick(Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/messages/search/quick'), params: params);
  }

  /// 搜索会话消息
  Future<dynamic> controllerInConversation(Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/messages/search/conversation'), params: params);
  }

  /// 消息统计
  Future<dynamic> controllerGetStats(Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/messages/search/stats'), params: params);
  }
}
