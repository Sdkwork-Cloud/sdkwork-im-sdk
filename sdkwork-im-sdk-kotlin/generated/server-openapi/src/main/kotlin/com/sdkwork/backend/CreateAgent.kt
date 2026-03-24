package com.sdkwork.backend

data class CreateAgent(
    val name: String? = null,
    val description: String? = null,
    val avatar: String? = null,
    val type: String? = null,
    val config: AgentConfig? = null,
    val isPublic: Boolean? = null
)
