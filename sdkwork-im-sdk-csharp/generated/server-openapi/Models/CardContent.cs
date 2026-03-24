using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CardContent
    {
        public string? UserId { get; set; }
        public string? Nickname { get; set; }
        public string? Avatar { get; set; }
        public string? Signature { get; set; }
    }
}
