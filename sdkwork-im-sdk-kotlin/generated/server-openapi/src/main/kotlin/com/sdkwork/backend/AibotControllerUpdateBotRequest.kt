package com.sdkwork.backend

data class AibotControllerUpdateBotRequest(
    val name: String? = null,
    val description: String? = null,
    val type: String? = null,
    val config: Map<String, Any>? = null,
    val isActive: Boolean? = null
)
