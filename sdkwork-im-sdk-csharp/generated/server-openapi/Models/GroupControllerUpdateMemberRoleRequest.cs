using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class GroupControllerUpdateMemberRoleRequest
    {
        public string? Role { get; set; }
    }
}
