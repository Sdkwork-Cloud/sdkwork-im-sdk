package com.sdkwork.backend

data class AddKnowledgeDocumentDto(
    val title: String? = null,
    val content: String? = null,
    val description: String? = null,
    val sourcePath: String? = null,
    val sourceType: String? = null,
    val metadata: Map<String, Any>? = null
)
