package com.sdkwork.backend.model;

public class BatchSendMessage {
    private List<SendMessage> messages;

    public List<SendMessage> getMessages() {
        return this.messages;
    }
    
    public void setMessages(List<SendMessage> messages) {
        this.messages = messages;
    }
}
