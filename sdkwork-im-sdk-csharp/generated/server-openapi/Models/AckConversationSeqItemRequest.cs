using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class AckConversationSeqItemRequest
    {
        public string? TargetId { get; set; }
        public string? Type { get; set; }
        public double? AckSeq { get; set; }
    }
}
