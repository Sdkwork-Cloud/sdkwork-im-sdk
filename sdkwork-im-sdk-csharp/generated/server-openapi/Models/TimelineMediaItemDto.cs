using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class TimelineMediaItemDto
    {
        public string? Type { get; set; }
        public string? Url { get; set; }
        public double? Width { get; set; }
        public double? Height { get; set; }
        public double? Duration { get; set; }
        public string? CoverUrl { get; set; }
        public Dictionary<string, object>? Extra { get; set; }
    }
}
