package com.sdkwork.backend.model;

public class BotOpenProfileResponseDto {
    private String id;
    private String name;
    private String username;
    private String appId;
    private String description;
    private String avatar;
    private String homepage;
    private String developerName;
    private String developerEmail;
    private Double intents;
    private List<String> scopes;
    private String status;
    private BotOpenStatsDto stats;
    private String createdAt;
    private String updatedAt;

    public String getId() {
        return this.id;
    }
    
    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return this.username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }

    public String getAppId() {
        return this.appId;
    }
    
    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getDescription() {
        return this.description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }

    public String getAvatar() {
        return this.avatar;
    }
    
    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getHomepage() {
        return this.homepage;
    }
    
    public void setHomepage(String homepage) {
        this.homepage = homepage;
    }

    public String getDeveloperName() {
        return this.developerName;
    }
    
    public void setDeveloperName(String developerName) {
        this.developerName = developerName;
    }

    public String getDeveloperEmail() {
        return this.developerEmail;
    }
    
    public void setDeveloperEmail(String developerEmail) {
        this.developerEmail = developerEmail;
    }

    public Double getIntents() {
        return this.intents;
    }
    
    public void setIntents(Double intents) {
        this.intents = intents;
    }

    public List<String> getScopes() {
        return this.scopes;
    }
    
    public void setScopes(List<String> scopes) {
        this.scopes = scopes;
    }

    public String getStatus() {
        return this.status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }

    public BotOpenStatsDto getStats() {
        return this.stats;
    }
    
    public void setStats(BotOpenStatsDto stats) {
        this.stats = stats;
    }

    public String getCreatedAt() {
        return this.createdAt;
    }
    
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return this.updatedAt;
    }
    
    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
}
