import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';
import type { FriendControllerAcceptRequestResponse, FriendControllerBlockResponse, FriendControllerCancelRequestResponse, FriendControllerCheckBlockedResponse, FriendControllerCheckFriendshipResponse, FriendControllerGetRequestsResponse, FriendControllerGetResponse, FriendControllerGetSentRequestsResponse, FriendControllerRejectRequestResponse, FriendControllerRemoveResponse, FriendControllerSendRequestResponse, FriendControllerUnblockResponse, SendFriendRequestDto } from '../types';


export class FriendsApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** Send friend request */
  async friendControllerSendRequest(body: SendFriendRequestDto): Promise<FriendControllerSendRequestResponse> {
    return this.client.post<FriendControllerSendRequestResponse>(backendApiPath(`/friends/request`), body);
  }

/** Accept friend request */
  async friendControllerAcceptRequest(id: string | number): Promise<FriendControllerAcceptRequestResponse> {
    return this.client.post<FriendControllerAcceptRequestResponse>(backendApiPath(`/friends/request/${id}/accept`));
  }

/** Reject friend request */
  async friendControllerRejectRequest(id: string | number): Promise<FriendControllerRejectRequestResponse> {
    return this.client.post<FriendControllerRejectRequestResponse>(backendApiPath(`/friends/request/${id}/reject`));
  }

/** Cancel friend request */
  async friendControllerCancelRequest(id: string | number): Promise<FriendControllerCancelRequestResponse> {
    return this.client.delete<FriendControllerCancelRequestResponse>(backendApiPath(`/friends/request/${id}`));
  }

/** Remove friend */
  async friendControllerRemove(friendId: string | number): Promise<FriendControllerRemoveResponse> {
    return this.client.delete<FriendControllerRemoveResponse>(backendApiPath(`/friends/${friendId}`));
  }

/** Get friend requests */
  async friendControllerGetRequests(params?: QueryParams): Promise<FriendControllerGetRequestsResponse> {
    return this.client.get<FriendControllerGetRequestsResponse>(backendApiPath(`/friends/requests`), params);
  }

/** Get sent friend requests */
  async friendControllerGetSentRequests(): Promise<FriendControllerGetSentRequestsResponse> {
    return this.client.get<FriendControllerGetSentRequestsResponse>(backendApiPath(`/friends/requests/sent`));
  }

/** Get friends list */
  async friendControllerGet(): Promise<FriendControllerGetResponse> {
    return this.client.get<FriendControllerGetResponse>(backendApiPath(`/friends`));
  }

/** Check friendship status */
  async friendControllerCheckFriendship(friendId: string | number): Promise<FriendControllerCheckFriendshipResponse> {
    return this.client.get<FriendControllerCheckFriendshipResponse>(backendApiPath(`/friends/${friendId}/check`));
  }

/** Block friend */
  async friendControllerBlock(friendId: string | number): Promise<FriendControllerBlockResponse> {
    return this.client.post<FriendControllerBlockResponse>(backendApiPath(`/friends/${friendId}/block`));
  }

/** Unblock friend */
  async friendControllerUnblock(friendId: string | number): Promise<FriendControllerUnblockResponse> {
    return this.client.post<FriendControllerUnblockResponse>(backendApiPath(`/friends/${friendId}/unblock`));
  }

/** Check if blocked */
  async friendControllerCheckBlocked(friendId: string | number): Promise<FriendControllerCheckBlockedResponse> {
    return this.client.get<FriendControllerCheckBlockedResponse>(backendApiPath(`/friends/${friendId}/blocked`));
  }
}

export function createFriendsApi(client: HttpClient): FriendsApi {
  return new FriendsApi(client);
}
