package com.sdkwork.backend.model;

public class RtcProviderCapabilitiesResponseDto {
    private String defaultProvider;
    private String recommendedPrimary;
    private List<String> fallbackOrder;
    private List<String> activeProviders;
    private List<RtcProviderCapabilityDto> providers;

    public String getDefaultProvider() {
        return this.defaultProvider;
    }
    
    public void setDefaultProvider(String defaultProvider) {
        this.defaultProvider = defaultProvider;
    }

    public String getRecommendedPrimary() {
        return this.recommendedPrimary;
    }
    
    public void setRecommendedPrimary(String recommendedPrimary) {
        this.recommendedPrimary = recommendedPrimary;
    }

    public List<String> getFallbackOrder() {
        return this.fallbackOrder;
    }
    
    public void setFallbackOrder(List<String> fallbackOrder) {
        this.fallbackOrder = fallbackOrder;
    }

    public List<String> getActiveProviders() {
        return this.activeProviders;
    }
    
    public void setActiveProviders(List<String> activeProviders) {
        this.activeProviders = activeProviders;
    }

    public List<RtcProviderCapabilityDto> getProviders() {
        return this.providers;
    }
    
    public void setProviders(List<RtcProviderCapabilityDto> providers) {
        this.providers = providers;
    }
}
