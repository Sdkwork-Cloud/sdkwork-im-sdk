using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class ConversationControllerGetSyncStatesRequest
    {
        public List<Dictionary<string, object>>? Conversations { get; set; }
        public string? DeviceId { get; set; }
    }
}
