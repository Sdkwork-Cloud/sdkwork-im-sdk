package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class TimelineApi {
    private final HttpClient client;
    
    public TimelineApi(HttpClient client) {
        this.client = client;
    }

    /** Create a timeline post */
    public Void controllerCreatePost(CreateTimelinePostDto body) throws Exception {
        client.post(ApiPaths.backendPath("/timeline/posts"), body);
        return null;
    }

    /** Get timeline feed */
    public Void controllerGetFeed(Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/timeline/feed"), params);
        return null;
    }

    /** Get timeline post detail */
    public Void controllerGetPost(String postId) throws Exception {
        client.get(ApiPaths.backendPath("/timeline/posts/" + postId + ""));
        return null;
    }

    /** Delete own timeline post */
    public Void controllerDeletePost(String postId) throws Exception {
        client.delete(ApiPaths.backendPath("/timeline/posts/" + postId + ""));
        return null;
    }

    /** Get user timeline posts */
    public Void controllerGetUserPosts(String userId, Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/timeline/users/" + userId + "/posts"), params);
        return null;
    }

    /** Like or unlike timeline post */
    public Void controllerToggleLike(String postId, ToggleTimelineLikeDto body) throws Exception {
        client.post(ApiPaths.backendPath("/timeline/posts/" + postId + "/likes"), body);
        return null;
    }
}
