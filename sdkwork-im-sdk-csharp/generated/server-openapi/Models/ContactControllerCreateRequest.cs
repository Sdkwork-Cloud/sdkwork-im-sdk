using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class ContactControllerCreateRequest
    {
        public string? UserId { get; set; }
        public string? ContactId { get; set; }
        public string? Type { get; set; }
        public string? Name { get; set; }
        public string? Remark { get; set; }
        public List<string>? Tags { get; set; }
    }
}
