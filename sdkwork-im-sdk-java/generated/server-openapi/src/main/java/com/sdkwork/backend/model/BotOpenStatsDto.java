package com.sdkwork.backend.model;

public class BotOpenStatsDto {
    private Double totalMessagesSent;
    private Double totalMessagesReceived;
    private Double totalUsersInteracted;
    private Double totalGroupsJoined;
    private Double totalCommandsExecuted;
    private Double totalInteractions;
    private String lastActivityAt;

    public Double getTotalMessagesSent() {
        return this.totalMessagesSent;
    }
    
    public void setTotalMessagesSent(Double totalMessagesSent) {
        this.totalMessagesSent = totalMessagesSent;
    }

    public Double getTotalMessagesReceived() {
        return this.totalMessagesReceived;
    }
    
    public void setTotalMessagesReceived(Double totalMessagesReceived) {
        this.totalMessagesReceived = totalMessagesReceived;
    }

    public Double getTotalUsersInteracted() {
        return this.totalUsersInteracted;
    }
    
    public void setTotalUsersInteracted(Double totalUsersInteracted) {
        this.totalUsersInteracted = totalUsersInteracted;
    }

    public Double getTotalGroupsJoined() {
        return this.totalGroupsJoined;
    }
    
    public void setTotalGroupsJoined(Double totalGroupsJoined) {
        this.totalGroupsJoined = totalGroupsJoined;
    }

    public Double getTotalCommandsExecuted() {
        return this.totalCommandsExecuted;
    }
    
    public void setTotalCommandsExecuted(Double totalCommandsExecuted) {
        this.totalCommandsExecuted = totalCommandsExecuted;
    }

    public Double getTotalInteractions() {
        return this.totalInteractions;
    }
    
    public void setTotalInteractions(Double totalInteractions) {
        this.totalInteractions = totalInteractions;
    }

    public String getLastActivityAt() {
        return this.lastActivityAt;
    }
    
    public void setLastActivityAt(String lastActivityAt) {
        this.lastActivityAt = lastActivityAt;
    }
}
