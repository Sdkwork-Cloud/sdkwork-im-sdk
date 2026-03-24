package com.sdkwork.backend

data class BotOpenStatsDto(
    val totalMessagesSent: Double? = null,
    val totalMessagesReceived: Double? = null,
    val totalUsersInteracted: Double? = null,
    val totalGroupsJoined: Double? = null,
    val totalCommandsExecuted: Double? = null,
    val totalInteractions: Double? = null,
    val lastActivityAt: String? = null
)
