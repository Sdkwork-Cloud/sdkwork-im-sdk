package com.sdkwork.im.generated.api

import com.fasterxml.jackson.core.type.TypeReference
import com.sdkwork.im.generated.*
import com.sdkwork.im.generated.http.HttpClient

class DeviceApi(private val client: HttpClient) {

    /** Register the current device */
    suspend fun register(body: RegisterDeviceRequest): RegisteredDeviceView? {
        val raw = client.post(ApiPaths.apiPath("/devices/register"), body, null, null, "application/json")
        return client.convertValue(raw, object : TypeReference<RegisteredDeviceView>() {})
    }

    /** Get device sync feed entries */
    suspend fun getDeviceSyncFeed(deviceId: String, params: Map<String, Any>? = null): DeviceSyncFeedResponse? {
        val raw = client.get(ApiPaths.apiPath("/devices/$deviceId/sync-feed"), params)
        return client.convertValue(raw, object : TypeReference<DeviceSyncFeedResponse>() {})
    }
}
