using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class ConversationControllerCreateRequest
    {
        public string? Type { get; set; }
        public string? TargetId { get; set; }
    }
}
