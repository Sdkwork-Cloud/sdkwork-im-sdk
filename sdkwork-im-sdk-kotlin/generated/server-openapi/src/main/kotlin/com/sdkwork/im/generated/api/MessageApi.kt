package com.sdkwork.im.generated.api

import com.fasterxml.jackson.core.type.TypeReference
import com.sdkwork.im.generated.*
import com.sdkwork.im.generated.http.HttpClient

class MessageApi(private val client: HttpClient) {

    /** Edit a posted message */
    suspend fun edit(messageId: String, body: EditMessageRequest): MessageMutationResult? {
        val raw = client.post(ApiPaths.apiPath("/messages/$messageId/edit"), body, null, null, "application/json")
        return client.convertValue(raw, object : TypeReference<MessageMutationResult>() {})
    }

    /** Recall a posted message */
    suspend fun recall(messageId: String): MessageMutationResult? {
        val raw = client.post(ApiPaths.apiPath("/messages/$messageId/recall"), null)
        return client.convertValue(raw, object : TypeReference<MessageMutationResult>() {})
    }
}
