package com.sdkwork.im.generated.api

import com.fasterxml.jackson.core.type.TypeReference
import com.sdkwork.im.generated.*
import com.sdkwork.im.generated.http.HttpClient

class MediaApi(private val client: HttpClient) {

    /** Create a media upload record */
    suspend fun createMediaUpload(body: CreateUploadRequest): MediaAsset? {
        val raw = client.post(ApiPaths.apiPath("/media/uploads"), body, null, null, "application/json")
        return client.convertValue(raw, object : TypeReference<MediaAsset>() {})
    }

    /** Complete a media upload */
    suspend fun completeMediaUpload(mediaAssetId: String, body: CompleteUploadRequest): MediaAsset? {
        val raw = client.post(ApiPaths.apiPath("/media/uploads/$mediaAssetId/complete"), body, null, null, "application/json")
        return client.convertValue(raw, object : TypeReference<MediaAsset>() {})
    }

    /** Issue a signed media download URL */
    suspend fun getMediaDownloadUrl(mediaAssetId: String, params: Map<String, Any>? = null): MediaDownloadUrlResponse? {
        val raw = client.get(ApiPaths.apiPath("/media/$mediaAssetId/download-url"), params)
        return client.convertValue(raw, object : TypeReference<MediaDownloadUrlResponse>() {})
    }

    /** Get a media asset by id */
    suspend fun getMediaAsset(mediaAssetId: String): MediaAsset? {
        val raw = client.get(ApiPaths.apiPath("/media/$mediaAssetId"))
        return client.convertValue(raw, object : TypeReference<MediaAsset>() {})
    }

    /** Attach a ready media asset as a conversation message */
    suspend fun attachMediaAsset(mediaAssetId: String, body: AttachMediaRequest): PostMessageResult? {
        val raw = client.post(ApiPaths.apiPath("/media/$mediaAssetId/attach"), body, null, null, "application/json")
        return client.convertValue(raw, object : TypeReference<PostMessageResult>() {})
    }
}
