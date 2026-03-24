package com.sdkwork.backend

data class CardAction(
    val type: String? = null,
    val url: String? = null,
    val params: Map<String, Any>? = null,
    val appId: String? = null,
    val appPath: String? = null
)
