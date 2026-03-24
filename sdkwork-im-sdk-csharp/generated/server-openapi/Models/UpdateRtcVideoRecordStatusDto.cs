using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class UpdateRtcVideoRecordStatusDto
    {
        public string? Status { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
