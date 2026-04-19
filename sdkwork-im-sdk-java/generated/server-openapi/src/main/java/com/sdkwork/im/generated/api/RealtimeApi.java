package com.sdkwork.im.generated.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.sdkwork.im.generated.http.HttpClient;
import com.sdkwork.im.generated.model.*;
import java.util.List;
import java.util.Map;

public class RealtimeApi {
    private final HttpClient client;
    
    public RealtimeApi(HttpClient client) {
        this.client = client;
    }

    /** Replace realtime subscriptions for the current device */
    public RealtimeSubscriptionSnapshot syncRealtimeSubscriptions(SyncRealtimeSubscriptionsRequest body) throws Exception {
        Object raw = client.post(ApiPaths.apiPath("/realtime/subscriptions/sync"), body, null, null, "application/json");
        return client.convertValue(raw, new TypeReference<RealtimeSubscriptionSnapshot>() {});
    }

    /** Pull realtime events for the current device */
    public RealtimeEventWindow listRealtimeEvents(Map<String, Object> params) throws Exception {
        Object raw = client.get(ApiPaths.apiPath("/realtime/events"), params);
        return client.convertValue(raw, new TypeReference<RealtimeEventWindow>() {});
    }

    /** Ack realtime events for the current device */
    public RealtimeAckState ackRealtimeEvents(AckRealtimeEventsRequest body) throws Exception {
        Object raw = client.post(ApiPaths.apiPath("/realtime/events/ack"), body, null, null, "application/json");
        return client.convertValue(raw, new TypeReference<RealtimeAckState>() {});
    }
}
