package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class AiBotApi {
    private final HttpClient client;
    
    public AiBotApi(HttpClient client) {
        this.client = client;
    }

    /** Create a new AI Bot */
    public Void aibotControllerCreateBot(AibotControllerCreateBotRequest body) throws Exception {
        client.post(ApiPaths.backendPath("/ai-bots"), body);
        return null;
    }

    /** Get all AI Bots */
    public Void aibotControllerGetBots() throws Exception {
        client.get(ApiPaths.backendPath("/ai-bots"));
        return null;
    }

    /** Get an AI Bot by ID */
    public Void aibotControllerGetBot(String id) throws Exception {
        client.get(ApiPaths.backendPath("/ai-bots/" + id + ""));
        return null;
    }

    /** Update an AI Bot */
    public Void aibotControllerUpdateBot(String id, AibotControllerUpdateBotRequest body) throws Exception {
        client.put(ApiPaths.backendPath("/ai-bots/" + id + ""), body);
        return null;
    }

    /** Delete an AI Bot */
    public Void aibotControllerDeleteBot(String id) throws Exception {
        client.delete(ApiPaths.backendPath("/ai-bots/" + id + ""));
        return null;
    }

    /** Activate an AI Bot */
    public Void aibotControllerActivateBot(String id) throws Exception {
        client.post(ApiPaths.backendPath("/ai-bots/" + id + "/activate"), null);
        return null;
    }

    /** Deactivate an AI Bot */
    public Void aibotControllerDeactivateBot(String id) throws Exception {
        client.post(ApiPaths.backendPath("/ai-bots/" + id + "/deactivate"), null);
        return null;
    }

    /** Process a message with AI Bot */
    public Void aibotControllerProcessMessage(String id, AibotControllerProcessMessageRequest body) throws Exception {
        client.post(ApiPaths.backendPath("/ai-bots/" + id + "/messages"), body);
        return null;
    }
}
