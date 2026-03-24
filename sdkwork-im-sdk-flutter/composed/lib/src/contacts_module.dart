import 'package:backend_sdk/src/models.dart';

import 'context.dart';
import 'types.dart';

class OpenChatContactsModule {
  final OpenChatSdkContext context;

  OpenChatContactsModule(this.context);

  Future<Contact?> create(ContactControllerCreateRequest payload) {
    return context.backendClient.contacts.contactControllerCreate(payload);
  }

  Future<Object?> list([Map<String, dynamic>? params]) {
    final mergedParams = <String, dynamic>{
      'userId': context.resolveCurrentUserId(
        pickString(params?['userId']),
      ),
      ...?params,
    };
    return context.backendClient.contacts.contactControllerGetByUserId(
      mergedParams,
    );
  }

  Future<Contact?> get(String id) {
    return context.backendClient.contacts.contactControllerGetById(id);
  }

  Future<Contact?> update(String id, ContactControllerUpdateRequest payload) {
    return context.backendClient.contacts.contactControllerUpdate(id, payload);
  }

  Future<bool> delete(String id) async {
    final dynamic response =
        await context.backendClient.contacts.contactControllerDelete(id);
    return context.normalizeActionSuccess(response);
  }

  Future<Object?> batchDelete(List<String> ids) {
    return context.deleteJson(
      '$imApiPrefix/contacts/batch',
      body: <String, dynamic>{
        'ids': ids,
      },
    );
  }

  Future<bool> setFavorite(String id, bool isFavorite) async {
    final dynamic response =
        await context.backendClient.contacts.contactControllerSetFavorite(
      id,
      ContactControllerSetFavoriteRequest(isFavorite: isFavorite),
    );
    return context.normalizeActionSuccess(response);
  }

  Future<bool> setRemark(String id, String remark) async {
    final dynamic response =
        await context.backendClient.contacts.contactControllerSetRemark(
      id,
      ContactControllerSetRemarkRequest(remark: remark),
    );
    return context.normalizeActionSuccess(response);
  }

  Future<bool> addTag(String id, String tag) async {
    final dynamic response =
        await context.backendClient.contacts.contactControllerAddTag(
      id,
      ContactControllerAddTagRequest(tag: tag),
    );
    return context.normalizeActionSuccess(response);
  }

  Future<bool> removeTag(String id, String tag) async {
    final dynamic response =
        await context.backendClient.contacts.contactControllerRemoveTag(id, tag);
    return context.normalizeActionSuccess(response);
  }

  Future<Object?> search(String userId, String keyword) {
    return context.backendClient.contacts.contactControllerSearch(
      userId,
      <String, dynamic>{'keyword': keyword},
    );
  }

  Future<Object?> getStats([String? userId]) {
    return context.backendClient.contacts.contactControllerGetStats(
      context.resolveCurrentUserId(userId),
    );
  }
}
