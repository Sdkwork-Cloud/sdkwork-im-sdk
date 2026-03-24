package com.sdkwork.backend

data class RtcProviderOperationErrorDto(
    val statusCode: Double? = null,
    val message: String? = null,
    val provider: String? = null,
    val operation: String? = null,
    val providerStatusCode: Double? = null,
    val providerErrorCode: String? = null,
    val retryable: Boolean? = null,
    val providerMessage: String? = null
)
