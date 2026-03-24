package com.sdkwork.backend

data class AgentConfig(
    val model: String? = null,
    val temperature: Double? = null,
    val maxTokens: Double? = null,
    val systemPrompt: String? = null,
    val welcomeMessage: String? = null,
    val tools: List<String>? = null,
    val skills: List<String>? = null,
    val llm: Map<String, Any>? = null
)
