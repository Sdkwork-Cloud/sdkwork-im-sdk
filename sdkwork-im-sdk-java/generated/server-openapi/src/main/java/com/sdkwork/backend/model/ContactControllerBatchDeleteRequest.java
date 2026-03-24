package com.sdkwork.backend.model;

public class ContactControllerBatchDeleteRequest {
    private List<String> ids;

    public List<String> getIds() {
        return this.ids;
    }
    
    public void setIds(List<String> ids) {
        this.ids = ids;
    }
}
