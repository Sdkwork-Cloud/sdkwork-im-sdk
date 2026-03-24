package com.sdkwork.backend.model;

public class ContactControllerCreateRequest {
    private String userId;
    private String contactId;
    private String type;
    private String name;
    private String remark;
    private List<String> tags;

    public String getUserId() {
        return this.userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getContactId() {
        return this.contactId;
    }
    
    public void setContactId(String contactId) {
        this.contactId = contactId;
    }

    public String getType() {
        return this.type;
    }
    
    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public String getRemark() {
        return this.remark;
    }
    
    public void setRemark(String remark) {
        this.remark = remark;
    }

    public List<String> getTags() {
        return this.tags;
    }
    
    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}
