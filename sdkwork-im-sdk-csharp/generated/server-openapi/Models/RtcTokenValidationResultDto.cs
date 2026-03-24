using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class RtcTokenValidationResultDto
    {
        public bool? Valid { get; set; }
        public string? RoomId { get; set; }
        public string? UserId { get; set; }
        public string? Provider { get; set; }
        public string? ChannelId { get; set; }
        public string? Role { get; set; }
        public string? ExpiresAt { get; set; }
    }
}
