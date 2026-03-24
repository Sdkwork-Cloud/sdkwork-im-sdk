package com.sdkwork.backend.model;

public class AckConversationSeqBatchRequest {
    private List<AckConversationSeqItemRequest> items;
    private String deviceId;

    public List<AckConversationSeqItemRequest> getItems() {
        return this.items;
    }
    
    public void setItems(List<AckConversationSeqItemRequest> items) {
        this.items = items;
    }

    public String getDeviceId() {
        return this.deviceId;
    }
    
    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }
}
