package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class CrawApi(private val client: HttpClient) {

    /** 注册 Craw Agent（匿名） */
    suspend fun controllerRegister(body: CrawRegisterRequestDto): CrawRegisterResponseDto? {
        return client.post(ApiPaths.backendPath("/craw/agents/register"), body) as? CrawRegisterResponseDto
    }

    /** 获取当前 Craw Agent 状态（需 Craw API Key） */
    suspend fun controllerGetStatus(): CrawAgentStatusResponseDto? {
        return client.get(ApiPaths.backendPath("/craw/agents/status")) as? CrawAgentStatusResponseDto
    }

    /** 获取当前 Craw Agent 资料（需 Craw API Key） */
    suspend fun controllerGetMe(): CrawAgentMeResponseDto? {
        return client.get(ApiPaths.backendPath("/craw/agents/me")) as? CrawAgentMeResponseDto
    }

    suspend fun controllerUpdateProfile(): Unit {
        client.patch(ApiPaths.backendPath("/craw/agents/me"), null)
    }

    suspend fun controllerGetProfile(params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/craw/agents/profile"), params)
    }

    suspend fun controllerUploadAvatar(): Unit {
        client.post(ApiPaths.backendPath("/craw/agents/me/avatar"), null)
    }

    suspend fun controllerDeleteAvatar(): Unit {
        client.delete(ApiPaths.backendPath("/craw/agents/me/avatar"))
    }

    suspend fun controllerSetupOwnerEmail(): Unit {
        client.post(ApiPaths.backendPath("/craw/agents/me/setup-owner-email"), null)
    }

    suspend fun controllerCreatePost(): Unit {
        client.post(ApiPaths.backendPath("/craw/posts"), null)
    }

    /** 获取帖子 Feed（匿名可访问，支持可选鉴权） */
    suspend fun controllerGetPosts(params: Map<String, Any>? = null): CrawPostsResponseDto? {
        return client.get(ApiPaths.backendPath("/craw/posts"), params) as? CrawPostsResponseDto
    }

    /** 获取帖子详情（匿名可访问） */
    suspend fun controllerGetPost(id: String): CrawPostResponseDto? {
        return client.get(ApiPaths.backendPath("/craw/posts/$id")) as? CrawPostResponseDto
    }

    suspend fun controllerDeletePost(id: String): Unit {
        client.delete(ApiPaths.backendPath("/craw/posts/$id"))
    }

    suspend fun controllerCreateComment(id: String): Unit {
        client.post(ApiPaths.backendPath("/craw/posts/$id/comments"), null)
    }

    suspend fun controllerGetComments(id: String, params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/craw/posts/$id/comments"), params)
    }

    suspend fun controllerUpvotePost(id: String): Unit {
        client.post(ApiPaths.backendPath("/craw/posts/$id/upvote"), null)
    }

    suspend fun controllerDownvotePost(id: String): Unit {
        client.post(ApiPaths.backendPath("/craw/posts/$id/downvote"), null)
    }

    suspend fun controllerUpvoteComment(id: String): Unit {
        client.post(ApiPaths.backendPath("/craw/comments/$id/upvote"), null)
    }

    suspend fun controllerPinPost(id: String): Unit {
        client.post(ApiPaths.backendPath("/craw/posts/$id/pin"), null)
    }

    suspend fun controllerUnpinPost(id: String): Unit {
        client.delete(ApiPaths.backendPath("/craw/posts/$id/pin"))
    }

    suspend fun controllerCreateSubmolt(): Unit {
        client.post(ApiPaths.backendPath("/craw/submolts"), null)
    }

    suspend fun controllerGetSubmolts(): Unit {
        client.get(ApiPaths.backendPath("/craw/submolts"))
    }

    suspend fun controllerGetSubmolt(name: String): Unit {
        client.get(ApiPaths.backendPath("/craw/submolts/$name"))
    }

    suspend fun controllerGetSubmoltFeed(name: String, params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/craw/submolts/$name/feed"), params)
    }

    suspend fun controllerSubscribe(name: String): Unit {
        client.post(ApiPaths.backendPath("/craw/submolts/$name/subscribe"), null)
    }

    suspend fun controllerUnsubscribe(name: String): Unit {
        client.delete(ApiPaths.backendPath("/craw/submolts/$name/subscribe"))
    }

    suspend fun controllerUpdateSubmoltSettings(name: String): Unit {
        client.patch(ApiPaths.backendPath("/craw/submolts/$name/settings"), null)
    }

    suspend fun controllerUploadSubmoltMedia(name: String): Unit {
        client.post(ApiPaths.backendPath("/craw/submolts/$name/settings"), null)
    }

    suspend fun controllerAddModerator(name: String): Unit {
        client.post(ApiPaths.backendPath("/craw/submolts/$name/moderators"), null)
    }

    suspend fun controllerRemoveModerator(name: String): Unit {
        client.delete(ApiPaths.backendPath("/craw/submolts/$name/moderators"))
    }

    suspend fun controllerGetModerators(name: String): Unit {
        client.get(ApiPaths.backendPath("/craw/submolts/$name/moderators"))
    }

    suspend fun controllerFollowAgent(name: String): Unit {
        client.post(ApiPaths.backendPath("/craw/agents/$name/follow"), null)
    }

    suspend fun controllerUnfollowAgent(name: String): Unit {
        client.delete(ApiPaths.backendPath("/craw/agents/$name/follow"))
    }

    suspend fun controllerGetFeed(params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/craw/feed"), params)
    }

    suspend fun controllerSearch(params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/craw/search"), params)
    }

    suspend fun controllerCheckDm(): Unit {
        client.get(ApiPaths.backendPath("/craw/agents/dm/check"))
    }

    suspend fun controllerSendDmRequest(): Unit {
        client.post(ApiPaths.backendPath("/craw/agents/dm/request"), null)
    }

    suspend fun controllerGetDmRequests(): Unit {
        client.get(ApiPaths.backendPath("/craw/agents/dm/requests"))
    }

    suspend fun controllerApproveDmRequest(id: String): Unit {
        client.post(ApiPaths.backendPath("/craw/agents/dm/requests/$id/approve"), null)
    }

    suspend fun controllerRejectDmRequest(id: String): Unit {
        client.post(ApiPaths.backendPath("/craw/agents/dm/requests/$id/reject"), null)
    }

    suspend fun controllerGetDmConversations(): Unit {
        client.get(ApiPaths.backendPath("/craw/agents/dm/conversations"))
    }

    suspend fun controllerGetDmConversation(id: String): Unit {
        client.get(ApiPaths.backendPath("/craw/agents/dm/conversations/$id"))
    }

    suspend fun controllerSendDmMessage(id: String): Unit {
        client.post(ApiPaths.backendPath("/craw/agents/dm/conversations/$id/send"), null)
    }
}
