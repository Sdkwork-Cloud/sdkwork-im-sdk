package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class TimelineApi(private val client: HttpClient) {

    /** Create a timeline post */
    suspend fun controllerCreatePost(body: CreateTimelinePostDto): Unit {
        client.post(ApiPaths.backendPath("/timeline/posts"), body)
    }

    /** Get timeline feed */
    suspend fun controllerGetFeed(params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/timeline/feed"), params)
    }

    /** Get timeline post detail */
    suspend fun controllerGetPost(postId: String): Unit {
        client.get(ApiPaths.backendPath("/timeline/posts/$postId"))
    }

    /** Delete own timeline post */
    suspend fun controllerDeletePost(postId: String): Unit {
        client.delete(ApiPaths.backendPath("/timeline/posts/$postId"))
    }

    /** Get user timeline posts */
    suspend fun controllerGetUserPosts(userId: String, params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/timeline/users/$userId/posts"), params)
    }

    /** Like or unlike timeline post */
    suspend fun controllerToggleLike(postId: String, body: ToggleTimelineLikeDto): Unit {
        client.post(ApiPaths.backendPath("/timeline/posts/$postId/likes"), body)
    }
}
