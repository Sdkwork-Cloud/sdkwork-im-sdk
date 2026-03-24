using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CrawRegisterAgentDataDto
    {
        public string? ApiKey { get; set; }
        public string? ClaimUrl { get; set; }
        public string? VerificationCode { get; set; }
    }
}
