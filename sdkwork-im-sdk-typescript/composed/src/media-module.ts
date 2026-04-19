import type {
  AttachMediaRequest,
  AttachTextMediaOptions,
  ImMediaUploadOptions,
  ImMediaUploadSession,
  ImUploadedMediaAsset,
  CompleteUploadRequest,
  CreateUploadRequest,
  MediaAsset,
  MediaDownloadUrlResponse,
  PostMessageResult,
  QueryParams,
} from './types.js';
import type { ImSdkContext } from './sdk-context.js';
import {
  normalizeUploadSession,
  performPresignedMediaUpload,
} from './media-upload-runtime.js';

export class ImMediaModule {
  constructor(private readonly context: ImSdkContext) {}

  async createUpload(body: CreateUploadRequest): Promise<ImMediaUploadSession> {
    const response = await this.context.transportClient.media.createMediaUpload(body);
    return normalizeUploadSession(response);
  }

  createUploadSession(body: CreateUploadRequest): Promise<ImMediaUploadSession> {
    return this.createUpload(body);
  }

  completeUpload(
    mediaAssetId: string | number,
    body: CompleteUploadRequest,
  ): Promise<MediaAsset> {
    return this.context.transportClient.media.completeMediaUpload(mediaAssetId, body);
  }

  uploadAndComplete(
    options: ImMediaUploadOptions,
  ): Promise<ImUploadedMediaAsset> {
    return this.upload(options);
  }

  async upload(options: ImMediaUploadOptions): Promise<ImUploadedMediaAsset> {
    return performPresignedMediaUpload(this.context, options);
  }

  getDownloadUrl(
    mediaAssetId: string | number,
    params?: QueryParams,
  ): Promise<MediaDownloadUrlResponse> {
    return this.context.transportClient.media.getMediaDownloadUrl(mediaAssetId, params);
  }

  get(mediaAssetId: string | number): Promise<MediaAsset> {
    return this.context.transportClient.media.getMediaAsset(mediaAssetId);
  }

  attach(
    mediaAssetId: string | number,
    body: AttachMediaRequest,
  ): Promise<PostMessageResult> {
    return this.context.transportClient.media.attachMediaAsset(mediaAssetId, body);
  }

  attachText(
    mediaAssetId: string | number,
    options: AttachTextMediaOptions,
  ): Promise<PostMessageResult> {
    return this.attach(mediaAssetId, {
      conversationId: options.conversationId,
      clientMsgId: options.clientMsgId,
      summary: options.summary,
      text: options.text,
      renderHints: options.renderHints,
    });
  }
}
