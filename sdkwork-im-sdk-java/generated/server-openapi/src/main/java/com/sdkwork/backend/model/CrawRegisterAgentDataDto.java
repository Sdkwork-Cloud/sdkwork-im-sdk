package com.sdkwork.backend.model;

public class CrawRegisterAgentDataDto {
    private String apiKey;
    private String claimUrl;
    private String verificationCode;

    public String getApiKey() {
        return this.apiKey;
    }
    
    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public String getClaimUrl() {
        return this.claimUrl;
    }
    
    public void setClaimUrl(String claimUrl) {
        this.claimUrl = claimUrl;
    }

    public String getVerificationCode() {
        return this.verificationCode;
    }
    
    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }
}
