using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class AckConversationSeqBatchRequest
    {
        public List<AckConversationSeqItemRequest>? Items { get; set; }
        public string? DeviceId { get; set; }
    }
}
