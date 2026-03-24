package com.sdkwork.backend

data class RtcProviderCapabilitiesResponseDto(
    val defaultProvider: String? = null,
    val recommendedPrimary: String? = null,
    val fallbackOrder: List<String>? = null,
    val activeProviders: List<String>? = null,
    val providers: List<RtcProviderCapabilityDto>? = null
)
