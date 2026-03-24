using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class MessageUnreadMembersResponse
    {
        public string? MessageId { get; set; }
        public string? GroupId { get; set; }
        public double? Total { get; set; }
        public double? Limit { get; set; }
        public double? Offset { get; set; }
        public string? NextCursor { get; set; }
        public List<MessageUnreadMemberItemResponse>? Items { get; set; }
    }
}
