package com.sdkwork.backend

data class AckConversationSeqItemRequest(
    val targetId: String? = null,
    val type: String? = null,
    val ackSeq: Double? = null
)
