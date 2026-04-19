package com.sdkwork.im.generated.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.sdkwork.im.generated.http.HttpClient;
import com.sdkwork.im.generated.model.*;
import java.util.List;
import java.util.Map;

public class AuthApi {
    private final HttpClient client;
    
    public AuthApi(HttpClient client) {
        this.client = client;
    }

    /** Sign in to the tenant portal */
    public PortalLoginResponse login(PortalLoginRequest body) throws Exception {
        Object raw = client.post(ApiPaths.apiPath("/auth/login"), body, null, null, "application/json");
        return client.convertValue(raw, new TypeReference<PortalLoginResponse>() {});
    }

    /** Read the current portal session */
    public PortalMeResponse me() throws Exception {
        Object raw = client.get(ApiPaths.apiPath("/auth/me"));
        return client.convertValue(raw, new TypeReference<PortalMeResponse>() {});
    }
}
