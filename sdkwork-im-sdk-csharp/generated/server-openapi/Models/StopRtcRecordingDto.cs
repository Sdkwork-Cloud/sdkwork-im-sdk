using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class StopRtcRecordingDto
    {
        public string? RecordId { get; set; }
        public string? TaskId { get; set; }
        public Dictionary<string, object>? Metadata { get; set; }
    }
}
