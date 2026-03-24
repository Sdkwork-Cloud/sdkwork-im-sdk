package com.sdkwork.backend.model;

public class GenerateRtcTokenDto {
    private String roomId;
    private String userId;
    private String channelId;
    private String provider;
    private String role;
    private Double expireSeconds;

    public String getRoomId() {
        return this.roomId;
    }
    
    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getUserId() {
        return this.userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getChannelId() {
        return this.channelId;
    }
    
    public void setChannelId(String channelId) {
        this.channelId = channelId;
    }

    public String getProvider() {
        return this.provider;
    }
    
    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getRole() {
        return this.role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }

    public Double getExpireSeconds() {
        return this.expireSeconds;
    }
    
    public void setExpireSeconds(Double expireSeconds) {
        this.expireSeconds = expireSeconds;
    }
}
