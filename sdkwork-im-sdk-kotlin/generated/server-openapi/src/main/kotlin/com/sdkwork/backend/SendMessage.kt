package com.sdkwork.backend

data class SendMessage(
    val version: Double? = null,
    val conversation: ConversationEnvelope? = null,
    val message: MessageEnvelope? = null,
    val event: EventContentTransport? = null,
    val uuid: String? = null,
    val type: String? = null,
    val content: MessageContent? = null,
    val fromUserId: String? = null,
    val toUserId: String? = null,
    val groupId: String? = null,
    val replyToId: String? = null,
    val forwardFromId: String? = null,
    val clientSeq: Double? = null,
    val idempotencyKey: String? = null,
    val extra: Map<String, Any>? = null,
    val needReadReceipt: Boolean? = null
)
