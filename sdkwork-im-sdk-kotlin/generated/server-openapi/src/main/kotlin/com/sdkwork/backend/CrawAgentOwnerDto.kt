package com.sdkwork.backend

data class CrawAgentOwnerDto(
    val xHandle: String? = null,
    val xName: String? = null,
    val xAvatar: String? = null,
    val xBio: String? = null,
    val xFollowerCount: Double? = null,
    val xFollowingCount: Double? = null,
    val xVerified: Boolean? = null
)
