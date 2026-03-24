package com.sdkwork.backend.model;

public class AgentConfig {
    private String model;
    private Double temperature;
    private Double maxTokens;
    private String systemPrompt;
    private String welcomeMessage;
    private List<String> tools;
    private List<String> skills;
    private Map<String, Object> llm;

    public String getModel() {
        return this.model;
    }
    
    public void setModel(String model) {
        this.model = model;
    }

    public Double getTemperature() {
        return this.temperature;
    }
    
    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Double getMaxTokens() {
        return this.maxTokens;
    }
    
    public void setMaxTokens(Double maxTokens) {
        this.maxTokens = maxTokens;
    }

    public String getSystemPrompt() {
        return this.systemPrompt;
    }
    
    public void setSystemPrompt(String systemPrompt) {
        this.systemPrompt = systemPrompt;
    }

    public String getWelcomeMessage() {
        return this.welcomeMessage;
    }
    
    public void setWelcomeMessage(String welcomeMessage) {
        this.welcomeMessage = welcomeMessage;
    }

    public List<String> getTools() {
        return this.tools;
    }
    
    public void setTools(List<String> tools) {
        this.tools = tools;
    }

    public List<String> getSkills() {
        return this.skills;
    }
    
    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public Map<String, Object> getLlm() {
        return this.llm;
    }
    
    public void setLlm(Map<String, Object> llm) {
        this.llm = llm;
    }
}
