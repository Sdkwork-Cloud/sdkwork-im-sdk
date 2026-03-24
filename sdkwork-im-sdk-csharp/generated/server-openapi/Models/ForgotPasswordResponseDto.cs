using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class ForgotPasswordResponseDto
    {
        public bool? Success { get; set; }
        public string? Message { get; set; }
        public string? Error { get; set; }
    }
}
