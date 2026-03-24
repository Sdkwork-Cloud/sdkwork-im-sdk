using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class SendMessage
    {
        public double? Version { get; set; }
        public ConversationEnvelope? Conversation { get; set; }
        public MessageEnvelope? Message { get; set; }
        public EventContentTransport? Event { get; set; }
        public string? Uuid { get; set; }
        public string? Type { get; set; }
        public MessageContent? Content { get; set; }
        public string? FromUserId { get; set; }
        public string? ToUserId { get; set; }
        public string? GroupId { get; set; }
        public string? ReplyToId { get; set; }
        public string? ForwardFromId { get; set; }
        public double? ClientSeq { get; set; }
        public string? IdempotencyKey { get; set; }
        public Dictionary<string, object>? Extra { get; set; }
        public bool? NeedReadReceipt { get; set; }
    }
}
