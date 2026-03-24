package com.sdkwork.backend

data class AckConversationSeqBatchRequest(
    val items: List<AckConversationSeqItemRequest>? = null,
    val deviceId: String? = null
)
