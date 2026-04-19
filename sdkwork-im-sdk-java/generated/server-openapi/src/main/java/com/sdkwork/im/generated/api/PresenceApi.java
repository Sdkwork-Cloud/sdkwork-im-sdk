package com.sdkwork.im.generated.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.sdkwork.im.generated.http.HttpClient;
import com.sdkwork.im.generated.model.*;
import java.util.List;
import java.util.Map;

public class PresenceApi {
    private final HttpClient client;
    
    public PresenceApi(HttpClient client) {
        this.client = client;
    }

    /** Refresh device presence */
    public PresenceSnapshotView heartbeat(PresenceDeviceRequest body) throws Exception {
        Object raw = client.post(ApiPaths.apiPath("/presence/heartbeat"), body, null, null, "application/json");
        return client.convertValue(raw, new TypeReference<PresenceSnapshotView>() {});
    }

    /** Get current presence */
    public PresenceSnapshotView getPresenceMe() throws Exception {
        Object raw = client.get(ApiPaths.apiPath("/presence/me"));
        return client.convertValue(raw, new TypeReference<PresenceSnapshotView>() {});
    }
}
