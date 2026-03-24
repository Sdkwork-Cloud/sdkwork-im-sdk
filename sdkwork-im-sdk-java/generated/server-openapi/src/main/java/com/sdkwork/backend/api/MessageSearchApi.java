package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class MessageSearchApi {
    private final HttpClient client;
    
    public MessageSearchApi(HttpClient client) {
        this.client = client;
    }

    /** 搜索消息 */
    public Void controller(Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/messages/search"), params);
        return null;
    }

    /** 快速搜索 */
    public Void controllerQuick(Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/messages/search/quick"), params);
        return null;
    }

    /** 搜索会话消息 */
    public Void controllerInConversation(Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/messages/search/conversation"), params);
        return null;
    }

    /** 消息统计 */
    public Void controllerGetStats(Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/messages/search/stats"), params);
        return null;
    }
}
