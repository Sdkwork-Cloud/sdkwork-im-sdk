package com.sdkwork.backend

data class AuthResponseDto(
    val user: Map<String, Any>? = null,
    val token: String? = null,
    val refreshToken: String? = null,
    val expiresIn: Double? = null,
    val imConfig: IMConfigDto? = null
)
