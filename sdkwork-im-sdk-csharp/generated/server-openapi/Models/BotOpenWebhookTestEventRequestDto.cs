using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class BotOpenWebhookTestEventRequestDto
    {
        public string? EventType { get; set; }
        public Dictionary<string, object>? Data { get; set; }
    }
}
