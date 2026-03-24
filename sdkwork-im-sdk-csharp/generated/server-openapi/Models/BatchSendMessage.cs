using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class BatchSendMessage
    {
        public List<SendMessage>? Messages { get; set; }
    }
}
