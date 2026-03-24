package com.sdkwork.backend.model;

public class MessageUnreadMembersResponse {
    private String messageId;
    private String groupId;
    private Double total;
    private Double limit;
    private Double offset;
    private String nextCursor;
    private List<MessageUnreadMemberItemResponse> items;

    public String getMessageId() {
        return this.messageId;
    }
    
    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }

    public String getGroupId() {
        return this.groupId;
    }
    
    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public Double getTotal() {
        return this.total;
    }
    
    public void setTotal(Double total) {
        this.total = total;
    }

    public Double getLimit() {
        return this.limit;
    }
    
    public void setLimit(Double limit) {
        this.limit = limit;
    }

    public Double getOffset() {
        return this.offset;
    }
    
    public void setOffset(Double offset) {
        this.offset = offset;
    }

    public String getNextCursor() {
        return this.nextCursor;
    }
    
    public void setNextCursor(String nextCursor) {
        this.nextCursor = nextCursor;
    }

    public List<MessageUnreadMemberItemResponse> getItems() {
        return this.items;
    }
    
    public void setItems(List<MessageUnreadMemberItemResponse> items) {
        this.items = items;
    }
}
