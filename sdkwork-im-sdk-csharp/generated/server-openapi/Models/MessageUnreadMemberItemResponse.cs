using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class MessageUnreadMemberItemResponse
    {
        public string? UserId { get; set; }
        public string? Role { get; set; }
        public string? ReceiptStatus { get; set; }
        public string? DeliveredAt { get; set; }
        public string? ReadAt { get; set; }
    }
}
