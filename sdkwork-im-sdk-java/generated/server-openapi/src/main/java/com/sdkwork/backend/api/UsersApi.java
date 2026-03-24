package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class UsersApi {
    private final HttpClient client;
    
    public UsersApi(HttpClient client) {
        this.client = client;
    }

    /** 获取当前用户信息 */
    public Void userControllerGetCurrent() throws Exception {
        client.get(ApiPaths.backendPath("/users/me"));
        return null;
    }

    /** 获取用户详情 */
    public Void userControllerGetById(String id) throws Exception {
        client.get(ApiPaths.backendPath("/users/" + id + ""));
        return null;
    }

    /** 更新用户资料 */
    public Void userControllerUpdate(String id, UpdateProfileDto body) throws Exception {
        client.put(ApiPaths.backendPath("/users/" + id + ""), body);
        return null;
    }

    /** 搜索用户 */
    public Void userControllerSearch(Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/users"), params);
        return null;
    }
}
