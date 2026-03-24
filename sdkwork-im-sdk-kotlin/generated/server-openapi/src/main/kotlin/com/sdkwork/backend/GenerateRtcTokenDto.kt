package com.sdkwork.backend

data class GenerateRtcTokenDto(
    val roomId: String? = null,
    val userId: String? = null,
    val channelId: String? = null,
    val provider: String? = null,
    val role: String? = null,
    val expireSeconds: Double? = null
)
