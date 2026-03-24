package com.sdkwork.backend

data class RegisterDto(
    val username: String? = null,
    val password: String? = null,
    val nickname: String? = null,
    val email: String? = null,
    val phone: String? = null,
    val code: String? = null
)
