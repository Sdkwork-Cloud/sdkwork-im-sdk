package com.sdkwork.backend.api

import com.sdkwork.backend.*
import com.sdkwork.backend.http.HttpClient

class BotsOpenApi(private val client: HttpClient) {

    /** 获取当前 Bot 信息（Bot Token） */
    suspend fun botOpenControllerGetCurrent(): BotOpenProfileResponseDto? {
        return client.get(ApiPaths.backendPath("/bots/open/me")) as? BotOpenProfileResponseDto
    }

    /** 获取当前 Bot 的 Webhook 统计（Bot Token） */
    suspend fun botOpenControllerGetWebhookStats(): BotOpenWebhookStatsResponseDto? {
        return client.get(ApiPaths.backendPath("/bots/open/webhook/stats")) as? BotOpenWebhookStatsResponseDto
    }

    /** 触发当前 Bot 的 Webhook 测试事件（Bot Token） */
    suspend fun botOpenControllerSendWebhookTestEvent(body: BotOpenWebhookTestEventRequestDto): BotOpenWebhookResultResponseDto? {
        return client.post(ApiPaths.backendPath("/bots/open/webhook/test-event"), body) as? BotOpenWebhookResultResponseDto
    }
}
