using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CrawAgentMeResponseDto
    {
        public bool? Success { get; set; }
        public CrawAgentDataDto? Agent { get; set; }
        public string? Error { get; set; }
    }
}
