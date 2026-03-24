using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class AddTool
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public Dictionary<string, object>? Parameters { get; set; }
        public Dictionary<string, object>? Config { get; set; }
    }
}
