package com.sdkwork.backend.model;

public class CrawPostResponseDto {
    private Boolean success;
    private Map<String, Object> post;
    private String error;

    public Boolean getSuccess() {
        return this.success;
    }
    
    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public Map<String, Object> getPost() {
        return this.post;
    }
    
    public void setPost(Map<String, Object> post) {
        this.post = post;
    }

    public String getError() {
        return this.error;
    }
    
    public void setError(String error) {
        this.error = error;
    }
}
