using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class RtcProviderCapabilityDto
    {
        public string? Provider { get; set; }
        public bool? Configured { get; set; }
        public string? ChannelId { get; set; }
        public bool? SupportsRecording { get; set; }
        public List<string>? TokenStrategies { get; set; }
        public bool? SupportsControlPlaneDelegate { get; set; }
    }
}
