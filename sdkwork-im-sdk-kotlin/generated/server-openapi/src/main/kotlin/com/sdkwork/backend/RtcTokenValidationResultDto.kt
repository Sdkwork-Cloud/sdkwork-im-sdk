package com.sdkwork.backend

data class RtcTokenValidationResultDto(
    val valid: Boolean? = null,
    val roomId: String? = null,
    val userId: String? = null,
    val provider: String? = null,
    val channelId: String? = null,
    val role: String? = null,
    val expiresAt: String? = null
)
