package com.sdkwork.backend.model;

public class DocumentMediaResource {
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
    private Double pageCount;
    private String author;
    private String title;
    private String summary;
    private List<String> keywords;
    private String contentText;
    private String coverUrl;
    private String version;

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

    public Double getPageCount() {
        return this.pageCount;
    }
    
    public void setPageCount(Double pageCount) {
        this.pageCount = pageCount;
    }

    public String getAuthor() {
        return this.author;
    }
    
    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return this.title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return this.summary;
    }
    
    public void setSummary(String summary) {
        this.summary = summary;
    }

    public List<String> getKeywords() {
        return this.keywords;
    }
    
    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public String getContentText() {
        return this.contentText;
    }
    
    public void setContentText(String contentText) {
        this.contentText = contentText;
    }

    public String getCoverUrl() {
        return this.coverUrl;
    }
    
    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public String getVersion() {
        return this.version;
    }
    
    public void setVersion(String version) {
        this.version = version;
    }
}
