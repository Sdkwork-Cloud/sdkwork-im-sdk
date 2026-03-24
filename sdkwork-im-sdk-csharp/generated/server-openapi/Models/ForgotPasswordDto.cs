using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class ForgotPasswordDto
    {
        public string? Email { get; set; }
        public string? Phone { get; set; }
    }
}
