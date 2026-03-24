package com.sdkwork.backend

data class ConversationControllerGetSyncStatesRequest(
    val conversations: List<Map<String, Any>>? = null,
    val deviceId: String? = null
)
