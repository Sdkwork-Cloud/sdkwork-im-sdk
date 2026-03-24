package com.sdkwork.backend.model;

public class RtcProviderCapabilityDto {
    private String provider;
    private Boolean configured;
    private String channelId;
    private Boolean supportsRecording;
    private List<String> tokenStrategies;
    private Boolean supportsControlPlaneDelegate;

    public String getProvider() {
        return this.provider;
    }
    
    public void setProvider(String provider) {
        this.provider = provider;
    }

    public Boolean getConfigured() {
        return this.configured;
    }
    
    public void setConfigured(Boolean configured) {
        this.configured = configured;
    }

    public String getChannelId() {
        return this.channelId;
    }
    
    public void setChannelId(String channelId) {
        this.channelId = channelId;
    }

    public Boolean getSupportsRecording() {
        return this.supportsRecording;
    }
    
    public void setSupportsRecording(Boolean supportsRecording) {
        this.supportsRecording = supportsRecording;
    }

    public List<String> getTokenStrategies() {
        return this.tokenStrategies;
    }
    
    public void setTokenStrategies(List<String> tokenStrategies) {
        this.tokenStrategies = tokenStrategies;
    }

    public Boolean getSupportsControlPlaneDelegate() {
        return this.supportsControlPlaneDelegate;
    }
    
    public void setSupportsControlPlaneDelegate(Boolean supportsControlPlaneDelegate) {
        this.supportsControlPlaneDelegate = supportsControlPlaneDelegate;
    }
}
