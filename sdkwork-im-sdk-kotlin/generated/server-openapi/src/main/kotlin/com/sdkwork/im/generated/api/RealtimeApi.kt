package com.sdkwork.im.generated.api

import com.fasterxml.jackson.core.type.TypeReference
import com.sdkwork.im.generated.*
import com.sdkwork.im.generated.http.HttpClient

class RealtimeApi(private val client: HttpClient) {

    /** Replace realtime subscriptions for the current device */
    suspend fun syncRealtimeSubscriptions(body: SyncRealtimeSubscriptionsRequest): RealtimeSubscriptionSnapshot? {
        val raw = client.post(ApiPaths.apiPath("/realtime/subscriptions/sync"), body, null, null, "application/json")
        return client.convertValue(raw, object : TypeReference<RealtimeSubscriptionSnapshot>() {})
    }

    /** Pull realtime events for the current device */
    suspend fun listRealtimeEvents(params: Map<String, Any>? = null): RealtimeEventWindow? {
        val raw = client.get(ApiPaths.apiPath("/realtime/events"), params)
        return client.convertValue(raw, object : TypeReference<RealtimeEventWindow>() {})
    }

    /** Ack realtime events for the current device */
    suspend fun ackRealtimeEvents(body: AckRealtimeEventsRequest): RealtimeAckState? {
        val raw = client.post(ApiPaths.apiPath("/realtime/events/ack"), body, null, null, "application/json")
        return client.convertValue(raw, object : TypeReference<RealtimeAckState>() {})
    }
}
