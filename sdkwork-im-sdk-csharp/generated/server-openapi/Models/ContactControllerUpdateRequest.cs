using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class ContactControllerUpdateRequest
    {
        public string? Name { get; set; }
        public string? Remark { get; set; }
        public List<string>? Tags { get; set; }
        public bool? IsFavorite { get; set; }
        public string? Status { get; set; }
    }
}
