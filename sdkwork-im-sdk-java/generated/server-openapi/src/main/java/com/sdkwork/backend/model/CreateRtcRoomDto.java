package com.sdkwork.backend.model;

public class CreateRtcRoomDto {
    private String type;
    private List<String> participants;
    private String name;
    private String channelId;
    private String provider;
    private Map<String, Object> aiMetadata;

    public String getType() {
        return this.type;
    }
    
    public void setType(String type) {
        this.type = type;
    }

    public List<String> getParticipants() {
        return this.participants;
    }
    
    public void setParticipants(List<String> participants) {
        this.participants = participants;
    }

    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public String getChannelId() {
        return this.channelId;
    }
    
    public void setChannelId(String channelId) {
        this.channelId = channelId;
    }

    public String getProvider() {
        return this.provider;
    }
    
    public void setProvider(String provider) {
        this.provider = provider;
    }

    public Map<String, Object> getAiMetadata() {
        return this.aiMetadata;
    }
    
    public void setAiMetadata(Map<String, Object> aiMetadata) {
        this.aiMetadata = aiMetadata;
    }
}
