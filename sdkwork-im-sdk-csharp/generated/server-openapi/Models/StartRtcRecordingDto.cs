using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class StartRtcRecordingDto
    {
        public string? TaskId { get; set; }
        public Dictionary<string, object>? Metadata { get; set; }
    }
}
