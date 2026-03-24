package com.sdkwork.backend.model;

public class ConversationControllerUpdateRequest {
    private Boolean isPinned;
    private Boolean isMuted;

    public Boolean getIsPinned() {
        return this.isPinned;
    }
    
    public void setIsPinned(Boolean isPinned) {
        this.isPinned = isPinned;
    }

    public Boolean getIsMuted() {
        return this.isMuted;
    }
    
    public void setIsMuted(Boolean isMuted) {
        this.isMuted = isMuted;
    }
}
