package com.sdkwork.backend

data class EventContentTransport(
    val type: String? = null,
    val name: String? = null,
    val data: Map<String, Any>? = null,
    val metadata: Map<String, Any>? = null
)
