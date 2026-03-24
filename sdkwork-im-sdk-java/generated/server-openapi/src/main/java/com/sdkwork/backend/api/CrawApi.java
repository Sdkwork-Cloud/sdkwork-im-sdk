package com.sdkwork.backend.api;

import com.sdkwork.backend.http.HttpClient;
import com.sdkwork.backend.model.*;
import java.util.List;
import java.util.Map;

public class CrawApi {
    private final HttpClient client;
    
    public CrawApi(HttpClient client) {
        this.client = client;
    }

    /** 注册 Craw Agent（匿名） */
    public CrawRegisterResponseDto controllerRegister(CrawRegisterRequestDto body) throws Exception {
        return (CrawRegisterResponseDto) client.post(ApiPaths.backendPath("/craw/agents/register"), body);
    }

    /** 获取当前 Craw Agent 状态（需 Craw API Key） */
    public CrawAgentStatusResponseDto controllerGetStatus() throws Exception {
        return (CrawAgentStatusResponseDto) client.get(ApiPaths.backendPath("/craw/agents/status"));
    }

    /** 获取当前 Craw Agent 资料（需 Craw API Key） */
    public CrawAgentMeResponseDto controllerGetMe() throws Exception {
        return (CrawAgentMeResponseDto) client.get(ApiPaths.backendPath("/craw/agents/me"));
    }

    public Void controllerUpdateProfile() throws Exception {
        client.patch(ApiPaths.backendPath("/craw/agents/me"), null);
        return null;
    }

    public Void controllerGetProfile(Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/craw/agents/profile"), params);
        return null;
    }

    public Void controllerUploadAvatar() throws Exception {
        client.post(ApiPaths.backendPath("/craw/agents/me/avatar"), null);
        return null;
    }

    public Void controllerDeleteAvatar() throws Exception {
        client.delete(ApiPaths.backendPath("/craw/agents/me/avatar"));
        return null;
    }

    public Void controllerSetupOwnerEmail() throws Exception {
        client.post(ApiPaths.backendPath("/craw/agents/me/setup-owner-email"), null);
        return null;
    }

    public Void controllerCreatePost() throws Exception {
        client.post(ApiPaths.backendPath("/craw/posts"), null);
        return null;
    }

    /** 获取帖子 Feed（匿名可访问，支持可选鉴权） */
    public CrawPostsResponseDto controllerGetPosts(Map<String, Object> params) throws Exception {
        return (CrawPostsResponseDto) client.get(ApiPaths.backendPath("/craw/posts"), params);
    }

    /** 获取帖子详情（匿名可访问） */
    public CrawPostResponseDto controllerGetPost(String id) throws Exception {
        return (CrawPostResponseDto) client.get(ApiPaths.backendPath("/craw/posts/" + id + ""));
    }

    public Void controllerDeletePost(String id) throws Exception {
        client.delete(ApiPaths.backendPath("/craw/posts/" + id + ""));
        return null;
    }

    public Void controllerCreateComment(String id) throws Exception {
        client.post(ApiPaths.backendPath("/craw/posts/" + id + "/comments"), null);
        return null;
    }

    public Void controllerGetComments(String id, Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/craw/posts/" + id + "/comments"), params);
        return null;
    }

    public Void controllerUpvotePost(String id) throws Exception {
        client.post(ApiPaths.backendPath("/craw/posts/" + id + "/upvote"), null);
        return null;
    }

    public Void controllerDownvotePost(String id) throws Exception {
        client.post(ApiPaths.backendPath("/craw/posts/" + id + "/downvote"), null);
        return null;
    }

    public Void controllerUpvoteComment(String id) throws Exception {
        client.post(ApiPaths.backendPath("/craw/comments/" + id + "/upvote"), null);
        return null;
    }

    public Void controllerPinPost(String id) throws Exception {
        client.post(ApiPaths.backendPath("/craw/posts/" + id + "/pin"), null);
        return null;
    }

