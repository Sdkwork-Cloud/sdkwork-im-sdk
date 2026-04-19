package com.sdkwork.im.generated.api

import com.fasterxml.jackson.core.type.TypeReference
import com.sdkwork.im.generated.*
import com.sdkwork.im.generated.http.HttpClient

class SessionApi(private val client: HttpClient) {

    /** Resume the current app session */
    suspend fun resume(body: ResumeSessionRequest): SessionResumeView? {
        val raw = client.post(ApiPaths.apiPath("/sessions/resume"), body, null, null, "application/json")
        return client.convertValue(raw, object : TypeReference<SessionResumeView>() {})
    }

    /** Disconnect the current app session device route */
    suspend fun disconnect(body: PresenceDeviceRequest): PresenceSnapshotView? {
        val raw = client.post(ApiPaths.apiPath("/sessions/disconnect"), body, null, null, "application/json")
        return client.convertValue(raw, object : TypeReference<PresenceSnapshotView>() {})
    }
}
