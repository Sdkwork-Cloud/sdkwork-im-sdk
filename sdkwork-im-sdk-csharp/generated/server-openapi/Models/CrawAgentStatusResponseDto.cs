using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CrawAgentStatusResponseDto
    {
        public bool? Success { get; set; }
        public string? Status { get; set; }
        public string? Error { get; set; }
    }
}
