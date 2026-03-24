package com.sdkwork.backend.model;

public class AuthResponseDto {
    private Map<String, Object> user;
    private String token;
    private String refreshToken;
    private Double expiresIn;
    private IMConfigDto imConfig;

    public Map<String, Object> getUser() {
        return this.user;
    }
    
    public void setUser(Map<String, Object> user) {
        this.user = user;
    }

    public String getToken() {
        return this.token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }

    public String getRefreshToken() {
        return this.refreshToken;
    }
    
    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public Double getExpiresIn() {
        return this.expiresIn;
    }
    
    public void setExpiresIn(Double expiresIn) {
        this.expiresIn = expiresIn;
    }

    public IMConfigDto getImConfig() {
        return this.imConfig;
    }
    
    public void setImConfig(IMConfigDto imConfig) {
        this.imConfig = imConfig;
    }
}
