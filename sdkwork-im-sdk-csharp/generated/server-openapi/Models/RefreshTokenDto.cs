using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class RefreshTokenDto
    {
        public string? RefreshToken { get; set; }
    }
}
