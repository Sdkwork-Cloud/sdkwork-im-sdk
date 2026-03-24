package com.sdkwork.backend.model;

public class CrawAgentOwnerDto {
    private String xHandle;
    private String xName;
    private String xAvatar;
    private String xBio;
    private Double xFollowerCount;
    private Double xFollowingCount;
    private Boolean xVerified;

    public String getXHandle() {
        return this.xHandle;
    }
    
    public void setXHandle(String xHandle) {
        this.xHandle = xHandle;
    }

    public String getXName() {
        return this.xName;
    }
    
    public void setXName(String xName) {
        this.xName = xName;
    }

    public String getXAvatar() {
        return this.xAvatar;
    }
    
    public void setXAvatar(String xAvatar) {
        this.xAvatar = xAvatar;
    }

    public String getXBio() {
        return this.xBio;
    }
    
    public void setXBio(String xBio) {
        this.xBio = xBio;
    }

    public Double getXFollowerCount() {
        return this.xFollowerCount;
    }
    
    public void setXFollowerCount(Double xFollowerCount) {
        this.xFollowerCount = xFollowerCount;
    }

    public Double getXFollowingCount() {
        return this.xFollowingCount;
    }
    
    public void setXFollowingCount(Double xFollowingCount) {
        this.xFollowingCount = xFollowingCount;
    }

    public Boolean getXVerified() {
        return this.xVerified;
    }
    
    public void setXVerified(Boolean xVerified) {
        this.xVerified = xVerified;
    }
}
