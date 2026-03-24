using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class SetMessageReaction
    {
        public string? Emoji { get; set; }
        public bool? Active { get; set; }
    }
}
