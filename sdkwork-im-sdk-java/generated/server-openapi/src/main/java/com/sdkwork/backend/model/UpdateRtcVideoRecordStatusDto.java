package com.sdkwork.backend.model;

public class UpdateRtcVideoRecordStatusDto {
    private String status;
    private String errorMessage;

    public String getStatus() {
        return this.status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }

    public String getErrorMessage() {
        return this.errorMessage;
    }
    
    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
