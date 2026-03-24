using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class BotOpenStatsDto
    {
        public double? TotalMessagesSent { get; set; }
        public double? TotalMessagesReceived { get; set; }
        public double? TotalUsersInteracted { get; set; }
        public double? TotalGroupsJoined { get; set; }
        public double? TotalCommandsExecuted { get; set; }
        public double? TotalInteractions { get; set; }
        public string? LastActivityAt { get; set; }
    }
}
