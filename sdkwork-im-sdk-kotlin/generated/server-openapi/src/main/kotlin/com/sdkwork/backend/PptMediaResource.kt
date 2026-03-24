package com.sdkwork.backend

data class PptMediaResource(
    val id: String? = null,
    val uuid: String? = null,
    val url: String? = null,
    val bytes: List<String>? = null,
    val localFile: Map<String, Any>? = null,
    val base64: String? = null,
    val type: String? = null,
    val mimeType: String? = null,
    val size: Double? = null,
    val name: String? = null,
    val extension: String? = null,
    val tags: Map<String, Any>? = null,
    val metadata: Map<String, Any>? = null,
    val prompt: String? = null,
    val createdAt: String? = null,
    val updatedAt: String? = null,
    val creatorId: String? = null,
    val description: String? = null,
    val format: String? = null,
    val slideCount: Double? = null,
    val theme: String? = null,
    val author: String? = null,
    val title: String? = null,
    val notes: String? = null,
    val slideThumbnails: List<String>? = null
)
