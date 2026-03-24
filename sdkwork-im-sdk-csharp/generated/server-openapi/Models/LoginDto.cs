using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class LoginDto
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? DeviceId { get; set; }
    }
}
