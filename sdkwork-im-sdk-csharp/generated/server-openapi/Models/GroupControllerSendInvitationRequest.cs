using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class GroupControllerSendInvitationRequest
    {
        public string? GroupId { get; set; }
        public string? InviterId { get; set; }
        public string? InviteeId { get; set; }
        public string? Message { get; set; }
    }
}
