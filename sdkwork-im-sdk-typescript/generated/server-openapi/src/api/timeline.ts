import { backendApiPath } from './paths';
import type { HttpClient } from '../http/client';
import type { QueryParams } from '../types/common';
import type { CreateTimelinePostDto, ToggleTimelineLikeDto } from '../types';


export class TimelineApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** Create a timeline post */
  async controllerCreatePost(body: CreateTimelinePostDto): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/timeline/posts`), body);
  }

/** Get timeline feed */
  async controllerGetFeed(params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/timeline/feed`), params);
  }

/** Get timeline post detail */
  async controllerGetPost(postId: string | number): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/timeline/posts/${postId}`));
  }

/** Delete own timeline post */
  async controllerDeletePost(postId: string | number): Promise<unknown> {
    return this.client.delete<unknown>(backendApiPath(`/timeline/posts/${postId}`));
  }

/** Get user timeline posts */
  async controllerGetUserPosts(userId: string | number, params?: QueryParams): Promise<unknown> {
    return this.client.get<unknown>(backendApiPath(`/timeline/users/${userId}/posts`), params);
  }

/** Like or unlike timeline post */
  async controllerToggleLike(postId: string | number, body: ToggleTimelineLikeDto): Promise<unknown> {
    return this.client.post<unknown>(backendApiPath(`/timeline/posts/${postId}/likes`), body);
  }
}

export function createTimelineApi(client: HttpClient): TimelineApi {
  return new TimelineApi(client);
}
