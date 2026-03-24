package com.sdkwork.backend.model;

public class BotOpenWebhookStatsResponseDto {
    private Boolean configured;
    private String url;
    private List<String> events;
    private Double pendingRetries;

    public Boolean getConfigured() {
        return this.configured;
    }
    
    public void setConfigured(Boolean configured) {
        this.configured = configured;
    }

    public String getUrl() {
        return this.url;
    }
    
    public void setUrl(String url) {
        this.url = url;
    }

    public List<String> getEvents() {
        return this.events;
    }
    
    public void setEvents(List<String> events) {
        this.events = events;
    }

    public Double getPendingRetries() {
        return this.pendingRetries;
    }
    
    public void setPendingRetries(Double pendingRetries) {
        this.pendingRetries = pendingRetries;
    }
}
