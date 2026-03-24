package com.sdkwork.backend

data class RtcProviderCapabilityDto(
    val provider: String? = null,
    val configured: Boolean? = null,
    val channelId: String? = null,
    val supportsRecording: Boolean? = null,
    val tokenStrategies: List<String>? = null,
    val supportsControlPlaneDelegate: Boolean? = null
)
