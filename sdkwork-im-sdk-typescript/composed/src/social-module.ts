import {
  isRecord,
  normalizeActionSuccess,
  pickString,
  type OpenChatSdkContext,
  unwrapResponse,
} from './sdk-context';

export function createFriendsModule(context: OpenChatSdkContext) {
  return {
    async request(payload: {
      toUserId: string;
      message?: string;
    }): Promise<{ success: boolean; requestId?: string }> {
      const raw = await context.callApi(
        'friends',
        'friendControllerSendRequest',
        [payload],
        () => context.post('/friends/request', payload),
      );
      const data = unwrapResponse<Record<string, unknown>>(raw);
      return {
        success: normalizeActionSuccess(raw),
        requestId: pickString(
          isRecord(raw) ? raw.requestId : undefined,
          isRecord(data) ? data.requestId : undefined,
        ),
      };
    },

    async accept(requestId: string): Promise<boolean> {
      return normalizeActionSuccess(
        await context.callApi(
          'friends',
          'friendControllerAcceptRequest',
          [requestId],
          () => context.post(`/friends/request/${requestId}/accept`),
        ),
      );
    },

    async reject(requestId: string): Promise<boolean> {
      return normalizeActionSuccess(
        await context.callApi(
          'friends',
          'friendControllerRejectRequest',
          [requestId],
          () => context.post(`/friends/request/${requestId}/reject`),
        ),
      );
    },

    async cancel(requestId: string): Promise<boolean> {
      return normalizeActionSuccess(
        await context.callApi(
          'friends',
          'friendControllerCancelRequest',
          [requestId],
          () => context.delete(`/friends/request/${requestId}`),
        ),
      );
    },

    async remove(friendId: string): Promise<boolean> {
      return normalizeActionSuccess(
        await context.callApi(
          'friends',
          'friendControllerRemove',
          [friendId],
          () => context.delete(`/friends/${friendId}`),
        ),
      );
    },

    list(): Promise<unknown> {
      return context.callApi('friends', 'friendControllerGet', [], () =>
        context.get('/friends'),
      );
    },

    requests(params?: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'friends',
        'friendControllerGetRequests',
        [params],
        () => context.get('/friends/requests', params),
      );
    },

    sentRequests(): Promise<unknown> {
      return context.callApi(
        'friends',
        'friendControllerGetSentRequests',
        [],
        () => context.get('/friends/requests/sent'),
      );
    },

    checkFriendship(friendId: string): Promise<unknown> {
      return context.callApi(
        'friends',
        'friendControllerCheckFriendship',
        [friendId],
        () => context.get(`/friends/${friendId}/check`),
      );
    },

    async block(friendId: string): Promise<boolean> {
      return normalizeActionSuccess(
        await context.callApi(
          'friends',
          'friendControllerBlock',
          [friendId],
          () => context.post(`/friends/${friendId}/block`),
        ),
      );
    },

    async unblock(friendId: string): Promise<boolean> {
      return normalizeActionSuccess(
        await context.callApi(
          'friends',
          'friendControllerUnblock',
          [friendId],
          () => context.post(`/friends/${friendId}/unblock`),
        ),
      );
    },

    checkBlocked(friendId: string): Promise<unknown> {
      return context.callApi(
        'friends',
        'friendControllerCheckBlocked',
        [friendId],
        () => context.get(`/friends/${friendId}/blocked`),
      );
    },
  };
}

