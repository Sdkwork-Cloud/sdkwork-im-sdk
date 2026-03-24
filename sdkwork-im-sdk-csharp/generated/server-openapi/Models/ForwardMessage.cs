using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class ForwardMessage
    {
        public string? MessageId { get; set; }
        public List<string>? ToUserIds { get; set; }
        public List<string>? ToGroupIds { get; set; }
    }
}
