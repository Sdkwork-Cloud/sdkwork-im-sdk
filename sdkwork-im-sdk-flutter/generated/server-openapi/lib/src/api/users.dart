import '../http/client.dart';
import '../models.dart';
import 'paths.dart';

class UsersApi {
  final HttpClient _client;
  
  UsersApi(this._client);

  /// 获取当前用户信息
  Future<dynamic> userControllerGetCurrent() async {
    return await _client.get(ApiPaths.backendPath('/users/me'));
  }

  /// 获取用户详情
  Future<dynamic> userControllerGetById(String id) async {
    return await _client.get(ApiPaths.backendPath('/users/${id}'));
  }

  /// 更新用户资料
  Future<dynamic> userControllerUpdate(String id, UpdateProfileDto body) async {
    return await _client.put(ApiPaths.backendPath('/users/${id}'), body: body, contentType: 'application/json');
  }

  /// 搜索用户
  Future<dynamic> userControllerSearch(Map<String, dynamic>? params) async {
    return await _client.get(ApiPaths.backendPath('/users'), params: params);
  }
}