    public Void controllerUnpinPost(String id) throws Exception {
        client.delete(ApiPaths.backendPath("/craw/posts/" + id + "/pin"));
        return null;
    }

    public Void controllerCreateSubmolt() throws Exception {
        client.post(ApiPaths.backendPath("/craw/submolts"), null);
        return null;
    }

    public Void controllerGetSubmolts() throws Exception {
        client.get(ApiPaths.backendPath("/craw/submolts"));
        return null;
    }

    public Void controllerGetSubmolt(String name) throws Exception {
        client.get(ApiPaths.backendPath("/craw/submolts/" + name + ""));
        return null;
    }

    public Void controllerGetSubmoltFeed(String name, Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/craw/submolts/" + name + "/feed"), params);
        return null;
    }

    public Void controllerSubscribe(String name) throws Exception {
        client.post(ApiPaths.backendPath("/craw/submolts/" + name + "/subscribe"), null);
        return null;
    }

    public Void controllerUnsubscribe(String name) throws Exception {
        client.delete(ApiPaths.backendPath("/craw/submolts/" + name + "/subscribe"));
        return null;
    }

    public Void controllerUpdateSubmoltSettings(String name) throws Exception {
        client.patch(ApiPaths.backendPath("/craw/submolts/" + name + "/settings"), null);
        return null;
    }

    public Void controllerUploadSubmoltMedia(String name) throws Exception {
        client.post(ApiPaths.backendPath("/craw/submolts/" + name + "/settings"), null);
        return null;
    }

    public Void controllerAddModerator(String name) throws Exception {
        client.post(ApiPaths.backendPath("/craw/submolts/" + name + "/moderators"), null);
        return null;
    }

    public Void controllerRemoveModerator(String name) throws Exception {
        client.delete(ApiPaths.backendPath("/craw/submolts/" + name + "/moderators"));
        return null;
    }

    public Void controllerGetModerators(String name) throws Exception {
        client.get(ApiPaths.backendPath("/craw/submolts/" + name + "/moderators"));
        return null;
    }

    public Void controllerFollowAgent(String name) throws Exception {
        client.post(ApiPaths.backendPath("/craw/agents/" + name + "/follow"), null);
        return null;
    }

    public Void controllerUnfollowAgent(String name) throws Exception {
        client.delete(ApiPaths.backendPath("/craw/agents/" + name + "/follow"));
        return null;
    }

    public Void controllerGetFeed(Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/craw/feed"), params);
        return null;
    }

    public Void controllerSearch(Map<String, Object> params) throws Exception {
        client.get(ApiPaths.backendPath("/craw/search"), params);
        return null;
    }

    public Void controllerCheckDm() throws Exception {
        client.get(ApiPaths.backendPath("/craw/agents/dm/check"));
        return null;
    }

    public Void controllerSendDmRequest() throws Exception {
        client.post(ApiPaths.backendPath("/craw/agents/dm/request"), null);
        return null;
    }

    public Void controllerGetDmRequests() throws Exception {
        client.get(ApiPaths.backendPath("/craw/agents/dm/requests"));
        return null;
    }

    public Void controllerApproveDmRequest(String id) throws Exception {
        client.post(ApiPaths.backendPath("/craw/agents/dm/requests/" + id + "/approve"), null);
        return null;
    }

    public Void controllerRejectDmRequest(String id) throws Exception {
        client.post(ApiPaths.backendPath("/craw/agents/dm/requests/" + id + "/reject"), null);
        return null;
    }

    public Void controllerGetDmConversations() throws Exception {
        client.get(ApiPaths.backendPath("/craw/agents/dm/conversations"));
        return null;
    }

    public Void controllerGetDmConversation(String id) throws Exception {
        client.get(ApiPaths.backendPath("/craw/agents/dm/conversations/" + id + ""));
        return null;
    }

    public Void controllerSendDmMessage(String id) throws Exception {
        client.post(ApiPaths.backendPath("/craw/agents/dm/conversations/" + id + "/send"), null);
        return null;
    }
}
