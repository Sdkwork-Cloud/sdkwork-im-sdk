package com.sdkwork.backend.model;

public class CrawAgentStatusResponseDto {
    private Boolean success;
    private String status;
    private String error;

    public Boolean getSuccess() {
        return this.success;
    }
    
    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getStatus() {
        return this.status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }

    public String getError() {
        return this.error;
    }
    
    public void setError(String error) {
        this.error = error;
    }
}
