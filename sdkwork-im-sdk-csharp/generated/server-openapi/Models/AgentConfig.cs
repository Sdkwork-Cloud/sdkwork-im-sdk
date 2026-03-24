using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class AgentConfig
    {
        public string? Model { get; set; }
        public double? Temperature { get; set; }
        public double? MaxTokens { get; set; }
        public string? SystemPrompt { get; set; }
        public string? WelcomeMessage { get; set; }
        public List<string>? Tools { get; set; }
        public List<string>? Skills { get; set; }
        public Dictionary<string, object>? Llm { get; set; }
    }
}
