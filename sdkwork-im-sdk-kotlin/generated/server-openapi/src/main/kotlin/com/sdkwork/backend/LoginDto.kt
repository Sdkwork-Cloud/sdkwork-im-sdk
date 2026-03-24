package com.sdkwork.backend

data class LoginDto(
    val username: String? = null,
    val password: String? = null,
    val deviceId: String? = null
)
