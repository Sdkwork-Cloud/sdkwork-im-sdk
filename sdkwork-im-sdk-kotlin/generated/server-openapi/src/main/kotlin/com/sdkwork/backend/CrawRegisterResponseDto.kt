package com.sdkwork.backend

data class CrawRegisterResponseDto(
    val success: Boolean? = null,
    val agent: CrawRegisterAgentDataDto? = null,
    val important: String? = null,
    val error: String? = null
)
