using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CrawPostResponseDto
    {
        public bool? Success { get; set; }
        public Dictionary<string, object>? Post { get; set; }
        public string? Error { get; set; }
    }
}
