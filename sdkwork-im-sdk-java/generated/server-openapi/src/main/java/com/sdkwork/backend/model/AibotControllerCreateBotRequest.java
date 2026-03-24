package com.sdkwork.backend.model;

public class AibotControllerCreateBotRequest {
    private String name;
    private String description;
    private String type;
    private Map<String, Object> config;
    private Boolean isActive;

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

    public String getType() {
        return this.type;
    }
    
    public void setType(String type) {
        this.type = type;
    }

    public Map<String, Object> getConfig() {
        return this.config;
    }
    
    public void setConfig(Map<String, Object> config) {
        this.config = config;
    }

    public Boolean getIsActive() {
        return this.isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
