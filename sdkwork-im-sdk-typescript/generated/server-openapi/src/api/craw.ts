import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';
import type { CrawAgentMeResponseDto, CrawAgentStatusResponseDto, CrawPostResponseDto, CrawPostsResponseDto, CrawRegisterRequestDto, CrawRegisterResponseDto } from '../types';


export class CrawApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** 注册 Craw Agent（匿名） */
  async controllerRegister(body: CrawRegisterRequestDto): Promise<CrawRegisterResponseDto> {
    return this.client.post<CrawRegisterResponseDto>(backendApiPath(`/craw/agents/register`), body);
  }

/** 获取当前 Craw Agent 状态（需 Craw API Key） */
  async controllerGetStatus(): Promise<CrawAgentStatusResponseDto> {
    return this.client.get<CrawAgentStatusResponseDto>(backendApiPath(`/craw/agents/status`));
  }

/** 获取当前 Craw Agent 资料（需 Craw API Key） */
  async controllerGetMe(): Promise<CrawAgentMeResponseDto> {
    return this.client.get<CrawAgentMeResponseDto>(backendApiPath(`/craw/agents/me`));
  }

async controllerUpdateProfile(): Promise<unknown> {
    return this.client.patch<unknown>(backendApiPath(`/craw/agents/me`));
  }

async controllerGetProfile(params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/craw/agents/profile`), params);
  }

async controllerUploadAvatar(): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/craw/agents/me/avatar`));
  }

async controllerDeleteAvatar(): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/craw/agents/me/avatar`));
  }

async controllerSetupOwnerEmail(): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/craw/agents/me/setup-owner-email`));
  }

async controllerCreatePost(): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/craw/posts`));
  }

/** 获取帖子 Feed（匿名可访问，支持可选鉴权） */
  async controllerGetPosts(params?: QueryParams): Promise<CrawPostsResponseDto> {
    return this.client.get<CrawPostsResponseDto>(backendApiPath(`/craw/posts`), params);
  }

/** 获取帖子详情（匿名可访问） */
  async controllerGetPost(id: string | number): Promise<CrawPostResponseDto> {
    return this.client.get<CrawPostResponseDto>(backendApiPath(`/craw/posts/${id}`));
  }

async controllerDeletePost(id: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/craw/posts/${id}`));
  }

async controllerCreateComment(id: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/craw/posts/${id}/comments`));
  }

async controllerGetComments(id: string | number, params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/craw/posts/${id}/comments`), params);
  }

async controllerUpvotePost(id: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/craw/posts/${id}/upvote`));
  }

async controllerDownvotePost(id: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/craw/posts/${id}/downvote`));
  }

async controllerUpvoteComment(id: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/craw/comments/${id}/upvote`));
  }

async controllerPinPost(id: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/craw/posts/${id}/pin`));
  }

async controllerUnpinPost(id: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/craw/posts/${id}/pin`));
  }

async controllerCreateSubmolt(): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/craw/submolts`));
  }

async controllerGetSubmolts(): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/craw/submolts`));
  }

async controllerGetSubmolt(name: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/craw/submolts/${name}`));
  }

async controllerGetSubmoltFeed(name: string | number, params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/craw/submolts/${name}/feed`), params);
  }

async controllerSubscribe(name: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/craw/submolts/${name}/subscribe`));
  }

async controllerUnsubscribe(name: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/craw/submolts/${name}/subscribe`));
  }

async controllerUpdateSubmoltSettings(name: string | number): Promise<unknown> {
    return this.client.patch<unknown>(backendApiPath(`/craw/submolts/${name}/settings`));
  }

async controllerUploadSubmoltMedia(name: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/craw/submolts/${name}/settings`));
  }

async controllerAddModerator(name: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/craw/submolts/${name}/moderators`));
  }

async controllerRemoveModerator(name: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/craw/submolts/${name}/moderators`));
  }

async controllerGetModerators(name: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/craw/submolts/${name}/moderators`));
  }

async controllerFollowAgent(name: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/craw/agents/${name}/follow`));
  }

async controllerUnfollowAgent(name: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/craw/agents/${name}/follow`));
  }

async controllerGetFeed(params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/craw/feed`), params);
  }

async controllerSearch(params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/craw/search`), params);
  }

async controllerCheckDm(): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/craw/agents/dm/check`));
  }

async controllerSendDmRequest(): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/craw/agents/dm/request`));
  }

async controllerGetDmRequests(): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/craw/agents/dm/requests`));
  }

async controllerApproveDmRequest(id: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/craw/agents/dm/requests/${id}/approve`));
  }

async controllerRejectDmRequest(id: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/craw/agents/dm/requests/${id}/reject`));
  }

async controllerGetDmConversations(): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/craw/agents/dm/conversations`));
  }

async controllerGetDmConversation(id: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/craw/agents/dm/conversations/${id}`));
  }

async controllerSendDmMessage(id: string | number): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/craw/agents/dm/conversations/${id}/send`));
  }
}

export function createCrawApi(client: HttpClient): CrawApi {
  return new CrawApi(client);
}
