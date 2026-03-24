package com.sdkwork.backend.model;

public class MessageUnreadMemberItemResponse {
    private String userId;
    private String role;
    private String receiptStatus;
    private String deliveredAt;
    private String readAt;

    public String getUserId() {
        return this.userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRole() {
        return this.role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }

    public String getReceiptStatus() {
        return this.receiptStatus;
    }
    
    public void setReceiptStatus(String receiptStatus) {
        this.receiptStatus = receiptStatus;
    }

    public String getDeliveredAt() {
        return this.deliveredAt;
    }
    
    public void setDeliveredAt(String deliveredAt) {
        this.deliveredAt = deliveredAt;
    }

    public String getReadAt() {
        return this.readAt;
    }
    
    public void setReadAt(String readAt) {
        this.readAt = readAt;
    }
}
