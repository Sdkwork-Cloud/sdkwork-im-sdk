using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Sdkwork.Im.Sdk.Generated.Models
{
    public class ChangeConversationMemberRoleResult
    {
        public string? EventId { get; set; }
        public string? ChangedAt { get; set; }
        public ConversationMember? PreviousMember { get; set; }
        public ConversationMember? UpdatedMember { get; set; }
    }
}

