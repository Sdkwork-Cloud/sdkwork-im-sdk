package com.sdkwork.backend

data class BotOpenWebhookResultResponseDto(
    val success: Boolean? = null,
    val statusCode: Double? = null,
    val error: String? = null,
    val retryCount: Double? = null,
    val latency: Double? = null
)