export function createConversationsModule(context: OpenChatSdkContext) {
  return {
    create(payload: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'conversations',
        'conversationControllerCreate',
        [payload],
        () => context.post('/conversations', payload),
      );
    },

    list(params?: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'conversations',
        'conversationControllerGetByUserId',
        [params],
        () => context.get('/conversations', params),
      );
    },

    getSyncState(params: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'conversations',
        'conversationControllerGetSyncState',
        [params],
        () => context.get('/conversations/sync-state', params),
      );
    },

    getSyncStates(payload: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'conversations',
        'conversationControllerGetSyncStates',
        [payload],
        () => context.post('/conversations/sync-state/batch', payload),
      );
    },

    deleteDeviceSyncState(deviceId: string): Promise<unknown> {
      return context.callApi(
        'conversations',
        'conversationControllerDeleteDeviceSyncState',
        [deviceId],
        () => context.delete(`/conversations/sync-state/device/${deviceId}`),
      );
    },

    getDeviceSyncStateSummaries(params?: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'conversations',
        'conversationControllerGetDeviceSyncStateSummaries',
        [params],
        () => context.get('/conversations/sync-state/devices', params),
      );
    },

    deleteStaleDeviceSyncStates(params?: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'conversations',
        'conversationControllerDeleteStaleDeviceSyncStates',
        [params],
        () => context.delete('/conversations/sync-state/devices/stale', params),
      );
    },

    getByTarget(targetId: string, params: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'conversations',
        'conversationControllerGetByTarget',
        [targetId, params],
        () => context.get(`/conversations/target/${targetId}`, params),
      );
    },

    getTotalUnreadCount(): Promise<unknown> {
      return context.callApi(
        'conversations',
        'conversationControllerGetTotalUnreadCount',
        [],
        () => context.get('/conversations/unread-total/me'),
      );
    },

    get(id: string): Promise<unknown> {
      return context.callApi(
        'conversations',
        'conversationControllerGetById',
        [id],
        () => context.get(`/conversations/${id}`),
      );
    },

    update(id: string, payload: Record<string, unknown>): Promise<unknown> {
      return context.callApi(
        'conversations',
        'conversationControllerUpdate',
        [id, payload],
        () => context.put(`/conversations/${id}`, payload),
      );
    },

    async delete(id: string): Promise<boolean> {
      return normalizeActionSuccess(
        await context.callApi(
          'conversations',
          'conversationControllerDelete',
          [id],
          () => context.delete(`/conversations/${id}`),
        ),
      );
    },

    async pin(id: string, isPinned: boolean): Promise<boolean> {
      return normalizeActionSuccess(
        await context.callApi(
          'conversations',
          'conversationControllerPin',
          [id, { isPinned }],
          () => context.put(`/conversations/${id}/pin`, { isPinned }),
        ),
      );
    },

    async mute(id: string, isMuted: boolean): Promise<boolean> {
      return normalizeActionSuccess(
        await context.callApi(
          'conversations',
          'conversationControllerMute',
          [id, { isMuted }],
          () => context.put(`/conversations/${id}/mute`, { isMuted }),
        ),
      );
    },

    async clearUnreadCount(id: string): Promise<boolean> {
      return normalizeActionSuccess(
        await context.callApi(
          'conversations',
          'conversationControllerClearUnreadCount',
          [id],
          () => context.put(`/conversations/${id}/read`),
        ),
      );
    },

    batchDelete(ids: string[]): Promise<unknown> {
      return context.deleteWithBody('/conversations/batch', { ids });
    },
  };
}

