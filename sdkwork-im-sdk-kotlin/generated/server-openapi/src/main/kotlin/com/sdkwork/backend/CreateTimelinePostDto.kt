package com.sdkwork.backend

data class CreateTimelinePostDto(
    val text: String? = null,
    val media: List<TimelineMediaItemDto>? = null,
    val visibility: String? = null,
    val customAudienceIds: List<String>? = null,
    val extra: Map<String, Any>? = null
)
