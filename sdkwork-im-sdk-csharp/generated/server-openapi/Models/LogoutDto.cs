using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class LogoutDto
    {
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
        public string? DeviceId { get; set; }
    }
}
