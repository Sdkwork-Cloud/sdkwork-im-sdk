import '../http/client.dart';
import '../models.dart';
import 'paths.dart';
import '../http/response_mapper.dart';

class ThirdPartyApi {
  final HttpClient _client;
  
  ThirdPartyApi(this._client);

  /// 发送第三方平台消息
  Future<ThirdPartyMessage?> controllerSendMessage(String platform, String body) async {
    final response = await _client.post(ApiPaths.backendPath('/third-party/${platform}/messages'), body: body, contentType: 'application/json');
    return decodeResponse<ThirdPartyMessage>(response, ThirdPartyMessage.fromJson);
  }

  /// 获取第三方平台消息状态
  Future<dynamic> controllerGetMessageStatus(String platform, String id) async {
    return await _client.get(ApiPaths.backendPath('/third-party/${platform}/messages/${id}/status'));
  }

  /// 同步第三方平台联系人
  Future<dynamic> controllerSyncContacts(String platform) async {
    return await _client.post(ApiPaths.backendPath('/third-party/${platform}/contacts/sync'));
  }

  /// 获取第三方平台联系人
  Future<dynamic> controllerGetContact(String platform, Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/third-party/${platform}/contacts'), params: params);
  }
}
