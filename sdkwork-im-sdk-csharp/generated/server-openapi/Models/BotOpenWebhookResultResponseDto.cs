using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class BotOpenWebhookResultResponseDto
    {
        public bool? Success { get; set; }
        public double? StatusCode { get; set; }
        public string? Error { get; set; }
        public double? RetryCount { get; set; }
        public double? Latency { get; set; }
    }
}
