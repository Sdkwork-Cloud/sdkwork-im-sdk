using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class TextContent
    {
        public string? Text { get; set; }
        public List<string>? Mentions { get; set; }
    }
}
