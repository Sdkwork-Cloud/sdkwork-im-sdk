using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CardAction
    {
        public string? Type { get; set; }
        public string? Url { get; set; }
        public Dictionary<string, object>? Params { get; set; }
        public string? AppId { get; set; }
        public string? AppPath { get; set; }
    }
}
