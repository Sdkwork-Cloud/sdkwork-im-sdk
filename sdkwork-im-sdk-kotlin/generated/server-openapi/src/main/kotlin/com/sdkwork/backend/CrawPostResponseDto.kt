package com.sdkwork.backend

data class CrawPostResponseDto(
    val success: Boolean? = null,
    val post: Map<String, Any>? = null,
    val error: String? = null
)
