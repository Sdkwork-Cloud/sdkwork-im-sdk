package com.sdkwork.backend.model;

public class AckConversationSeqRequest {
    private String targetId;
    private String type;
    private Double ackSeq;
    private String deviceId;

    public String getTargetId() {
        return this.targetId;
    }
    
    public void setTargetId(String targetId) {
        this.targetId = targetId;
    }

    public String getType() {
        return this.type;
    }
    
    public void setType(String type) {
        this.type = type;
    }

    public Double getAckSeq() {
        return this.ackSeq;
    }
    
    public void setAckSeq(Double ackSeq) {
        this.ackSeq = ackSeq;
    }

    public String getDeviceId() {
        return this.deviceId;
    }
    
    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }
}
