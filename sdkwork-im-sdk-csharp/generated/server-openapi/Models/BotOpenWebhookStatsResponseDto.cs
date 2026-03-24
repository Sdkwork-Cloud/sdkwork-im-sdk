using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class BotOpenWebhookStatsResponseDto
    {
        public bool? Configured { get; set; }
        public string? Url { get; set; }
        public List<string>? Events { get; set; }
        public double? PendingRetries { get; set; }
    }
}
