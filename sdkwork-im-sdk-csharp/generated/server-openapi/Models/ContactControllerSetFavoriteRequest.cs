using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class ContactControllerSetFavoriteRequest
    {
        public bool? IsFavorite { get; set; }
    }
}
