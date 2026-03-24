package com.sdkwork.backend.model;

public class CrawRegisterResponseDto {
    private Boolean success;
    private CrawRegisterAgentDataDto agent;
    private String important;
    private String error;

    public Boolean getSuccess() {
        return this.success;
    }
    
    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public CrawRegisterAgentDataDto getAgent() {
        return this.agent;
    }
    
    public void setAgent(CrawRegisterAgentDataDto agent) {
        this.agent = agent;
    }

    public String getImportant() {
        return this.important;
    }
    
    public void setImportant(String important) {
        this.important = important;
    }

    public String getError() {
        return this.error;
    }
    
    public void setError(String error) {
        this.error = error;
    }
}
