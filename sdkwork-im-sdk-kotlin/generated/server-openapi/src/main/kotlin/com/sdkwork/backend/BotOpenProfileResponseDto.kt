package com.sdkwork.backend

data class BotOpenProfileResponseDto(
    val id: String? = null,
    val name: String? = null,
    val username: String? = null,
    val appId: String? = null,
    val description: String? = null,
    val avatar: String? = null,
    val homepage: String? = null,
    val developerName: String? = null,
    val developerEmail: String? = null,
    val intents: Double? = null,
    val scopes: List<String>? = null,
    val status: String? = null,
    val stats: BotOpenStatsDto? = null,
    val createdAt: String? = null,
    val updatedAt: String? = null
)
