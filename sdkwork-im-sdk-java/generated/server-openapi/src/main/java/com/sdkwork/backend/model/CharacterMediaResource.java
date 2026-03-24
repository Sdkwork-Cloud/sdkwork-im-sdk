package com.sdkwork.backend.model;

public class CharacterMediaResource {
    private String id;
    private String uuid;
    private String url;
    private List<String> bytes;
    private Map<String, Object> localFile;
    private String base64;
    private String type;
    private String mimeType;
    private Double size;
    private String name;
    private String extension;
    private Map<String, Object> tags;
    private Map<String, Object> metadata;
    private String prompt;
    private String createdAt;
    private String updatedAt;
    private String creatorId;
    private String description;
    private String characterType;
    private String gender;
    private String ageGroup;
    private ImageMediaResource avatarImage;
    private VideoMediaResource avatarVideo;
    private String speakerId;
    private Map<String, Object> appearanceParams;
    private Map<String, Object> animationParams;
    private List<String> actions;
    private List<String> expressions;
    private Map<String, Object> voiceFeatures;

    public String getId() {
        return this.id;
    }
    
    public void setId(String id) {
        this.id = id;
    }

    public String getUuid() {
        return this.uuid;
    }
    
    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getUrl() {
        return this.url;
    }
    
    public void setUrl(String url) {
        this.url = url;
    }

    public List<String> getBytes() {
        return this.bytes;
    }
    
    public void setBytes(List<String> bytes) {
        this.bytes = bytes;
    }

    public Map<String, Object> getLocalFile() {
        return this.localFile;
    }
    
    public void setLocalFile(Map<String, Object> localFile) {
        this.localFile = localFile;
    }

    public String getBase64() {
        return this.base64;
    }
    
    public void setBase64(String base64) {
        this.base64 = base64;
    }

    public String getType() {
        return this.type;
    }
    
    public void setType(String type) {
        this.type = type;
    }

    public String getMimeType() {
        return this.mimeType;
    }
    
    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public Double getSize() {
        return this.size;
    }
    
    public void setSize(Double size) {
        this.size = size;
    }

    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    public String getExtension() {
        return this.extension;
    }
    
    public void setExtension(String extension) {
        this.extension = extension;
    }

    public Map<String, Object> getTags() {
        return this.tags;
    }
    
    public void setTags(Map<String, Object> tags) {
        this.tags = tags;
    }

    public Map<String, Object> getMetadata() {
        return this.metadata;
    }
    
    public void setMetadata(Map<String, Object> metadata) {
        this.metadata = metadata;
    }

    public String getPrompt() {
        return this.prompt;
    }
    
    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getCreatedAt() {
        return this.createdAt;
    }
    
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return this.updatedAt;
    }
    
    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getCreatorId() {
        return this.creatorId;
    }
    
    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId;
    }

    public String getDescription() {
        return this.description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }

    public String getCharacterType() {
        return this.characterType;
    }
    
    public void setCharacterType(String characterType) {
        this.characterType = characterType;
    }

    public String getGender() {
        return this.gender;
    }
    
    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAgeGroup() {
        return this.ageGroup;
    }
    
    public void setAgeGroup(String ageGroup) {
        this.ageGroup = ageGroup;
    }

    public ImageMediaResource getAvatarImage() {
        return this.avatarImage;
    }
    
    public void setAvatarImage(ImageMediaResource avatarImage) {
        this.avatarImage = avatarImage;
    }

    public VideoMediaResource getAvatarVideo() {
        return this.avatarVideo;
    }
    
    public void setAvatarVideo(VideoMediaResource avatarVideo) {
        this.avatarVideo = avatarVideo;
    }

    public String getSpeakerId() {
        return this.speakerId;
    }
    
    public void setSpeakerId(String speakerId) {
        this.speakerId = speakerId;
    }

    public Map<String, Object> getAppearanceParams() {
        return this.appearanceParams;
    }
    
    public void setAppearanceParams(Map<String, Object> appearanceParams) {
        this.appearanceParams = appearanceParams;
    }

    public Map<String, Object> getAnimationParams() {
        return this.animationParams;
    }
    
    public void setAnimationParams(Map<String, Object> animationParams) {
        this.animationParams = animationParams;
    }

    public List<String> getActions() {
        return this.actions;
    }
    
    public void setActions(List<String> actions) {
        this.actions = actions;
    }

    public List<String> getExpressions() {
        return this.expressions;
    }
    
    public void setExpressions(List<String> expressions) {
        this.expressions = expressions;
    }

    public Map<String, Object> getVoiceFeatures() {
        return this.voiceFeatures;
    }
    
    public void setVoiceFeatures(Map<String, Object> voiceFeatures) {
        this.voiceFeatures = voiceFeatures;
    }
}
