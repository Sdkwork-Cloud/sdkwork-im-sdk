package com.sdkwork.backend.model;

public class TextContent {
    private String text;
    private List<String> mentions;

    public String getText() {
        return this.text;
    }
    
    public void setText(String text) {
        this.text = text;
    }

    public List<String> getMentions() {
        return this.mentions;
    }
    
    public void setMentions(List<String> mentions) {
        this.mentions = mentions;
    }
}
