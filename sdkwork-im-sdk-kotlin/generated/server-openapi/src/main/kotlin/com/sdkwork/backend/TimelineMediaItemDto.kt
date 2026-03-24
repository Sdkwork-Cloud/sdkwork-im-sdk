package com.sdkwork.backend

data class TimelineMediaItemDto(
    val type: String? = null,
    val url: String? = null,
    val width: Double? = null,
    val height: Double? = null,
    val duration: Double? = null,
    val coverUrl: String? = null,
    val extra: Map<String, Any>? = null
)
