using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class ContactControllerAddTagRequest
    {
        public string? Tag { get; set; }
    }
}
