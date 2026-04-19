package com.sdkwork.im.generated

data class RealtimeEventWindow(
    val deviceId: String? = null,
    val items: List<RealtimeEvent>? = null,
    val nextAfterSeq: Int? = null,
    val hasMore: Boolean? = null,
    val ackedThroughSeq: Int? = null,
    val trimmedThroughSeq: Int? = null
)
