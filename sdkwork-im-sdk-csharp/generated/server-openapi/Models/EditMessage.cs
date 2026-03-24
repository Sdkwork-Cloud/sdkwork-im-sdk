using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class EditMessage
    {
        public MessageContent? Content { get; set; }
        public Dictionary<string, object>? Extra { get; set; }
    }
}
