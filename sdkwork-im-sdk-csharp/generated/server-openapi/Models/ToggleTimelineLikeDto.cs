using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class ToggleTimelineLikeDto
    {
        public bool? Liked { get; set; }
    }
}
