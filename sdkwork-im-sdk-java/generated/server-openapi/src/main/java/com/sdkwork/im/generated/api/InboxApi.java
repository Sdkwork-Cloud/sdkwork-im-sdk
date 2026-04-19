package com.sdkwork.im.generated.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.sdkwork.im.generated.http.HttpClient;
import com.sdkwork.im.generated.model.*;
import java.util.List;
import java.util.Map;

public class InboxApi {
    private final HttpClient client;
    
    public InboxApi(HttpClient client) {
        this.client = client;
    }

    /** Get inbox entries */
    public InboxResponse getInbox() throws Exception {
        Object raw = client.get(ApiPaths.apiPath("/inbox"));
        return client.convertValue(raw, new TypeReference<InboxResponse>() {});
    }
}
