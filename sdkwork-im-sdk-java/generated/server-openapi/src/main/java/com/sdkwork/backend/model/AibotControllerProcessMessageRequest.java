package com.sdkwork.backend.model;

public class AibotControllerProcessMessageRequest {
    private String userId;
    private String message;

    public String getUserId() {
        return this.userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return this.message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
}
