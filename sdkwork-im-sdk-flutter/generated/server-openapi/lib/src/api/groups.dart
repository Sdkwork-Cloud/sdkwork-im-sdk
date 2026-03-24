import '../http/client.dart';
import '../models.dart';
import 'paths.dart';
import '../http/response_mapper.dart';

class GroupsApi {
  final HttpClient _client;
  
  GroupsApi(this._client);

  /// 创建群组
  Future<Group?> groupControllerCreate(String body) async {
    final response = await _client.post(ApiPaths.backendPath('/groups'), body: body, contentType: 'application/json');
    return decodeResponse<Group>(response, Group.fromJson);
  }

  /// 获取群组详情
  Future<Group?> groupControllerGetById(String id) async {
    final response = await _client.get(ApiPaths.backendPath('/groups/${id}'));
    return decodeResponse<Group>(response, Group.fromJson);
  }

  /// 更新群组信息
  Future<Group?> groupControllerUpdate(String id, String body) async {
    final response = await _client.put(ApiPaths.backendPath('/groups/${id}'), body: body, contentType: 'application/json');
    return decodeResponse<Group>(response, Group.fromJson);
  }

  /// 删除群组
  Future<dynamic> groupControllerDelete(String id) async {
    return await _client.delete(ApiPaths.backendPath('/groups/${id}'));
  }

  /// 添加群成员
  Future<GroupMember?> groupControllerAddMember(String groupId, GroupControllerAddMemberRequest body) async {
    final response = await _client.post(ApiPaths.backendPath('/groups/${groupId}/members'), body: body, contentType: 'application/json');
    return decodeResponse<GroupMember>(response, GroupMember.fromJson);
  }

  /// 获取群成员列表
  Future<GroupControllerGetMembersResponse?> groupControllerGetMembers(String groupId) async {
    final response = await _client.get(ApiPaths.backendPath('/groups/${groupId}/members'));
    return decodeResponse<GroupControllerGetMembersResponse>(response, GroupControllerGetMembersResponse.fromJson);
  }

  /// 移除群成员
  Future<dynamic> groupControllerRemoveMember(String groupId, String userId) async {
    return await _client.delete(ApiPaths.backendPath('/groups/${groupId}/members/${userId}'));
  }

  /// 更新群成员角色
  Future<dynamic> groupControllerUpdateMemberRole(String groupId, String userId, GroupControllerUpdateMemberRoleRequest body) async {
    return await _client.put(ApiPaths.backendPath('/groups/${groupId}/members/${userId}/role'), body: body, contentType: 'application/json');
  }

  /// 获取用户所在群组列表
  Future<GroupControllerGetByUserIdResponse?> groupControllerGetByUserId(String userId) async {
    final response = await _client.get(ApiPaths.backendPath('/groups/user/${userId}'));
    return decodeResponse<GroupControllerGetByUserIdResponse>(response, GroupControllerGetByUserIdResponse.fromJson);
  }

  /// 发送群组邀请
  Future<GroupInvitation?> groupControllerSendInvitation(GroupControllerSendInvitationRequest body) async {
    final response = await _client.post(ApiPaths.backendPath('/groups/invitation'), body: body, contentType: 'application/json');
    return decodeResponse<GroupInvitation>(response, GroupInvitation.fromJson);
  }

  /// 接受群组邀请
  Future<dynamic> groupControllerAcceptInvitation(String id) async {
    return await _client.post(ApiPaths.backendPath('/groups/invitation/${id}/accept'));
  }

  /// 拒绝群组邀请
  Future<dynamic> groupControllerRejectInvitation(String id) async {
    return await _client.post(ApiPaths.backendPath('/groups/invitation/${id}/reject'));
  }

  /// 取消群组邀请
  Future<dynamic> groupControllerCancelInvitation(String id) async {
    return await _client.delete(ApiPaths.backendPath('/groups/invitation/${id}'));
  }

  /// 添加用户到群黑名单
  Future<dynamic> groupControllerAddToBlacklist(String groupId, GroupControllerAddToBlacklistRequest body) async {
    return await _client.post(ApiPaths.backendPath('/groups/${groupId}/blacklist'), body: body, contentType: 'application/json');
  }

  /// 获取群黑名单列表
  Future<dynamic> groupControllerGetBlacklist(String groupId) async {
    return await _client.get(ApiPaths.backendPath('/groups/${groupId}/blacklist'));
  }

  /// 从群黑名单移除用户
  Future<dynamic> groupControllerRemoveFromBlacklist(String groupId, String userId) async {
    return await _client.delete(ApiPaths.backendPath('/groups/${groupId}/blacklist/${userId}'));
  }

  /// 添加用户到群白名单
  Future<dynamic> groupControllerAddToWhitelist(String groupId, GroupControllerAddToWhitelistRequest body) async {
    return await _client.post(ApiPaths.backendPath('/groups/${groupId}/whitelist'), body: body, contentType: 'application/json');
  }

  /// 获取群白名单列表
  Future<dynamic> groupControllerGetWhitelist(String groupId) async {
    return await _client.get(ApiPaths.backendPath('/groups/${groupId}/whitelist'));
  }

  /// 从群白名单移除用户
  Future<dynamic> groupControllerRemoveFromWhitelist(String groupId, String userId) async {
    return await _client.delete(ApiPaths.backendPath('/groups/${groupId}/whitelist/${userId}'));
  }

  /// 踢出群成员并加入黑名单
  Future<dynamic> groupControllerKickMember(String groupId, String userId) async {
    return await _client.post(ApiPaths.backendPath('/groups/${groupId}/kick/${userId}'));
  }

  /// 退出群组
  Future<dynamic> groupControllerQuit(String groupId, GroupControllerQuitRequest body) async {
    return await _client.post(ApiPaths.backendPath('/groups/${groupId}/quit'), body: body, contentType: 'application/json');
  }

  /// 更新群公告
  Future<Group?> groupControllerUpdateAnnouncement(String groupId, GroupControllerUpdateAnnouncementRequest body) async {
    final response = await _client.put(ApiPaths.backendPath('/groups/${groupId}/announcement'), body: body, contentType: 'application/json');
    return decodeResponse<Group>(response, Group.fromJson);
  }

  /// 全员禁言设置
  Future<Group?> groupControllerSetMuteAll(String groupId, GroupControllerSetMuteAllRequest body) async {
    final response = await _client.put(ApiPaths.backendPath('/groups/${groupId}/mute-all'), body: body, contentType: 'application/json');
    return decodeResponse<Group>(response, Group.fromJson);
  }

  /// 禁言群成员
  Future<dynamic> groupControllerMuteMember(String groupId, String userId, GroupControllerMuteMemberRequest body) async {
    return await _client.put(ApiPaths.backendPath('/groups/${groupId}/members/${userId}/mute'), body: body, contentType: 'application/json');
  }

  /// 转让群主
  Future<Group?> groupControllerTransfer(String groupId, GroupControllerTransferRequest body) async {
    final response = await _client.post(ApiPaths.backendPath('/groups/${groupId}/transfer'), body: body, contentType: 'application/json');
    return decodeResponse<Group>(response, Group.fromJson);
  }
}
