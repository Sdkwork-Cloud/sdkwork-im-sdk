import '../http/client.dart';
import '../models.dart';
import 'paths.dart';

class BotsApi {
  final HttpClient _client;
  
  BotsApi(this._client);

  /// 创建 Bot
  Future<dynamic> botControllerCreate(CreateBotDto body) async {
    return await _client.post(ApiPaths.backendPath('/bots'), body: body, contentType: 'application/json');
  }

  /// 获取 Bot 列表
  Future<dynamic> botControllerGet(Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/bots'), params: params);
  }

  /// 获取 Bot 详情
  Future<dynamic> botControllerGetById(String id) async {
    return await _client.get(ApiPaths.backendPath('/bots/${id}'));
  }

  /// 更新 Bot
  Future<dynamic> botControllerUpdate(String id, UpdateBotDto body) async {
    return await _client.put(ApiPaths.backendPath('/bots/${id}'), body: body, contentType: 'application/json');
  }

  /// 删除 Bot
  Future<dynamic> botControllerDelete(String id) async {
    return await _client.delete(ApiPaths.backendPath('/bots/${id}'));
  }

  /// 重新生成 Bot Token
  Future<dynamic> botControllerRegenerateToken(String id) async {
    return await _client.post(ApiPaths.backendPath('/bots/${id}/regenerate-token'));
  }

  /// 设置 Webhook
  Future<dynamic> botControllerSetWebhook(String id, SetWebhookDto body) async {
    return await _client.post(ApiPaths.backendPath('/bots/${id}/webhook'), body: body, contentType: 'application/json');
  }

  /// 删除 Webhook
  Future<dynamic> botControllerDeleteWebhook(String id) async {
    return await _client.delete(ApiPaths.backendPath('/bots/${id}/webhook'));
  }
}
