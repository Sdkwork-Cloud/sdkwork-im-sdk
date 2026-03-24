package com.sdkwork.backend

data class ContactControllerUpdateRequest(
    val name: String? = null,
    val remark: String? = null,
    val tags: List<String>? = null,
    val isFavorite: Boolean? = null,
    val status: String? = null
)
