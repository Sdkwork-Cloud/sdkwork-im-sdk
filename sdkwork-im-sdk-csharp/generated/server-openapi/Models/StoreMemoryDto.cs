using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class StoreMemoryDto
    {
        public string? Content { get; set; }
        public string? Type { get; set; }
        public string? Source { get; set; }
        public string? SessionId { get; set; }
        public Dictionary<string, object>? Metadata { get; set; }
    }
}