export function createGroupsModule(context: OpenChatSdkContext) {
  return {
    create: (payload: Record<string, unknown>) =>
      context.callApi('groups', 'groupControllerCreate', [payload], () =>
        context.post('/groups', payload),
      ),
    get: (id: string) =>
      context.callApi('groups', 'groupControllerGetById', [id], () =>
        context.get(`/groups/${id}`),
      ),
    update: (id: string, payload: Record<string, unknown>) =>
      context.callApi('groups', 'groupControllerUpdate', [id, payload], () =>
        context.put(`/groups/${id}`, payload),
      ),
    delete: async (id: string) =>
      normalizeActionSuccess(
        await context.callApi('groups', 'groupControllerDelete', [id], () =>
          context.delete(`/groups/${id}`),
        ),
      ),
    addMember: (groupId: string, payload: Record<string, unknown>) =>
      context.callApi('groups', 'groupControllerAddMember', [groupId, payload], () =>
        context.post(`/groups/${groupId}/members`, payload),
      ),
    members: (groupId: string) =>
      context.callApi('groups', 'groupControllerGetMembers', [groupId], () =>
        context.get(`/groups/${groupId}/members`),
      ),
    removeMember: async (groupId: string, userId: string) =>
      normalizeActionSuccess(
        await context.callApi('groups', 'groupControllerRemoveMember', [groupId, userId], () =>
          context.delete(`/groups/${groupId}/members/${userId}`),
        ),
      ),
    updateMemberRole: async (groupId: string, userId: string, role: string) =>
      normalizeActionSuccess(
        await context.callApi('groups', 'groupControllerUpdateMemberRole', [groupId, userId, { role }], () =>
          context.put(`/groups/${groupId}/members/${userId}/role`, { role }),
        ),
      ),
    listByUser: (userId?: string) =>
      context.callApi('groups', 'groupControllerGetByUserId', [context.resolveCurrentUserId(userId)], () =>
        context.get(`/groups/user/${context.resolveCurrentUserId(userId)}`),
      ),
    sendInvitation: (payload: Record<string, unknown>) =>
      context.callApi('groups', 'groupControllerSendInvitation', [payload], () =>
        context.post('/groups/invitation', payload),
      ),
    acceptInvitation: async (invitationId: string) =>
      normalizeActionSuccess(
        await context.callApi('groups', 'groupControllerAcceptInvitation', [invitationId], () =>
          context.post(`/groups/invitation/${invitationId}/accept`),
        ),
      ),
    rejectInvitation: async (invitationId: string) =>
      normalizeActionSuccess(
        await context.callApi('groups', 'groupControllerRejectInvitation', [invitationId], () =>
          context.post(`/groups/invitation/${invitationId}/reject`),
        ),
      ),
    cancelInvitation: async (invitationId: string) =>
      normalizeActionSuccess(
        await context.callApi('groups', 'groupControllerCancelInvitation', [invitationId], () =>
          context.delete(`/groups/invitation/${invitationId}`),
        ),
      ),
    addToBlacklist: async (groupId: string, userId: string) =>
      normalizeActionSuccess(
        await context.callApi('groups', 'groupControllerAddToBlacklist', [groupId, { userId }], () =>
          context.post(`/groups/${groupId}/blacklist`, { userId }),
        ),
      ),
    getBlacklist: (groupId: string) =>
      context.callApi('groups', 'groupControllerGetBlacklist', [groupId], () =>
        context.get(`/groups/${groupId}/blacklist`),
      ),
    removeFromBlacklist: async (groupId: string, userId: string) =>
      normalizeActionSuccess(
        await context.callApi('groups', 'groupControllerRemoveFromBlacklist', [groupId, userId], () =>
          context.delete(`/groups/${groupId}/blacklist/${userId}`),
        ),
      ),
    addToWhitelist: async (groupId: string, userId: string) =>
      normalizeActionSuccess(
        await context.callApi('groups', 'groupControllerAddToWhitelist', [groupId, { userId }], () =>
          context.post(`/groups/${groupId}/whitelist`, { userId }),
        ),
      ),
    getWhitelist: (groupId: string) =>
      context.callApi('groups', 'groupControllerGetWhitelist', [groupId], () =>
        context.get(`/groups/${groupId}/whitelist`),
      ),
    removeFromWhitelist: async (groupId: string, userId: string) =>
      normalizeActionSuccess(
        await context.callApi('groups', 'groupControllerRemoveFromWhitelist', [groupId, userId], () =>
          context.delete(`/groups/${groupId}/whitelist/${userId}`),
        ),
      ),
    kickMember: async (groupId: string, userId: string) =>
      normalizeActionSuccess(
        await context.callApi('groups', 'groupControllerKickMember', [groupId, userId], () =>
          context.post(`/groups/${groupId}/kick/${userId}`),
        ),
      ),
    quit: async (groupId: string, userId?: string) =>
      normalizeActionSuccess(
        await context.callApi('groups', 'groupControllerQuit', [groupId, { userId: context.resolveCurrentUserId(userId) }], () =>
          context.post(`/groups/${groupId}/quit`, { userId: context.resolveCurrentUserId(userId) }),
        ),
      ),
    updateAnnouncement: (groupId: string, announcement: string) =>
      context.callApi('groups', 'groupControllerUpdateAnnouncement', [groupId, { announcement }], () =>
        context.put(`/groups/${groupId}/announcement`, { announcement }),
      ),
    setMuteAll: (groupId: string, muteAll: boolean) =>
      context.callApi('groups', 'groupControllerSetMuteAll', [groupId, { muteAll }], () =>
        context.put(`/groups/${groupId}/mute-all`, { muteAll }),
      ),
    muteMember: async (groupId: string, userId: string, duration: number) =>
      normalizeActionSuccess(
        await context.callApi('groups', 'groupControllerMuteMember', [groupId, userId, { duration }], () =>
          context.put(`/groups/${groupId}/members/${userId}/mute`, { duration }),
        ),
      ),
    transfer: (groupId: string, newOwnerId: string) =>
      context.callApi('groups', 'groupControllerTransfer', [groupId, { newOwnerId }], () =>
        context.post(`/groups/${groupId}/transfer`, { newOwnerId }),
      ),
  };
}

