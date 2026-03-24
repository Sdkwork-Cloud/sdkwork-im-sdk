package com.sdkwork.backend.model;

public class CardAction {
    private String type;
    private String url;
    private Map<String, Object> params;
    private String appId;
    private String appPath;

    public String getType() {
        return this.type;
    }
    
    public void setType(String type) {
        this.type = type;
    }

    public String getUrl() {
        return this.url;
    }
    
    public void setUrl(String url) {
        this.url = url;
    }

    public Map<String, Object> getParams() {
        return this.params;
    }
    
    public void setParams(Map<String, Object> params) {
        this.params = params;
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
}
