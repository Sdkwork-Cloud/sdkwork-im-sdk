using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class IMConfigDto
    {
        public string? WsUrl { get; set; }
        public string? Uid { get; set; }
        public string? Token { get; set; }
    }
}
