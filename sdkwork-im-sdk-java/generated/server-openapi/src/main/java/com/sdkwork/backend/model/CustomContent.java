package com.sdkwork.backend.model;

public class CustomContent {
    private String customType;
    private Map<String, Object> data;

    public String getCustomType() {
        return this.customType;
    }
    
    public void setCustomType(String customType) {
        this.customType = customType;
    }

    public Map<String, Object> getData() {
        return this.data;
    }
    
    public void setData(Map<String, Object> data) {
        this.data = data;
    }
}
