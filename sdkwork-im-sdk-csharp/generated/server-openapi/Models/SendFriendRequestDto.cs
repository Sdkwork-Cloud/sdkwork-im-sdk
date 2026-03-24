using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class SendFriendRequestDto
    {
        public string? ToUserId { get; set; }
        public string? Message { get; set; }
    }
}
