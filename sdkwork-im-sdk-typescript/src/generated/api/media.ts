import { apiPath } from './paths.js';
import type { HttpClient } from '../http/client.js';
import type { QueryParams } from '../types/common.js';
import type {
  AttachMediaRequest,
  CompleteUploadRequest,
  CreateUploadRequest,
  MediaAsset,
  MediaDownloadUrlResponse,
  MediaUploadSessionResponse,
  PostMessageResult,
} from '../types/index.js';


export class MediaApi {
  private client: HttpClient;
  
  constructor(client: HttpClient) { 
    this.client = client; 
  }

/** Create a media upload session with presigned client-upload metadata */
  async createMediaUpload(body: CreateUploadRequest): Promise<MediaUploadSessionResponse> {
    return this.client.post<MediaUploadSessionResponse>(apiPath(`/media/uploads`), body, undefined, undefined, 'application/json');
  }

/** Complete a media upload */
  async completeMediaUpload(mediaAssetId: string | number, body: CompleteUploadRequest): Promise<MediaAsset> {
    return this.client.post<MediaAsset>(apiPath(`/media/uploads/${mediaAssetId}/complete`), body, undefined, undefined, 'application/json');
  }

/** Issue a signed media download URL */
  async getMediaDownloadUrl(mediaAssetId: string | number, params?: QueryParams): Promise<MediaDownloadUrlResponse> {
    return this.client.get<MediaDownloadUrlResponse>(apiPath(`/media/${mediaAssetId}/download-url`), params);
  }

/** Get a media asset by id */
  async getMediaAsset(mediaAssetId: string | number): Promise<MediaAsset> {
    return this.client.get<MediaAsset>(apiPath(`/media/${mediaAssetId}`));
  }

/** Attach a ready media asset as a conversation message */
  async attachMediaAsset(mediaAssetId: string | number, body: AttachMediaRequest): Promise<PostMessageResult> {
    return this.client.post<PostMessageResult>(apiPath(`/media/${mediaAssetId}/attach`), body, undefined, undefined, 'application/json');
  }
}

export function createMediaApi(client: HttpClient): MediaApi {
  return new MediaApi(client);
}
