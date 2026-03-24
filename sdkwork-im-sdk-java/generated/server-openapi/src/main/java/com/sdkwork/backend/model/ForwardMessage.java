package com.sdkwork.backend.model;

public class ForwardMessage {
    private String messageId;
    private List<String> toUserIds;
    private List<String> toGroupIds;

    public String getMessageId() {
        return this.messageId;
    }
    
    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }

    public List<String> getToUserIds() {
        return this.toUserIds;
    }
    
    public void setToUserIds(List<String> toUserIds) {
        this.toUserIds = toUserIds;
    }

    public List<String> getToGroupIds() {
        return this.toGroupIds;
    }
    
    public void setToGroupIds(List<String> toGroupIds) {
        this.toGroupIds = toGroupIds;
    }
}
