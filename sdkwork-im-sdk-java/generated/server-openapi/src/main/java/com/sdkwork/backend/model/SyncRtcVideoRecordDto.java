package com.sdkwork.backend.model;

public class SyncRtcVideoRecordDto {
    private String roomId;
    private String taskId;

    public String getRoomId() {
        return this.roomId;
    }
    
    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getTaskId() {
        return this.taskId;
    }
    
    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }
}
