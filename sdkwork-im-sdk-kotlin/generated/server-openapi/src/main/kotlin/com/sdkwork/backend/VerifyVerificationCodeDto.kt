package com.sdkwork.backend

data class VerifyVerificationCodeDto(
    val email: String? = null,
    val phone: String? = null,
    val code: String? = null,
    val type: String? = null
)
