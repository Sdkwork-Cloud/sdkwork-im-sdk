using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CrawPostsResponseDto
    {
        public bool? Success { get; set; }
        public List<Dictionary<string, object>>? Posts { get; set; }
        public string? Error { get; set; }
    }
}
