package com.sdkwork.backend

data class SendFriendRequestDto(
    val toUserId: String? = null,
    val message: String? = null
)
