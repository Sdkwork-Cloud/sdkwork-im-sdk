package com.sdkwork.backend.model;

public class AddTool {
    private String name;
    private String description;
    private Map<String, Object> parameters;
    private Map<String, Object> config;

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

    public Map<String, Object> getParameters() {
        return this.parameters;
    }
    
    public void setParameters(Map<String, Object> parameters) {
        this.parameters = parameters;
    }

    public Map<String, Object> getConfig() {
        return this.config;
    }
    
    public void setConfig(Map<String, Object> config) {
        this.config = config;
    }
}
