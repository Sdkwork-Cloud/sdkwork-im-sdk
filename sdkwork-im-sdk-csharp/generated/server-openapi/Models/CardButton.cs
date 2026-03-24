using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CardButton
    {
        public string? Text { get; set; }
        public CardAction? Action { get; set; }
        public string? Style { get; set; }
        public string? Color { get; set; }
    }
}
