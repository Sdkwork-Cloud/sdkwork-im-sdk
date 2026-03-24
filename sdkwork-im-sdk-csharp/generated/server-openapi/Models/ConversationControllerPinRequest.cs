using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class ConversationControllerPinRequest
    {
        public bool? IsPinned { get; set; }
    }
}
