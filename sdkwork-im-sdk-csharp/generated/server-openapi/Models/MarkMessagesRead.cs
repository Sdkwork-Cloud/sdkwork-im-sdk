using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class MarkMessagesRead
    {
        public List<string>? MessageIds { get; set; }
    }
}
