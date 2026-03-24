package com.sdkwork.backend.model;

public class CardMediaResource {
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
    private String cardType;
    private String title;
    private String thumbnailUrl;
    private String sourceName;
    private String sourceIcon;
    private String targetUrl;
    private String appId;
    private String appPath;
    private String appOriginalId;
    private String appVersion;
    private String packageName;
    private String appDownloadUrl;
    private CardAction mainAction;
    private List<CardButton> buttons;
    private Map<String, Object> extraData;
    private String tag;
    private String status;
    private String expireTime;
    private Boolean showSource;

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

    public String getCardType() {
        return this.cardType;
    }
    
    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getTitle() {
        return this.title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }

    public String getThumbnailUrl() {
        return this.thumbnailUrl;
    }
    
    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public String getSourceName() {
        return this.sourceName;
    }
    
    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public String getSourceIcon() {
        return this.sourceIcon;
    }
    
    public void setSourceIcon(String sourceIcon) {
        this.sourceIcon = sourceIcon;
    }

    public String getTargetUrl() {
        return this.targetUrl;
    }
    
    public void setTargetUrl(String targetUrl) {
        this.targetUrl = targetUrl;
    }

    public String getAppId() {
        return this.appId;
    }
    
    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getAppPath() {
        return this.appPath;
    }
    
    public void setAppPath(String appPath) {
        this.appPath = appPath;
    }

    public String getAppOriginalId() {
        return this.appOriginalId;
    }
    
    public void setAppOriginalId(String appOriginalId) {
        this.appOriginalId = appOriginalId;
    }

    public String getAppVersion() {
        return this.appVersion;
    }
    
    public void setAppVersion(String appVersion) {
        this.appVersion = appVersion;
    }

    public String getPackageName() {
        return this.packageName;
    }
    
    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public String getAppDownloadUrl() {
        return this.appDownloadUrl;
    }
    
    public void setAppDownloadUrl(String appDownloadUrl) {
        this.appDownloadUrl = appDownloadUrl;
    }

    public CardAction getMainAction() {
        return this.mainAction;
    }
    
    public void setMainAction(CardAction mainAction) {
        this.mainAction = mainAction;
    }

    public List<CardButton> getButtons() {
        return this.buttons;
    }
    
    public void setButtons(List<CardButton> buttons) {
        this.buttons = buttons;
    }

    public Map<String, Object> getExtraData() {
        return this.extraData;
    }
    
    public void setExtraData(Map<String, Object> extraData) {
        this.extraData = extraData;
    }

    public String getTag() {
        return this.tag;
    }
    
    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getStatus() {
        return this.status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }

    public String getExpireTime() {
        return this.expireTime;
    }
    
    public void setExpireTime(String expireTime) {
        this.expireTime = expireTime;
    }

    public Boolean getShowSource() {
        return this.showSource;
    }
    
    public void setShowSource(Boolean showSource) {
        this.showSource = showSource;
    }
}
