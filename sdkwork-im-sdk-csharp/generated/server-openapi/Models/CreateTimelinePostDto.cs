using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CreateTimelinePostDto
    {
        public string? Text { get; set; }
        public List<TimelineMediaItemDto>? Media { get; set; }
        public string? Visibility { get; set; }
        public List<string>? CustomAudienceIds { get; set; }
        public Dictionary<string, object>? Extra { get; set; }
    }
}
