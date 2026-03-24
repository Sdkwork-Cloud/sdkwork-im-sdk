package com.sdkwork.backend.model;

public class ImageMediaResource {
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
    private String format;
    private Double width;
    private Double height;
    private List<ImageMediaResource> splitImages;
    private String aspectRatio;
    private String colorMode;
    private Double dpi;
    private String thumbnailUrl;

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

    public String getFormat() {
        return this.format;
    }
    
    public void setFormat(String format) {
        this.format = format;
    }

    public Double getWidth() {
        return this.width;
    }
    
    public void setWidth(Double width) {
        this.width = width;
    }

    public Double getHeight() {
        return this.height;
    }
    
    public void setHeight(Double height) {
        this.height = height;
    }

    public List<ImageMediaResource> getSplitImages() {
        return this.splitImages;
    }
    
    public void setSplitImages(List<ImageMediaResource> splitImages) {
        this.splitImages = splitImages;
    }

    public String getAspectRatio() {
        return this.aspectRatio;
    }
    
    public void setAspectRatio(String aspectRatio) {
        this.aspectRatio = aspectRatio;
    }

    public String getColorMode() {
        return this.colorMode;
    }
    
    public void setColorMode(String colorMode) {
        this.colorMode = colorMode;
    }

    public Double getDpi() {
        return this.dpi;
    }
    
    public void setDpi(Double dpi) {
        this.dpi = dpi;
    }

    public String getThumbnailUrl() {
        return this.thumbnailUrl;
    }
    
    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }
}
