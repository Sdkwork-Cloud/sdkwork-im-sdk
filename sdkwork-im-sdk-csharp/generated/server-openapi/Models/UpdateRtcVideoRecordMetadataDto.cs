using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class UpdateRtcVideoRecordMetadataDto
    {
        public Dictionary<string, object>? Metadata { get; set; }
    }
}
