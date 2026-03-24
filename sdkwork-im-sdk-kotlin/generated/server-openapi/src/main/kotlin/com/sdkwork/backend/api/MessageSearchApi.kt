package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class MessageSearchApi(private val client: HttpClient) {

    /** 搜索消息 */
    suspend fun controller(params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/messages/search"), params)
    }

    /** 快速搜索 */
    suspend fun controllerQuick(params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/messages/search/quick"), params)
    }

    /** 搜索会话消息 */
    suspend fun controllerInConversation(params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/messages/search/conversation"), params)
    }

    /** 消息统计 */
    suspend fun controllerGetStats(params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/messages/search/stats"), params)
    }
}
