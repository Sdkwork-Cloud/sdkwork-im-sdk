package com.sdkwork.backend

data class UpdateAgent(
    val name: String? = null,
    val description: String? = null,
    val avatar: String? = null,
    val type: String? = null,
    val config: AgentConfig? = null,
    val isPublic: Boolean? = null,
    val status: String? = null
)
