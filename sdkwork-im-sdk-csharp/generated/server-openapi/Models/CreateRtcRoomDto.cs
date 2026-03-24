using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CreateRtcRoomDto
    {
        public string? Type { get; set; }
        public List<string>? Participants { get; set; }
        public string? Name { get; set; }
        public string? ChannelId { get; set; }
        public string? Provider { get; set; }
        public Dictionary<string, object>? AiMetadata { get; set; }
    }
}
