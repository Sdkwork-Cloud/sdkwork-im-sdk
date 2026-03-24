using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class BotOpenProfileResponseDto
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Username { get; set; }
        public string? AppId { get; set; }
        public string? Description { get; set; }
        public string? Avatar { get; set; }
        public string? Homepage { get; set; }
        public string? DeveloperName { get; set; }
        public string? DeveloperEmail { get; set; }
        public double? Intents { get; set; }
        public List<string>? Scopes { get; set; }
        public string? Status { get; set; }
        public BotOpenStatsDto? Stats { get; set; }
        public string? CreatedAt { get; set; }
        public string? UpdatedAt { get; set; }
    }
}
