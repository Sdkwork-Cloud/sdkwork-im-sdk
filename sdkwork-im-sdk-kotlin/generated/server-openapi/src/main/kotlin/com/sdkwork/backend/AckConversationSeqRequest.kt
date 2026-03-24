package com.sdkwork.backend

data class AckConversationSeqRequest(
    val targetId: String? = null,
    val type: String? = null,
    val ackSeq: Double? = null,
    val deviceId: String? = null
)
