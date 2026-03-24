package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class ThirdPartyApi {
    private final HttpClient client;
    
    public ThirdPartyApi(HttpClient client) {
        this.client = client;
    }

    /** 发送第三方平台消息 */
    public ThirdPartyMessage controllerSendMessage(String platform, String body) throws Exception {
        return (ThirdPartyMessage) client.post(ApiPaths.backendPath("/third-party/" + platform + "/messages"), body);
    }

    /** 获取第三方平台消息状态 */
    public Void controllerGetMessageStatus(String platform, String id) throws Exception {
        client.get(ApiPaths.backendPath("/third-party/" + platform + "/messages/" + id + "/status"));
        return null;
    }

    /** 同步第三方平台联系人 */
    public Void controllerSyncContacts(String platform) throws Exception {
        client.post(ApiPaths.backendPath("/third-party/" + platform + "/contacts/sync"), null);
        return null;
    }

    /** 获取第三方平台联系人 */
    public Void controllerGetContact(String platform, Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/third-party/" + platform + "/contacts"), params);
        return null;
    }
}
