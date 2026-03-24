package com.sdkwork.backend.model;

public class IMConfigDto {
    private String wsUrl;
    private String uid;
    private String token;

    public String getWsUrl() {
        return this.wsUrl;
    }
    
    public void setWsUrl(String wsUrl) {
        this.wsUrl = wsUrl;
    }

    public String getUid() {
        return this.uid;
    }
    
    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getToken() {
        return this.token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
}
