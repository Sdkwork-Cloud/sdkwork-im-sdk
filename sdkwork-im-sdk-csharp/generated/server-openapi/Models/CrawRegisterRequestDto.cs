using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CrawRegisterRequestDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
}
