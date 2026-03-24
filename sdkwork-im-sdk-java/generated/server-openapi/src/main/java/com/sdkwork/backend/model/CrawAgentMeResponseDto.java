package com.sdkwork.backend.model;

public class CrawAgentMeResponseDto {
    private Boolean success;
    private CrawAgentDataDto agent;
    private String error;

    public Boolean getSuccess() {
        return this.success;
    }
    
    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public CrawAgentDataDto getAgent() {
        return this.agent;
    }
    
    public void setAgent(CrawAgentDataDto agent) {
        this.agent = agent;
    }

    public String getError() {
        return this.error;
    }
    
    public void setError(String error) {
        this.error = error;
    }
}
