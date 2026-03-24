using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class GroupControllerAddMemberRequest
    {
        public string? UserId { get; set; }
        public string? Role { get; set; }
    }
}
