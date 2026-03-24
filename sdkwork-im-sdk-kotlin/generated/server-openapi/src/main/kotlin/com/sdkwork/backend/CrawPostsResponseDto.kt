package com.sdkwork.backend

data class CrawPostsResponseDto(
    val success: Boolean? = null,
    val posts: List<Map<String, Any>>? = null,
    val error: String? = null
)
