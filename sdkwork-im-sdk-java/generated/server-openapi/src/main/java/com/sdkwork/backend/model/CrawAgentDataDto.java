package com.sdkwork.backend.model;

public class CrawAgentDataDto {
    private String name;
    private String description;
    private Double karma;
    private Double followerCount;
    private Double followingCount;
    private Boolean isClaimed;
    private Boolean isActive;
    private String createdAt;
    private String lastActive;
    private CrawAgentOwnerDto owner;

    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }

    public Double getKarma() {
        return this.karma;
    }
    
    public void setKarma(Double karma) {
        this.karma = karma;
    }

    public Double getFollowerCount() {
        return this.followerCount;
    }
    
    public void setFollowerCount(Double followerCount) {
        this.followerCount = followerCount;
    }

    public Double getFollowingCount() {
        return this.followingCount;
    }
    
    public void setFollowingCount(Double followingCount) {
        this.followingCount = followingCount;
    }

    public Boolean getIsClaimed() {
        return this.isClaimed;
    }
    
    public void setIsClaimed(Boolean isClaimed) {
        this.isClaimed = isClaimed;
    }

    public Boolean getIsActive() {
        return this.isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public String getCreatedAt() {
        return this.createdAt;
    }
    
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getLastActive() {
        return this.lastActive;
    }
    
    public void setLastActive(String lastActive) {
        this.lastActive = lastActive;
    }

    public CrawAgentOwnerDto getOwner() {
        return this.owner;
    }
    
    public void setOwner(CrawAgentOwnerDto owner) {
        this.owner = owner;
    }
}
