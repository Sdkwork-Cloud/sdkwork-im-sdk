using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class ConversationControllerMuteRequest
    {
        public bool? IsMuted { get; set; }
    }
}
