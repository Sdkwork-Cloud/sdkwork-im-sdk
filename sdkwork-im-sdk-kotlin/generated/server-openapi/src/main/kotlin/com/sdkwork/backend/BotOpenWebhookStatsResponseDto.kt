package com.sdkwork.backend

data class BotOpenWebhookStatsResponseDto(
    val configured: Boolean? = null,
    val url: String? = null,
    val events: List<String>? = null,
    val pendingRetries: Double? = null
)
