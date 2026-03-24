import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';
import type { Group, GroupControllerAddMemberRequest, GroupControllerAddToBlacklistRequest, GroupControllerAddToWhitelistRequest, GroupControllerGetByUserIdResponse, GroupControllerGetMembersResponse, GroupControllerMuteMemberRequest, GroupControllerQuitRequest, GroupControllerSendInvitationRequest, GroupControllerSetMuteAllRequest, GroupControllerTransferRequest, GroupControllerUpdateAnnouncementRequest, GroupControllerUpdateMemberRoleRequest, GroupInvitation, GroupMember } from '../types';


export class GroupsApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** 创建群组 */
  async groupControllerCreate(body: string): Promise<Group> {
    return this.client.post<Group>(backendApiPath(`/groups`), body);
  }

/** 获取群组详情 */
  async groupControllerGetById(id: string | number): Promise<Group> {
    return this.client.get<Group>(backendApiPath(`/groups/${id}`));
  }

/** 更新群组信息 */
  async groupControllerUpdate(id: string | number, body: string): Promise<Group> {
    return this.client.put<Group>(backendApiPath(`/groups/${id}`), body);
  }

/** 删除群组 */
  async groupControllerDelete(id: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/groups/${id}`));
  }

/** 添加群成员 */
  async groupControllerAddMember(groupId: string | number, body: GroupControllerAddMemberRequest): Promise<GroupMember> {
    return this.client.post<GroupMember>(backendApiPath(`/groups/${groupId}/members`), body);
  }

/** 获取群成员列表 */
  async groupControllerGetMembers(groupId: string | number): Promise<GroupControllerGetMembersResponse> {
    return this.client.get<GroupControllerGetMembersResponse>(backendApiPath(`/groups/${groupId}/members`));
  }

/** 移除群成员 */
  async groupControllerRemoveMember(groupId: string | number, userId: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/groups/${groupId}/members/${userId}`));
  }

/** 更新群成员角色 */
  async groupControllerUpdateMemberRole(groupId: string | number, userId: string | number, body: GroupControllerUpdateMemberRoleRequest): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/groups/${groupId}/members/${userId}/role`), body);
  }

/** 获取用户所在群组列表 */
  async groupControllerGetByUserId(userId: string | number): Promise<GroupControllerGetByUserIdResponse> {
    return this.client.get<GroupControllerGetByUserIdResponse>(backendApiPath(`/groups/user/${userId}`));
  }

/** 发送群组邀请 */
  async groupControllerSendInvitation(body: GroupControllerSendInvitationRequest): Promise<GroupInvitation> {
    return this.client.post<GroupInvitation>(backendApiPath(`/groups/invitation`), body);
  }

/** 接受群组邀请 */
  async groupControllerAcceptInvitation(id: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/groups/invitation/${id}/accept`));
  }

/** 拒绝群组邀请 */
  async groupControllerRejectInvitation(id: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/groups/invitation/${id}/reject`));
  }

/** 取消群组邀请 */
  async groupControllerCancelInvitation(id: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/groups/invitation/${id}`));
  }

/** 添加用户到群黑名单 */
  async groupControllerAddToBlacklist(groupId: string | number, body: GroupControllerAddToBlacklistRequest): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/groups/${groupId}/blacklist`), body);
  }

/** 获取群黑名单列表 */
  async groupControllerGetBlacklist(groupId: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/groups/${groupId}/blacklist`));
  }

/** 从群黑名单移除用户 */
  async groupControllerRemoveFromBlacklist(groupId: string | number, userId: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/groups/${groupId}/blacklist/${userId}`));
  }

/** 添加用户到群白名单 */
  async groupControllerAddToWhitelist(groupId: string | number, body: GroupControllerAddToWhitelistRequest): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/groups/${groupId}/whitelist`), body);
  }

/** 获取群白名单列表 */
  async groupControllerGetWhitelist(groupId: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/groups/${groupId}/whitelist`));
  }

/** 从群白名单移除用户 */
  async groupControllerRemoveFromWhitelist(groupId: string | number, userId: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/groups/${groupId}/whitelist/${userId}`));
  }

/** 踢出群成员并加入黑名单 */
  async groupControllerKickMember(groupId: string | number, userId: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/groups/${groupId}/kick/${userId}`));
  }

/** 退出群组 */
  async groupControllerQuit(groupId: string | number, body: GroupControllerQuitRequest): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/groups/${groupId}/quit`), body);
  }

/** 更新群公告 */
  async groupControllerUpdateAnnouncement(groupId: string | number, body: GroupControllerUpdateAnnouncementRequest): Promise<Group> {
    return this.client.put<Group>(backendApiPath(`/groups/${groupId}/announcement`), body);
  }

/** 全员禁言设置 */
  async groupControllerSetMuteAll(groupId: string | number, body: GroupControllerSetMuteAllRequest): Promise<Group> {
    return this.client.put<Group>(backendApiPath(`/groups/${groupId}/mute-all`), body);
  }

/** 禁言群成员 */
  async groupControllerMuteMember(groupId: string | number, userId: string | number, body: GroupControllerMuteMemberRequest): Promise<unknown> {
    return this.client.put<unknown>(backendApiPath(`/groups/${groupId}/members/${userId}/mute`), body);
  }

/** 转让群主 */
  async groupControllerTransfer(groupId: string | number, body: GroupControllerTransferRequest): Promise<Group> {
    return this.client.post<Group>(backendApiPath(`/groups/${groupId}/transfer`), body);
  }
}

export function createGroupsApi(client: HttpClient): GroupsApi {
  return new GroupsApi(client);
}
