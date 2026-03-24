package com.sdkwork.backend

data class MessageReadMembersResponse(
    val messageId: String? = null,
    val groupId: String? = null,
    val total: Double? = null,
    val limit: Double? = null,
    val offset: Double? = null,
    val nextCursor: String? = null,
    val items: List<MessageReadMemberItemResponse>? = null
)
