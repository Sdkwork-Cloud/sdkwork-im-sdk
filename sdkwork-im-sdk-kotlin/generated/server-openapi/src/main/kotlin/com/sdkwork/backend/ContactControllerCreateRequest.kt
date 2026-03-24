package com.sdkwork.backend

data class ContactControllerCreateRequest(
    val userId: String? = null,
    val contactId: String? = null,
    val type: String? = null,
    val name: String? = null,
    val remark: String? = null,
    val tags: List<String>? = null
)
