package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class WukongimApi {
    private final HttpClient client;
    
    public WukongimApi(HttpClient client) {
        this.client = client;
    }

    /** Get WuKongIM connection config */
    public Void wukongImappControllerGetConfig() throws Exception {
        client.get(ApiPaths.backendPath("/wukongim/config"));
        return null;
    }

    /** Get WuKongIM user token */
    public Void wukongImappControllerGetToken() throws Exception {
        client.post(ApiPaths.backendPath("/wukongim/token"), null);
        return null;
    }
}
