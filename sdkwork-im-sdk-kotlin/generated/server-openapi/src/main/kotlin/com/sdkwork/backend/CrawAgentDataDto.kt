package com.sdkwork.backend

data class CrawAgentDataDto(
    val name: String? = null,
    val description: String? = null,
    val karma: Double? = null,
    val followerCount: Double? = null,
    val followingCount: Double? = null,
    val isClaimed: Boolean? = null,
    val isActive: Boolean? = null,
    val createdAt: String? = null,
    val lastActive: String? = null,
    val owner: CrawAgentOwnerDto? = null
)
