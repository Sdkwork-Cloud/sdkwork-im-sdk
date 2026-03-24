package com.sdkwork.backend.model;

public class RtcProviderOperationErrorDto {
    private Double statusCode;
    private String message;
    private String provider;
    private String operation;
    private Double providerStatusCode;
    private String providerErrorCode;
    private Boolean retryable;
    private String providerMessage;

    public Double getStatusCode() {
        return this.statusCode;
    }
    
    public void setStatusCode(Double statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return this.message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }

    public String getProvider() {
        return this.provider;
    }
    
    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getOperation() {
        return this.operation;
    }
    
    public void setOperation(String operation) {
        this.operation = operation;
    }

    public Double getProviderStatusCode() {
        return this.providerStatusCode;
    }
    
    public void setProviderStatusCode(Double providerStatusCode) {
        this.providerStatusCode = providerStatusCode;
    }

    public String getProviderErrorCode() {
        return this.providerErrorCode;
    }
    
    public void setProviderErrorCode(String providerErrorCode) {
        this.providerErrorCode = providerErrorCode;
    }

    public Boolean getRetryable() {
        return this.retryable;
    }
    
    public void setRetryable(Boolean retryable) {
        this.retryable = retryable;
    }

    public String getProviderMessage() {
        return this.providerMessage;
    }
    
    public void setProviderMessage(String providerMessage) {
        this.providerMessage = providerMessage;
    }
}
