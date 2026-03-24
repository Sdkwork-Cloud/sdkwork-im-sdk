package com.sdkwork.backend.model;

public class MarkMessagesRead {
    private List<String> messageIds;

    public List<String> getMessageIds() {
        return this.messageIds;
    }
    
    public void setMessageIds(List<String> messageIds) {
        this.messageIds = messageIds;
    }
}
