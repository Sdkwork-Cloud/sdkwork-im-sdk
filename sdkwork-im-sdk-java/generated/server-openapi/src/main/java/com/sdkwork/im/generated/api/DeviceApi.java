package com.sdkwork.im.generated.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.sdkwork.im.generated.http.HttpClient;
import com.sdkwork.im.generated.model.*;
import java.util.List;
import java.util.Map;

public class DeviceApi {
    private final HttpClient client;
    
    public DeviceApi(HttpClient client) {
        this.client = client;
    }

    /** Register the current device */
    public RegisteredDeviceView register(RegisterDeviceRequest body) throws Exception {
        Object raw = client.post(ApiPaths.apiPath("/devices/register"), body, null, null, "application/json");
        return client.convertValue(raw, new TypeReference<RegisteredDeviceView>() {});
    }

    /** Get device sync feed entries */
    public DeviceSyncFeedResponse getDeviceSyncFeed(String deviceId, Map<String, Object> params) throws Exception {
        Object raw = client.get(ApiPaths.apiPath("/devices/" + deviceId + "/sync-feed"), params);
        return client.convertValue(raw, new TypeReference<DeviceSyncFeedResponse>() {});
    }
}
