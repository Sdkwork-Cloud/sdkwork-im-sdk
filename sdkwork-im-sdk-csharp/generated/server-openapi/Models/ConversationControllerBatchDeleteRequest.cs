using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class ConversationControllerBatchDeleteRequest
    {
        public List<string>? Ids { get; set; }
    }
}
