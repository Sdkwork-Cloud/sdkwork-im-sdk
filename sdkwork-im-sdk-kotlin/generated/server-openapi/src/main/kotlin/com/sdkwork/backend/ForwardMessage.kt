package com.sdkwork.backend

data class ForwardMessage(
    val messageId: String? = null,
    val toUserIds: List<String>? = null,
    val toGroupIds: List<String>? = null
)
