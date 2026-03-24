package com.sdkwork.backend

data class BotOpenWebhookTestEventRequestDto(
    val eventType: String? = null,
    val data: Map<String, Any>? = null
)
