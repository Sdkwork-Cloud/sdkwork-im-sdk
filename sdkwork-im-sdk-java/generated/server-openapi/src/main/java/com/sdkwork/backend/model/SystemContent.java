package com.sdkwork.backend.model;

public class SystemContent {
    private String type;
    private Map<String, Object> data;

    public String getType() {
        return this.type;
    }
    
    public void setType(String type) {
        this.type = type;
    }

    public Map<String, Object> getData() {
        return this.data;
    }
    
    public void setData(Map<String, Object> data) {
        this.data = data;
    }
}
