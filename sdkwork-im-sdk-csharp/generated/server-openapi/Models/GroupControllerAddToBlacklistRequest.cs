using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class GroupControllerAddToBlacklistRequest
    {
        public string? UserId { get; set; }
    }
}
