package com.sdkwork.backend

data class StopRtcRecordingDto(
    val recordId: String? = null,
    val taskId: String? = null,
    val metadata: Map<String, Any>? = null
)
