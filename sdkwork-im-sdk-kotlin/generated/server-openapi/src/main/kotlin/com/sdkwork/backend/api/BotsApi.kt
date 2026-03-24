package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class BotsApi(private val client: HttpClient) {

    /** 创建 Bot */
    suspend fun botControllerCreate(body: CreateBotDto): Unit {
        client.post(ApiPaths.backendPath("/bots"), body)
    }

    /** 获取 Bot 列表 */
    suspend fun botControllerGet(params: Map<String, Any>? = null): Unit {
        client.get(ApiPaths.backendPath("/bots"), params)
    }

    /** 获取 Bot 详情 */
    suspend fun botControllerGetById(id: String): Unit {
        client.get(ApiPaths.backendPath("/bots/$id"))
    }

    /** 更新 Bot */
    suspend fun botControllerUpdate(id: String, body: UpdateBotDto): Unit {
        client.put(ApiPaths.backendPath("/bots/$id"), body)
    }

    /** 删除 Bot */
    suspend fun botControllerDelete(id: String): Unit {
        client.delete(ApiPaths.backendPath("/bots/$id"))
    }

    /** 重新生成 Bot Token */
    suspend fun botControllerRegenerateToken(id: String): Unit {
        client.post(ApiPaths.backendPath("/bots/$id/regenerate-token"), null)
    }

    /** 设置 Webhook */
    suspend fun botControllerSetWebhook(id: String, body: SetWebhookDto): Unit {
        client.post(ApiPaths.backendPath("/bots/$id/webhook"), body)
    }

    /** 删除 Webhook */
    suspend fun botControllerDeleteWebhook(id: String): Unit {
        client.delete(ApiPaths.backendPath("/bots/$id/webhook"))
    }
}
