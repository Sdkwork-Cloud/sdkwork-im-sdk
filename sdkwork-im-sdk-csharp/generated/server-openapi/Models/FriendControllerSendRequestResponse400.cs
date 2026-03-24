using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class FriendControllerSendRequestResponse400
    {
        public double? Code { get; set; }
        public string? Message { get; set; }
        public double? Timestamp { get; set; }
        public string? RequestId { get; set; }
    }
}
