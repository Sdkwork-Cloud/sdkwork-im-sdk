import '../http/client.dart';
import '../models.dart';
import 'paths.dart';
import '../http/response_mapper.dart';

class ContactsApi {
  final HttpClient _client;
  
  ContactsApi(this._client);

  /// 创建联系人
  Future<Contact?> contactControllerCreate(ContactControllerCreateRequest body) async {
    final response = await _client.post(ApiPaths.backendPath('/contacts'), body: body, contentType: 'application/json');
    return decodeResponse<Contact>(response, Contact.fromJson);
  }

  /// 获取用户的联系人列表
  Future<ContactControllerGetByUserIdResponse?> contactControllerGetByUserId(Map<String, dynamic>? params) async {
    final response = await _client.get(ApiPaths.backendPath('/contacts'), params: params);
    return decodeResponse<ContactControllerGetByUserIdResponse>(response, ContactControllerGetByUserIdResponse.fromJson);
  }

  /// 获取联系人详情
  Future<Contact?> contactControllerGetById(String id) async {
    final response = await _client.get(ApiPaths.backendPath('/contacts/${id}'));
    return decodeResponse<Contact>(response, Contact.fromJson);
  }

  /// 更新联系人
  Future<Contact?> contactControllerUpdate(String id, ContactControllerUpdateRequest body) async {
    final response = await _client.put(ApiPaths.backendPath('/contacts/${id}'), body: body, contentType: 'application/json');
    return decodeResponse<Contact>(response, Contact.fromJson);
  }

  /// 删除联系人
  Future<dynamic> contactControllerDelete(String id) async {
    return await _client.delete(ApiPaths.backendPath('/contacts/${id}'));
  }

  /// 批量删除联系人
  Future<dynamic> contactControllerBatchDelete() async {
    return await _client.delete(ApiPaths.backendPath('/contacts/batch'));
  }

  /// 设置/取消收藏
  Future<dynamic> contactControllerSetFavorite(String id, ContactControllerSetFavoriteRequest body) async {
    return await _client.put(ApiPaths.backendPath('/contacts/${id}/favorite'), body: body, contentType: 'application/json');
  }

  /// 设置备注
  Future<dynamic> contactControllerSetRemark(String id, ContactControllerSetRemarkRequest body) async {
    return await _client.put(ApiPaths.backendPath('/contacts/${id}/remark'), body: body, contentType: 'application/json');
  }

  /// 添加标签
  Future<dynamic> contactControllerAddTag(String id, ContactControllerAddTagRequest body) async {
    return await _client.post(ApiPaths.backendPath('/contacts/${id}/tags'), body: body, contentType: 'application/json');
  }

  /// 移除标签
  Future<dynamic> contactControllerRemoveTag(String id, String tag) async {
    return await _client.delete(ApiPaths.backendPath('/contacts/${id}/tags/${tag}'));
  }

  /// 搜索联系人
  Future<ContactControllerSearchResponse?> contactControllerSearch(String userId, Map<String, dynamic>? params) async {
    final response = await _client.get(ApiPaths.backendPath('/contacts/search/${userId}'), params: params);
    return decodeResponse<ContactControllerSearchResponse>(response, ContactControllerSearchResponse.fromJson);
  }

  /// 获取联系人统计
  Future<dynamic> contactControllerGetStats(String userId) async {
    return await _client.get(ApiPaths.backendPath('/contacts/stats/${userId}'));
  }
}
