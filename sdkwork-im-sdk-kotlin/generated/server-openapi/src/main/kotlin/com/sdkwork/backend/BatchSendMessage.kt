package com.sdkwork.backend

data class BatchSendMessage(
    val messages: List<SendMessage>? = null
)
