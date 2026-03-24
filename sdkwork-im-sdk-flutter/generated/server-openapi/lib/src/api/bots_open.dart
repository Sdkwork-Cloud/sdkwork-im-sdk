import '../http/client.dart';
import '../models.dart';
import 'paths.dart';
import '../http/response_mapper.dart';

class BotsOpenApi {
  final HttpClient _client;
  
  BotsOpenApi(this._client);

  /// 获取当前 Bot 信息（Bot Token）
  Future<BotOpenProfileResponseDto?> botOpenControllerGetCurrent() async {
    final response = await _client.get(ApiPaths.backendPath('/bots/open/me'));
    return decodeResponse<BotOpenProfileResponseDto>(response, BotOpenProfileResponseDto.fromJson);
  }

  /// 获取当前 Bot 的 Webhook 统计（Bot Token）
  Future<BotOpenWebhookStatsResponseDto?> botOpenControllerGetWebhookStats() async {
    final response = await _client.get(ApiPaths.backendPath('/bots/open/webhook/stats'));
    return decodeResponse<BotOpenWebhookStatsResponseDto>(response, BotOpenWebhookStatsResponseDto.fromJson);
  }

  /// 触发当前 Bot 的 Webhook 测试事件（Bot Token）
  Future<BotOpenWebhookResultResponseDto?> botOpenControllerSendWebhookTestEvent(BotOpenWebhookTestEventRequestDto body) async {
    final response = await _client.post(ApiPaths.backendPath('/bots/open/webhook/test-event'), body: body, contentType: 'application/json');
    return decodeResponse<BotOpenWebhookResultResponseDto>(response, BotOpenWebhookResultResponseDto.fromJson);
  }
}
