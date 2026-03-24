package com.sdkwork.backend.model;

public class CardButton {
    private String text;
    private CardAction action;
    private String style;
    private String color;

    public String getText() {
        return this.text;
    }
    
    public void setText(String text) {
        this.text = text;
    }

    public CardAction getAction() {
        return this.action;
    }
    
    public void setAction(CardAction action) {
        this.action = action;
    }

    public String getStyle() {
        return this.style;
    }
    
    public void setStyle(String style) {
        this.style = style;
    }

    public String getColor() {
        return this.color;
    }
    
    public void setColor(String color) {
        this.color = color;
    }
}
