package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class BotsOpenApi {
    private final HttpClient client;
    
    public BotsOpenApi(HttpClient client) {
        this.client = client;
    }

    /** 获取当前 Bot 信息（Bot Token） */
    public BotOpenProfileResponseDto botOpenControllerGetCurrent() throws Exception {
        return (BotOpenProfileResponseDto) client.get(ApiPaths.backendPath("/bots/open/me"));
    }

    /** 获取当前 Bot 的 Webhook 统计（Bot Token） */
    public BotOpenWebhookStatsResponseDto botOpenControllerGetWebhookStats() throws Exception {
        return (BotOpenWebhookStatsResponseDto) client.get(ApiPaths.backendPath("/bots/open/webhook/stats"));
    }

    /** 触发当前 Bot 的 Webhook 测试事件（Bot Token） */
    public BotOpenWebhookResultResponseDto botOpenControllerSendWebhookTestEvent(BotOpenWebhookTestEventRequestDto body) throws Exception {
        return (BotOpenWebhookResultResponseDto) client.post(ApiPaths.backendPath("/bots/open/webhook/test-event"), body);
    }
}
