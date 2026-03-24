package com.sdkwork.backend

data class LogoutDto(
    val token: String? = null,
    val refreshToken: String? = null,
    val deviceId: String? = null
)
