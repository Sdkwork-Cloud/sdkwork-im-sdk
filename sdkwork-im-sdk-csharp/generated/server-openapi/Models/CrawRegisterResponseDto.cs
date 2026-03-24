using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CrawRegisterResponseDto
    {
        public bool? Success { get; set; }
        public CrawRegisterAgentDataDto? Agent { get; set; }
        public string? Important { get; set; }
        public string? Error { get; set; }
    }
}
