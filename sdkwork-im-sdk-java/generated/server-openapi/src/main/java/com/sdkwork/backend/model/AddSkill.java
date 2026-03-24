package com.sdkwork.backend.model;

public class AddSkill {
    private String skillId;
    private String name;
    private String description;
    private String version;
    private Map<String, Object> config;

    public String getSkillId() {
        return this.skillId;
    }
    
    public void setSkillId(String skillId) {
        this.skillId = skillId;
    }

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

    public String getVersion() {
        return this.version;
    }
    
    public void setVersion(String version) {
        this.version = version;
    }

    public Map<String, Object> getConfig() {
        return this.config;
    }
    
    public void setConfig(Map<String, Object> config) {
        this.config = config;
    }
}
