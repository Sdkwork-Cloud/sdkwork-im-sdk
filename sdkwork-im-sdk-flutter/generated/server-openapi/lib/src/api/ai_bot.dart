import '../http/client.dart';
import '../models.dart';
import 'paths.dart';

class AiBotApi {
  final HttpClient _client;
  
  AiBotApi(this._client);

  /// Create a new AI Bot
  Future<dynamic> aibotControllerCreateBot(AibotControllerCreateBotRequest body) async {
    return await _client.post(ApiPaths.backendPath('/ai-bots'), body: body, contentType: 'application/json');
  }

  /// Get all AI Bots
  Future<dynamic> aibotControllerGetBots() async {
    return await _client.get(ApiPaths.backendPath('/ai-bots'));
  }

  /// Get an AI Bot by ID
  Future<dynamic> aibotControllerGetBot(String id) async {
    return await _client.get(ApiPaths.backendPath('/ai-bots/${id}'));
  }

  /// Update an AI Bot
  Future<dynamic> aibotControllerUpdateBot(String id, AibotControllerUpdateBotRequest body) async {
    return await _client.put(ApiPaths.backendPath('/ai-bots/${id}'), body: body, contentType: 'application/json');
  }

  /// Delete an AI Bot
  Future<dynamic> aibotControllerDeleteBot(String id) async {
    return await _client.delete(ApiPaths.backendPath('/ai-bots/${id}'));
  }

  /// Activate an AI Bot
  Future<dynamic> aibotControllerActivateBot(String id) async {
    return await _client.post(ApiPaths.backendPath('/ai-bots/${id}/activate'));
  }

  /// Deactivate an AI Bot
  Future<dynamic> aibotControllerDeactivateBot(String id) async {
    return await _client.post(ApiPaths.backendPath('/ai-bots/${id}/deactivate'));
  }

  /// Process a message with AI Bot
  Future<dynamic> aibotControllerProcessMessage(String id, AibotControllerProcessMessageRequest body) async {
    return await _client.post(ApiPaths.backendPath('/ai-bots/${id}/messages'), body: body, contentType: 'application/json');
  }
}
