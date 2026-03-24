package com.sdkwork.backend.model;

public class ForgotPasswordResponseDto {
    private Boolean success;
    private String message;
    private String error;

    public Boolean getSuccess() {
        return this.success;
    }
    
    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return this.message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }

    public String getError() {
        return this.error;
    }
    
    public void setError(String error) {
        this.error = error;
    }
}
