package com.sdkwork.backend.model;

public class EditMessage {
    private MessageContent content;
    private Map<String, Object> extra;

    public MessageContent getContent() {
        return this.content;
    }
    
    public void setContent(MessageContent content) {
        this.content = content;
    }

    public Map<String, Object> getExtra() {
        return this.extra;
    }
    
    public void setExtra(Map<String, Object> extra) {
        this.extra = extra;
    }
}
