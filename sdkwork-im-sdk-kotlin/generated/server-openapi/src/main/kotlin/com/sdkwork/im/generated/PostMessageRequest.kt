package com.sdkwork.im.generated

data class PostMessageRequest(
    val clientMsgId: String? = null,
    val summary: String? = null,
    val text: String? = null,
    val parts: List<ContentPart>? = null,
    val renderHints: Map<String, String>? = null
)
