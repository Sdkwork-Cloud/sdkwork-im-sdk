package com.sdkwork.backend

data class ConversationControllerCreateRequest(
    val type: String? = null,
    val targetId: String? = null
)
