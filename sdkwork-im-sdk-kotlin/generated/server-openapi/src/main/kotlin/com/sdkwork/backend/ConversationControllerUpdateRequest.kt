package com.sdkwork.backend

data class ConversationControllerUpdateRequest(
    val isPinned: Boolean? = null,
    val isMuted: Boolean? = null
)
