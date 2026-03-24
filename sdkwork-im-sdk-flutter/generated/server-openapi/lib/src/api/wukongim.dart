import '../http/client.dart';
import 'paths.dart';

class WukongimApi {
  final HttpClient _client;
  
  WukongimApi(this._client);

  /// Get WuKongIM connection config
  Future<dynamic> wukongImappControllerGetConfig() async {
    return await _client.get(ApiPaths.backendPath('/wukongim/config'));
  }

  /// Get WuKongIM user token
  Future<dynamic> wukongImappControllerGetToken() async {
    return await _client.post(ApiPaths.backendPath('/wukongim/token'));
  }
}
