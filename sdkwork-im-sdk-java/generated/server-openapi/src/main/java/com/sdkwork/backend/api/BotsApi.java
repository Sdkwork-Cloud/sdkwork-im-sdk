package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class BotsApi {
    private final HttpClient client;
    
    public BotsApi(HttpClient client) {
        this.client = client;
    }

    /** 创建 Bot */
    public Void botControllerCreate(CreateBotDto body) throws Exception {
        client.post(ApiPaths.backendPath("/bots"), body);
        return null;
    }

    /** 获取 Bot 列表 */
    public Void botControllerGet(Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/bots"), params);
        return null;
    }

    /** 获取 Bot 详情 */
    public Void botControllerGetById(String id) throws Exception {
        client.get(ApiPaths.backendPath("/bots/" + id + ""));
        return null;
    }

    /** 更新 Bot */
    public Void botControllerUpdate(String id, UpdateBotDto body) throws Exception {
        client.put(ApiPaths.backendPath("/bots/" + id + ""), body);
        return null;
    }

    /** 删除 Bot */
    public Void botControllerDelete(String id) throws Exception {
        client.delete(ApiPaths.backendPath("/bots/" + id + ""));
        return null;
    }

    /** 重新生成 Bot Token */
    public Void botControllerRegenerateToken(String id) throws Exception {
        client.post(ApiPaths.backendPath("/bots/" + id + "/regenerate-token"), null);
        return null;
    }

    /** 设置 Webhook */
    public Void botControllerSetWebhook(String id, SetWebhookDto body) throws Exception {
        client.post(ApiPaths.backendPath("/bots/" + id + "/webhook"), body);
        return null;
    }

    /** 删除 Webhook */
    public Void botControllerDeleteWebhook(String id) throws Exception {
        client.delete(ApiPaths.backendPath("/bots/" + id + "/webhook"));
        return null;
    }
}
