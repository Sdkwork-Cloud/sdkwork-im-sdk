using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class SendAgentMessage
    {
        public string? Content { get; set; }
        public bool? Stream { get; set; }
    }
}
