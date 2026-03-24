using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class AibotControllerProcessMessageRequest
    {
        public string? UserId { get; set; }
        public string? Message { get; set; }
    }
}
