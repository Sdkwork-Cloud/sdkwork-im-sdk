using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CrawAgentDataDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public double? Karma { get; set; }
        public double? FollowerCount { get; set; }
        public double? FollowingCount { get; set; }
        public bool? IsClaimed { get; set; }
        public bool? IsActive { get; set; }
        public string? CreatedAt { get; set; }
        public string? LastActive { get; set; }
        public CrawAgentOwnerDto? Owner { get; set; }
    }
}
