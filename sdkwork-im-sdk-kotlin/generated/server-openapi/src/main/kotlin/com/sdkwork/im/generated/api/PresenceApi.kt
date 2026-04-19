package com.sdkwork.im.generated.api

import com.fasterxml.jackson.core.type.TypeReference
import com.sdkwork.im.generated.*
import com.sdkwork.im.generated.http.HttpClient

class PresenceApi(private val client: HttpClient) {

    /** Refresh device presence */
    suspend fun heartbeat(body: PresenceDeviceRequest): PresenceSnapshotView? {
        val raw = client.post(ApiPaths.apiPath("/presence/heartbeat"), body, null, null, "application/json")
        return client.convertValue(raw, object : TypeReference<PresenceSnapshotView>() {})
    }

    /** Get current presence */
    suspend fun getPresenceMe(): PresenceSnapshotView? {
        val raw = client.get(ApiPaths.apiPath("/presence/me"))
        return client.convertValue(raw, object : TypeReference<PresenceSnapshotView>() {})
    }
}
