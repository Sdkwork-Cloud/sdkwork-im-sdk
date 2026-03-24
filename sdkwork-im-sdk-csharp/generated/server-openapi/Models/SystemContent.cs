using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class SystemContent
    {
        public string? Type { get; set; }
        public Dictionary<string, object>? Data { get; set; }
    }
}
