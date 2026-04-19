package com.sdkwork.im.generated.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.sdkwork.im.generated.http.HttpClient;
import com.sdkwork.im.generated.model.*;
import java.util.List;
import java.util.Map;

public class PortalApi {
    private final HttpClient client;
    
    public PortalApi(HttpClient client) {
        this.client = client;
    }

    /** Read the tenant portal home snapshot */
    public Map<String, Object> getHome() throws Exception {
        Object raw = client.get(ApiPaths.apiPath("/portal/home"));
        return client.convertValue(raw, new TypeReference<Map<String, Object>>() {});
    }

    /** Read the tenant portal sign-in snapshot */
    public Map<String, Object> getAuth() throws Exception {
        Object raw = client.get(ApiPaths.apiPath("/portal/auth"));
        return client.convertValue(raw, new TypeReference<Map<String, Object>>() {});
    }

    /** Read the current tenant workspace snapshot */
    public PortalWorkspaceView getWorkspace() throws Exception {
        Object raw = client.get(ApiPaths.apiPath("/portal/workspace"));
        return client.convertValue(raw, new TypeReference<PortalWorkspaceView>() {});
    }

    /** Read the tenant dashboard snapshot */
    public Map<String, Object> getDashboard() throws Exception {
        Object raw = client.get(ApiPaths.apiPath("/portal/dashboard"));
        return client.convertValue(raw, new TypeReference<Map<String, Object>>() {});
    }

    /** Read the tenant conversations snapshot */
    public Map<String, Object> getConversations() throws Exception {
        Object raw = client.get(ApiPaths.apiPath("/portal/conversations"));
        return client.convertValue(raw, new TypeReference<Map<String, Object>>() {});
    }

    /** Read the tenant realtime snapshot */
    public Map<String, Object> getRealtime() throws Exception {
        Object raw = client.get(ApiPaths.apiPath("/portal/realtime"));
        return client.convertValue(raw, new TypeReference<Map<String, Object>>() {});
    }

    /** Read the tenant media snapshot */
    public Map<String, Object> getMedia() throws Exception {
        Object raw = client.get(ApiPaths.apiPath("/portal/media"));
        return client.convertValue(raw, new TypeReference<Map<String, Object>>() {});
    }

    /** Read the tenant automation snapshot */
    public Map<String, Object> getAutomation() throws Exception {
        Object raw = client.get(ApiPaths.apiPath("/portal/automation"));
        return client.convertValue(raw, new TypeReference<Map<String, Object>>() {});
    }

    /** Read the tenant governance snapshot */
    public Map<String, Object> getGovernance() throws Exception {
        Object raw = client.get(ApiPaths.apiPath("/portal/governance"));
        return client.convertValue(raw, new TypeReference<Map<String, Object>>() {});
    }
}
