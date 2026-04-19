using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Sdkwork.Im.Sdk.Generated.Models
{
    public class TransferConversationOwnerResult
    {
        public string? EventId { get; set; }
        public string? TransferredAt { get; set; }
        public ConversationMember? PreviousOwner { get; set; }
        public ConversationMember? NewOwner { get; set; }
    }
}

