package com.sdkwork.backend

data class AibotControllerCreateBotRequest(
    val name: String? = null,
    val description: String? = null,
    val type: String? = null,
    val config: Map<String, Any>? = null,
    val isActive: Boolean? = null
)
