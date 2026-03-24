package com.sdkwork.backend.model;

public class SetMessageReaction {
    private String emoji;
    private Boolean active;

    public String getEmoji() {
        return this.emoji;
    }
    
    public void setEmoji(String emoji) {
        this.emoji = emoji;
    }

    public Boolean getActive() {
        return this.active;
    }
    
    public void setActive(Boolean active) {
        this.active = active;
    }
}
