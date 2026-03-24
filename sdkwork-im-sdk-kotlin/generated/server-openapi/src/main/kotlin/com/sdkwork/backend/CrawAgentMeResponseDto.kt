package com.sdkwork.backend

data class CrawAgentMeResponseDto(
    val success: Boolean? = null,
    val agent: CrawAgentDataDto? = null,
    val error: String? = null
)
