package com.sdkwork.backend.model;

public class BotOpenWebhookTestEventRequestDto {
    private String eventType;
    private Map<String, Object> data;

    public String getEventType() {
        return this.eventType;
    }
    
    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public Map<String, Object> getData() {
        return this.data;
    }
    
    public void setData(Map<String, Object> data) {
        this.data = data;
    }
}
