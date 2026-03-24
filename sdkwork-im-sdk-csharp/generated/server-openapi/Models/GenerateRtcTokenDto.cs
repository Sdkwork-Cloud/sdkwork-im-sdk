using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class GenerateRtcTokenDto
    {
        public string? RoomId { get; set; }
        public string? UserId { get; set; }
        public string? ChannelId { get; set; }
        public string? Provider { get; set; }
        public string? Role { get; set; }
        public double? ExpireSeconds { get; set; }
    }
}
