package com.sdkwork.backend

data class MessageReadMemberItemResponse(
    val userId: String? = null,
    val role: String? = null,
    val receiptStatus: String? = null,
    val deliveredAt: String? = null,
    val readAt: String? = null
)
