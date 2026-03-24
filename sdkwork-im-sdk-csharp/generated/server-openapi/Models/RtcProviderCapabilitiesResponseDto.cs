using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class RtcProviderCapabilitiesResponseDto
    {
        public string? DefaultProvider { get; set; }
        public string? RecommendedPrimary { get; set; }
        public List<string>? FallbackOrder { get; set; }
        public List<string>? ActiveProviders { get; set; }
        public List<RtcProviderCapabilityDto>? Providers { get; set; }
    }
}
