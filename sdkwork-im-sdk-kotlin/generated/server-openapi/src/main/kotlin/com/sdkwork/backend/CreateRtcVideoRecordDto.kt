package com.sdkwork.backend

data class CreateRtcVideoRecordDto(
    val roomId: String? = null,
    val userId: String? = null,
    val fileName: String? = null,
    val filePath: String? = null,
    val fileType: String? = null,
    val fileSize: Double? = null,
    val startTime: String? = null,
    val endTime: String? = null,
    val status: String? = null,
    val metadata: Map<String, Any>? = null
)
