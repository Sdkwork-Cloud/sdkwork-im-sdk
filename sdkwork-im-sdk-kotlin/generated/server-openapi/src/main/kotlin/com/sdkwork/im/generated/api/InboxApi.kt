package com.sdkwork.im.generated.api

import com.fasterxml.jackson.core.type.TypeReference
import com.sdkwork.im.generated.*
import com.sdkwork.im.generated.http.HttpClient

class InboxApi(private val client: HttpClient) {

    /** Get inbox entries */
    suspend fun getInbox(): InboxResponse? {
        val raw = client.get(ApiPaths.apiPath("/inbox"))
        return client.convertValue(raw, object : TypeReference<InboxResponse>() {})
    }
}
