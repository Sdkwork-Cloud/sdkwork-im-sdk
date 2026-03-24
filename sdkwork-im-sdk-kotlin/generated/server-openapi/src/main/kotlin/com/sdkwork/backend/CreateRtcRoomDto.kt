package com.sdkwork.backend

data class CreateRtcRoomDto(
    val type: String? = null,
    val participants: List<String>? = null,
    val name: String? = null,
    val channelId: String? = null,
    val provider: String? = null,
    val aiMetadata: Map<String, Any>? = null
)
