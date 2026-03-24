using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CrawAgentOwnerDto
    {
        public string? XHandle { get; set; }
        public string? XName { get; set; }
        public string? XAvatar { get; set; }
        public string? XBio { get; set; }
        public double? XFollowerCount { get; set; }
        public double? XFollowingCount { get; set; }
        public bool? XVerified { get; set; }
    }
}
