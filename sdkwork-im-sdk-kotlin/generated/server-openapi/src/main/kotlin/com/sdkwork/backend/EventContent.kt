package com.sdkwork.backend

data class EventContent(
    val type: String? = null,
    val name: String? = null,
    val data: Map<String, Any>? = null,
    val metadata: Map<String, Any>? = null
)
