from typing import Any, Dict, List, Optional
from ..http_client import HttpClient
from ..models import Group, GroupControllerAddMemberRequest, GroupControllerAddToBlacklistRequest, GroupControllerAddToWhitelistRequest, GroupControllerGetByUserIdResponse, GroupControllerGetMembersResponse, GroupControllerMuteMemberRequest, GroupControllerQuitRequest, GroupControllerSendInvitationRequest, GroupControllerSetMuteAllRequest, GroupControllerTransferRequest, GroupControllerUpdateAnnouncementRequest, GroupControllerUpdateMemberRoleRequest, GroupInvitation, GroupMember

class GroupsApi:
    """groups API client."""
    
    def __init__(self, client: HttpClient):
        self._client = client

    def group_controller_create(self, body: str) -> Group:
        """创建群组"""
        return self._client.post(f"/im/v3/groups", json=body)

    def group_controller_get_by_id(self, id: str) -> Group:
        """获取群组详情"""
        return self._client.get(f"/im/v3/groups/{id}")

    def group_controller_update(self, id: str, body: str) -> Group:
        """更新群组信息"""
        return self._client.put(f"/im/v3/groups/{id}", json=body)

    def group_controller_delete(self, id: str) -> None:
        """删除群组"""
        return self._client.delete(f"/im/v3/groups/{id}")

    def group_controller_add_member(self, groupId: str, body: GroupControllerAddMemberRequest) -> GroupMember:
        """添加群成员"""
        return self._client.post(f"/im/v3/groups/{groupId}/members", json=body)

    def group_controller_get_members(self, groupId: str) -> GroupControllerGetMembersResponse:
        """获取群成员列表"""
        return self._client.get(f"/im/v3/groups/{groupId}/members")

    def group_controller_remove_member(self, groupId: str, userId: str) -> None:
        """移除群成员"""
        return self._client.delete(f"/im/v3/groups/{groupId}/members/{userId}")

    def group_controller_update_member_role(self, groupId: str, userId: str, body: GroupControllerUpdateMemberRoleRequest) -> None:
        """更新群成员角色"""
        return self._client.put(f"/im/v3/groups/{groupId}/members/{userId}/role", json=body)

    def group_controller_get_by_user_id(self, userId: str) -> GroupControllerGetByUserIdResponse:
        """获取用户所在群组列表"""
        return self._client.get(f"/im/v3/groups/user/{userId}")

    def group_controller_send_invitation(self, body: GroupControllerSendInvitationRequest) -> GroupInvitation:
        """发送群组邀请"""
        return self._client.post(f"/im/v3/groups/invitation", json=body)

    def group_controller_accept_invitation(self, id: str) -> None:
        """接受群组邀请"""
        return self._client.post(f"/im/v3/groups/invitation/{id}/accept")

    def group_controller_reject_invitation(self, id: str) -> None:
        """拒绝群组邀请"""
        return self._client.post(f"/im/v3/groups/invitation/{id}/reject")

    def group_controller_cancel_invitation(self, id: str) -> None:
        """取消群组邀请"""
        return self._client.delete(f"/im/v3/groups/invitation/{id}")

    def group_controller_add_to_blacklist(self, groupId: str, body: GroupControllerAddToBlacklistRequest) -> None:
        """添加用户到群黑名单"""
        return self._client.post(f"/im/v3/groups/{groupId}/blacklist", json=body)

    def group_controller_get_blacklist(self, groupId: str) -> None:
        """获取群黑名单列表"""
        return self._client.get(f"/im/v3/groups/{groupId}/blacklist")

    def group_controller_remove_from_blacklist(self, groupId: str, userId: str) -> None:
        """从群黑名单移除用户"""
        return self._client.delete(f"/im/v3/groups/{groupId}/blacklist/{userId}")

    def group_controller_add_to_whitelist(self, groupId: str, body: GroupControllerAddToWhitelistRequest) -> None:
        """添加用户到群白名单"""
        return self._client.post(f"/im/v3/groups/{groupId}/whitelist", json=body)

    def group_controller_get_whitelist(self, groupId: str) -> None:
        """获取群白名单列表"""
        return self._client.get(f"/im/v3/groups/{groupId}/whitelist")

    def group_controller_remove_from_whitelist(self, groupId: str, userId: str) -> None:
        """从群白名单移除用户"""
        return self._client.delete(f"/im/v3/groups/{groupId}/whitelist/{userId}")

    def group_controller_kick_member(self, groupId: str, userId: str) -> None:
        """踢出群成员并加入黑名单"""
        return self._client.post(f"/im/v3/groups/{groupId}/kick/{userId}")

    def group_controller_quit(self, groupId: str, body: GroupControllerQuitRequest) -> None:
        """退出群组"""
        return self._client.post(f"/im/v3/groups/{groupId}/quit", json=body)

    def group_controller_update_announcement(self, groupId: str, body: GroupControllerUpdateAnnouncementRequest) -> Group:
        """更新群公告"""
        return self._client.put(f"/im/v3/groups/{groupId}/announcement", json=body)

    def group_controller_set_mute_all(self, groupId: str, body: GroupControllerSetMuteAllRequest) -> Group:
        """全员禁言设置"""
        return self._client.put(f"/im/v3/groups/{groupId}/mute-all", json=body)

    def group_controller_mute_member(self, groupId: str, userId: str, body: GroupControllerMuteMemberRequest) -> None:
        """禁言群成员"""
        return self._client.put(f"/im/v3/groups/{groupId}/members/{userId}/mute", json=body)

    def group_controller_transfer(self, groupId: str, body: GroupControllerTransferRequest) -> Group:
        """转让群主"""
        return self._client.post(f"/im/v3/groups/{groupId}/transfer", json=body)
