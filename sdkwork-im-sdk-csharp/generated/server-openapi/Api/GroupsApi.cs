using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Http;
using Backend.Models;

namespace Backend.Api
{
    public class GroupsApi
    {
        private readonly HttpClient _client;

        public GroupsApi(HttpClient client)
        {
            _client = client;
        }

        /// <summary>
        /// 创建群组
        /// </summary>
        public async Task<Group?> GroupControllerCreateAsync(string body)
        {
            return await _client.PostAsync<Group>(ApiPaths.BackendPath("/groups"), body);
        }

        /// <summary>
        /// 获取群组详情
        /// </summary>
        public async Task<Group?> GroupControllerGetByIdAsync(string id)
        {
            return await _client.GetAsync<Group>(ApiPaths.BackendPath($"/groups/{id}"));
        }

        /// <summary>
        /// 更新群组信息
        /// </summary>
        public async Task<Group?> GroupControllerUpdateAsync(string id, string body)
        {
            return await _client.PutAsync<Group>(ApiPaths.BackendPath($"/groups/{id}"), body);
        }

        /// <summary>
        /// 删除群组
        /// </summary>
        public async Task GroupControllerDeleteAsync(string id)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/groups/{id}"));
        }

        /// <summary>
        /// 添加群成员
        /// </summary>
        public async Task<GroupMember?> GroupControllerAddMemberAsync(string groupId, GroupControllerAddMemberRequest body)
        {
            return await _client.PostAsync<GroupMember>(ApiPaths.BackendPath($"/groups/{groupId}/members"), body);
        }

        /// <summary>
        /// 获取群成员列表
        /// </summary>
        public async Task<GroupControllerGetMembersResponse?> GroupControllerGetMembersAsync(string groupId)
        {
            return await _client.GetAsync<GroupControllerGetMembersResponse>(ApiPaths.BackendPath($"/groups/{groupId}/members"));
        }

        /// <summary>
        /// 移除群成员
        /// </summary>
        public async Task GroupControllerRemoveMemberAsync(string groupId, string userId)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/groups/{groupId}/members/{userId}"));
        }

        /// <summary>
        /// 更新群成员角色
        /// </summary>
        public async Task GroupControllerUpdateMemberRoleAsync(string groupId, string userId, GroupControllerUpdateMemberRoleRequest body)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath($"/groups/{groupId}/members/{userId}/role"), body);
        }

        /// <summary>
        /// 获取用户所在群组列表
        /// </summary>
        public async Task<GroupControllerGetByUserIdResponse?> GroupControllerGetByUserIdAsync(string userId)
        {
            return await _client.GetAsync<GroupControllerGetByUserIdResponse>(ApiPaths.BackendPath($"/groups/user/{userId}"));
        }

        /// <summary>
        /// 发送群组邀请
        /// </summary>
        public async Task<GroupInvitation?> GroupControllerSendInvitationAsync(GroupControllerSendInvitationRequest body)
        {
            return await _client.PostAsync<GroupInvitation>(ApiPaths.BackendPath("/groups/invitation"), body);
        }

        /// <summary>
        /// 接受群组邀请
        /// </summary>
        public async Task GroupControllerAcceptInvitationAsync(string id)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/groups/invitation/{id}/accept"), null);
        }

        /// <summary>
        /// 拒绝群组邀请
        /// </summary>
        public async Task GroupControllerRejectInvitationAsync(string id)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/groups/invitation/{id}/reject"), null);
        }

        /// <summary>
        /// 取消群组邀请
        /// </summary>
        public async Task GroupControllerCancelInvitationAsync(string id)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/groups/invitation/{id}"));
        }

        /// <summary>
        /// 添加用户到群黑名单
        /// </summary>
        public async Task GroupControllerAddToBlacklistAsync(string groupId, GroupControllerAddToBlacklistRequest body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/groups/{groupId}/blacklist"), body);
        }

        /// <summary>
        /// 获取群黑名单列表
        /// </summary>
        public async Task GroupControllerGetBlacklistAsync(string groupId)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/groups/{groupId}/blacklist"));
        }

        /// <summary>
        /// 从群黑名单移除用户
        /// </summary>
        public async Task GroupControllerRemoveFromBlacklistAsync(string groupId, string userId)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/groups/{groupId}/blacklist/{userId}"));
        }

        /// <summary>
        /// 添加用户到群白名单
        /// </summary>
        public async Task GroupControllerAddToWhitelistAsync(string groupId, GroupControllerAddToWhitelistRequest body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/groups/{groupId}/whitelist"), body);
        }

        /// <summary>
        /// 获取群白名单列表
        /// </summary>
        public async Task GroupControllerGetWhitelistAsync(string groupId)
        {
            await _client.GetAsync<object>(ApiPaths.BackendPath($"/groups/{groupId}/whitelist"));
        }

        /// <summary>
        /// 从群白名单移除用户
        /// </summary>
        public async Task GroupControllerRemoveFromWhitelistAsync(string groupId, string userId)
        {
            await _client.DeleteAsync<object>(ApiPaths.BackendPath($"/groups/{groupId}/whitelist/{userId}"));
        }

        /// <summary>
        /// 踢出群成员并加入黑名单
        /// </summary>
        public async Task GroupControllerKickMemberAsync(string groupId, string userId)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/groups/{groupId}/kick/{userId}"), null);
        }

        /// <summary>
        /// 退出群组
        /// </summary>
        public async Task GroupControllerQuitAsync(string groupId, GroupControllerQuitRequest body)
        {
            await _client.PostAsync<object>(ApiPaths.BackendPath($"/groups/{groupId}/quit"), body);
        }

        /// <summary>
        /// 更新群公告
        /// </summary>
        public async Task<Group?> GroupControllerUpdateAnnouncementAsync(string groupId, GroupControllerUpdateAnnouncementRequest body)
        {
            return await _client.PutAsync<Group>(ApiPaths.BackendPath($"/groups/{groupId}/announcement"), body);
        }

        /// <summary>
        /// 全员禁言设置
        /// </summary>
        public async Task<Group?> GroupControllerSetMuteAllAsync(string groupId, GroupControllerSetMuteAllRequest body)
        {
            return await _client.PutAsync<Group>(ApiPaths.BackendPath($"/groups/{groupId}/mute-all"), body);
        }

        /// <summary>
        /// 禁言群成员
        /// </summary>
        public async Task GroupControllerMuteMemberAsync(string groupId, string userId, GroupControllerMuteMemberRequest body)
        {
            await _client.PutAsync<object>(ApiPaths.BackendPath($"/groups/{groupId}/members/{userId}/mute"), body);
        }

        /// <summary>
        /// 转让群主
        /// </summary>
        public async Task<Group?> GroupControllerTransferAsync(string groupId, GroupControllerTransferRequest body)
        {
            return await _client.PostAsync<Group>(ApiPaths.BackendPath($"/groups/{groupId}/transfer"), body);
        }
    }
}
