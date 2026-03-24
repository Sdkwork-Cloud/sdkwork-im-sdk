using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class GroupControllerTransferRequest
    {
        public string? NewOwnerId { get; set; }
    }
}
