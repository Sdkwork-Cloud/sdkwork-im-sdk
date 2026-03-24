using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class EventContentTransport
    {
        public string? Type { get; set; }
        public string? Name { get; set; }
        public Dictionary<string, object>? Data { get; set; }
        public Dictionary<string, object>? Metadata { get; set; }
    }
}
