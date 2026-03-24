package com.sdkwork.backend.model;

public class GroupControllerSendInvitationRequest {
    private String groupId;
    private String inviterId;
    private String inviteeId;
    private String message;

    public String getGroupId() {
        return this.groupId;
    }
    
    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getInviterId() {
        return this.inviterId;
    }
    
    public void setInviterId(String inviterId) {
        this.inviterId = inviterId;
    }

    public String getInviteeId() {
        return this.inviteeId;
    }
    
    public void setInviteeId(String inviteeId) {
        this.inviteeId = inviteeId;
    }

    public String getMessage() {
        return this.message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
}
