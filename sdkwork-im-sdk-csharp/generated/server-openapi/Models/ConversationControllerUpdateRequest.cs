using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class ConversationControllerUpdateRequest
    {
        public bool? IsPinned { get; set; }
        public bool? IsMuted { get; set; }
    }
}
