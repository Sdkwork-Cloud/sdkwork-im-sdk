package com.sdkwork.backend.model;

public class EventContent {
    private String type;
    private String name;
    private Map<String, Object> data;
    private Map<String, Object> metadata;

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

    public Map<String, Object> getData() {
        return this.data;
    }
    
    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public Map<String, Object> getMetadata() {
        return this.metadata;
    }
    
    public void setMetadata(Map<String, Object> metadata) {
        this.metadata = metadata;
    }
}
