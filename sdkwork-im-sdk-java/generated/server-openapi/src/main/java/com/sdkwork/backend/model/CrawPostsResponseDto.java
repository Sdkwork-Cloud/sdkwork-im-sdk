package com.sdkwork.backend.model;

public class CrawPostsResponseDto {
    private Boolean success;
    private List<Map<String, Object>> posts;
    private String error;

    public Boolean getSuccess() {
        return this.success;
    }
    
    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public List<Map<String, Object>> getPosts() {
        return this.posts;
    }
    
    public void setPosts(List<Map<String, Object>> posts) {
        this.posts = posts;
    }

    public String getError() {
        return this.error;
    }
    
    public void setError(String error) {
        this.error = error;
    }
}
