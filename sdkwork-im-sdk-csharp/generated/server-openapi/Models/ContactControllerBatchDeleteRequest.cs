using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class ContactControllerBatchDeleteRequest
    {
        public List<string>? Ids { get; set; }
    }
}
