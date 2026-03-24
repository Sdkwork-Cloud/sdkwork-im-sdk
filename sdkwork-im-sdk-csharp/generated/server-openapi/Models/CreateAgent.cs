using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CreateAgent
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Avatar { get; set; }
        public string? Type { get; set; }
        public AgentConfig? Config { get; set; }
        public bool? IsPublic { get; set; }
    }
}
