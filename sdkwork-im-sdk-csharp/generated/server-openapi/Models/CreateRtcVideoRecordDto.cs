using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CreateRtcVideoRecordDto
    {
        public string? RoomId { get; set; }
        public string? UserId { get; set; }
        public string? FileName { get; set; }
        public string? FilePath { get; set; }
        public string? FileType { get; set; }
        public double? FileSize { get; set; }
        public string? StartTime { get; set; }
        public string? EndTime { get; set; }
        public string? Status { get; set; }
        public Dictionary<string, object>? Metadata { get; set; }
    }
}
