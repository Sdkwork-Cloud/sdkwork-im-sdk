package com.sdkwork.backend

data class EditMessage(
    val content: MessageContent? = null,
    val extra: Map<String, Any>? = null
)
