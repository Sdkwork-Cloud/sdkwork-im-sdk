package com.sdkwork.backend.model;

public class SendAgentMessage {
    private String content;
    private Boolean stream;

    public String getContent() {
        return this.content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getStream() {
        return this.stream;
    }
    
    public void setStream(Boolean stream) {
        this.stream = stream;
    }
}
