package com.sdkwork.backend.model;

public class ConversationControllerGetSyncStatesRequest {
    private List<Map<String, Object>> conversations;
    private String deviceId;

    public List<Map<String, Object>> getConversations() {
        return this.conversations;
    }
    
    public void setConversations(List<Map<String, Object>> conversations) {
        this.conversations = conversations;
    }

    public String getDeviceId() {
        return this.deviceId;
    }
    
    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }
}
