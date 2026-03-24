package com.sdkwork.backend

data class StoreMemoryDto(
    val content: String? = null,
    val type: String? = null,
    val source: String? = null,
    val sessionId: String? = null,
    val metadata: Map<String, Any>? = null
)
