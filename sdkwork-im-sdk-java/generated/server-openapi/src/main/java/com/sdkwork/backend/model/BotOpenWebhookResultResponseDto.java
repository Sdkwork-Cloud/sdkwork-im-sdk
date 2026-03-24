package com.sdkwork.backend.model;

public class BotOpenWebhookResultResponseDto {
    private Boolean success;
    private Double statusCode;
    private String error;
    private Double retryCount;
    private Double latency;

    public Boolean getSuccess() {
        return this.success;
    }
    
    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public Double getStatusCode() {
        return this.statusCode;
    }
    
    public void setStatusCode(Double statusCode) {
        this.statusCode = statusCode;
    }

    public String getError() {
        return this.error;
    }
    
    public void setError(String error) {
        this.error = error;
    }

    public Double getRetryCount() {
        return this.retryCount;
    }
    
    public void setRetryCount(Double retryCount) {
        this.retryCount = retryCount;
    }

    public Double getLatency() {
        return this.latency;
    }
    
    public void setLatency(Double latency) {
        this.latency = latency;
    }
}
