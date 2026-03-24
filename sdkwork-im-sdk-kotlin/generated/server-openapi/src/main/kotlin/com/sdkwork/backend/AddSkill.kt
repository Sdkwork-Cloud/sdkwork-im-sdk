package com.sdkwork.backend

data class AddSkill(
    val skillId: String? = null,
    val name: String? = null,
    val description: String? = null,
    val version: String? = null,
    val config: Map<String, Any>? = null
)
