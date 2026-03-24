using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class AuthResponseDto
    {
        public Dictionary<string, object>? User { get; set; }
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
        public double? ExpiresIn { get; set; }
        public IMConfigDto? ImConfig { get; set; }
    }
}
