package com.sdkwork.backend.model;

public class UpdateRtcVideoRecordMetadataDto {
    private Map<String, Object> metadata;

    public Map<String, Object> getMetadata() {
        return this.metadata;
    }
    
    public void setMetadata(Map<String, Object> metadata) {
        this.metadata = metadata;
    }
}
