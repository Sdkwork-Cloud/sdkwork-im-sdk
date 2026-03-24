package com.sdkwork.backend.model;

public class CreateTimelinePostDto {
    private String text;
    private List<TimelineMediaItemDto> media;
    private String visibility;
    private List<String> customAudienceIds;
    private Map<String, Object> extra;

    public String getText() {
        return this.text;
    }
    
    public void setText(String text) {
        this.text = text;
    }

    public List<TimelineMediaItemDto> getMedia() {
        return this.media;
    }
    
    public void setMedia(List<TimelineMediaItemDto> media) {
        this.media = media;
    }

    public String getVisibility() {
        return this.visibility;
    }
    
    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }

    public List<String> getCustomAudienceIds() {
        return this.customAudienceIds;
    }
    
    public void setCustomAudienceIds(List<String> customAudienceIds) {
        this.customAudienceIds = customAudienceIds;
    }

    public Map<String, Object> getExtra() {
        return this.extra;
    }
    
    public void setExtra(Map<String, Object> extra) {
        this.extra = extra;
    }
}
