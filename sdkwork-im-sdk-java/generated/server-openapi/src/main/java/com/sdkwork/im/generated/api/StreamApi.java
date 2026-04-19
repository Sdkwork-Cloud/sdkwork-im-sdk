package com.sdkwork.im.generated.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.sdkwork.im.generated.http.HttpClient;
import com.sdkwork.im.generated.model.*;
import java.util.List;
import java.util.Map;

public class StreamApi {
    private final HttpClient client;
    
    public StreamApi(HttpClient client) {
        this.client = client;
    }

    /** Open a stream session */
    public StreamSession open_(OpenStreamRequest body) throws Exception {
        Object raw = client.post(ApiPaths.apiPath("/streams"), body, null, null, "application/json");
        return client.convertValue(raw, new TypeReference<StreamSession>() {});
    }

    /** List stream frames */
    public StreamFrameWindow listStreamFrames(String streamId, Map<String, Object> params) throws Exception {
        Object raw = client.get(ApiPaths.apiPath("/streams/" + streamId + "/frames"), params);
        return client.convertValue(raw, new TypeReference<StreamFrameWindow>() {});
    }

    /** Append a frame to a stream */
    public StreamFrame appendStreamFrame(String streamId, AppendStreamFrameRequest body) throws Exception {
        Object raw = client.post(ApiPaths.apiPath("/streams/" + streamId + "/frames"), body, null, null, "application/json");
        return client.convertValue(raw, new TypeReference<StreamFrame>() {});
    }

    /** Checkpoint a stream session */
    public StreamSession checkpoint(String streamId, CheckpointStreamRequest body) throws Exception {
        Object raw = client.post(ApiPaths.apiPath("/streams/" + streamId + "/checkpoint"), body, null, null, "application/json");
        return client.convertValue(raw, new TypeReference<StreamSession>() {});
    }

    /** Complete a stream session */
    public StreamSession complete(String streamId, CompleteStreamRequest body) throws Exception {
        Object raw = client.post(ApiPaths.apiPath("/streams/" + streamId + "/complete"), body, null, null, "application/json");
        return client.convertValue(raw, new TypeReference<StreamSession>() {});
    }

    /** Abort a stream session */
    public StreamSession abort(String streamId, AbortStreamRequest body) throws Exception {
        Object raw = client.post(ApiPaths.apiPath("/streams/" + streamId + "/abort"), body, null, null, "application/json");
        return client.convertValue(raw, new TypeReference<StreamSession>() {});
    }
}