export function createContactsModule(context: OpenChatSdkContext) {
  return {
    create: (payload: Record<string, unknown>) =>
      context.callApi('contacts', 'contactControllerCreate', [payload], () =>
        context.post('/contacts', payload),
      ),
    list: (params?: Record<string, unknown>) =>
      context.callApi('contacts', 'contactControllerGetByUserId', [params], () =>
        context.get('/contacts', {
          userId: context.resolveCurrentUserId(
            pickString(isRecord(params) ? params.userId : undefined),
          ),
          ...params,
        }),
      ),
    get: (id: string) =>
      context.callApi('contacts', 'contactControllerGetById', [id], () =>
        context.get(`/contacts/${id}`),
      ),
    update: (id: string, payload: Record<string, unknown>) =>
      context.callApi('contacts', 'contactControllerUpdate', [id, payload], () =>
        context.put(`/contacts/${id}`, payload),
      ),
    delete: async (id: string) =>
      normalizeActionSuccess(
        await context.callApi('contacts', 'contactControllerDelete', [id], () =>
          context.delete(`/contacts/${id}`),
        ),
      ),
    batchDelete: (ids: string[]) => context.deleteWithBody('/contacts/batch', { ids }),
    setFavorite: async (id: string, isFavorite: boolean) =>
      normalizeActionSuccess(
        await context.callApi('contacts', 'contactControllerSetFavorite', [id, { isFavorite }], () =>
          context.put(`/contacts/${id}/favorite`, { isFavorite }),
        ),
      ),
    setRemark: async (id: string, remark: string) =>
      normalizeActionSuccess(
        await context.callApi('contacts', 'contactControllerSetRemark', [id, { remark }], () =>
          context.put(`/contacts/${id}/remark`, { remark }),
        ),
      ),
    addTag: async (id: string, tag: string) =>
      normalizeActionSuccess(
        await context.callApi('contacts', 'contactControllerAddTag', [id, { tag }], () =>
          context.post(`/contacts/${id}/tags`, { tag }),
        ),
      ),
    removeTag: async (id: string, tag: string) =>
      normalizeActionSuccess(
        await context.callApi('contacts', 'contactControllerRemoveTag', [id, tag], () =>
          context.delete(`/contacts/${id}/tags/${tag}`),
        ),
      ),
    search: (userId: string, keyword: string) =>
      context.callApi('contacts', 'contactControllerSearch', [userId, { keyword }], () =>
        context.get(`/contacts/search/${userId}`, { keyword }),
      ),
    getStats: (userId?: string) =>
      context.callApi('contacts', 'contactControllerGetStats', [context.resolveCurrentUserId(userId)], () =>
        context.get(`/contacts/stats/${context.resolveCurrentUserId(userId)}`),
      ),
  };
}
