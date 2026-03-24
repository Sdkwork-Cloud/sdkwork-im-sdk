package com.sdkwork.backend

data class SendVerificationCodeDto(
    val email: String? = null,
    val phone: String? = null,
    val type: String? = null
)
