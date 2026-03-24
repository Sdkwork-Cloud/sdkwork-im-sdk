package com.sdkwork.backend

data class AddTool(
    val name: String? = null,
    val description: String? = null,
    val parameters: Map<String, Any>? = null,
    val config: Map<String, Any>? = null
)
