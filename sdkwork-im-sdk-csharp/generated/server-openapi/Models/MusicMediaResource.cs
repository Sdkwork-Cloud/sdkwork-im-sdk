using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class MusicMediaResource
    {
        public string? Id { get; set; }
        public string? Uuid { get; set; }
        public string? Url { get; set; }
        public List<string>? Bytes { get; set; }
        public Dictionary<string, object>? LocalFile { get; set; }
        public string? Base64 { get; set; }
        public string? Type { get; set; }
        public string? MimeType { get; set; }
        public double? Size { get; set; }
        public string? Name { get; set; }
        public string? Extension { get; set; }
        public Dictionary<string, object>? Tags { get; set; }
        public Dictionary<string, object>? Metadata { get; set; }
        public string? Prompt { get; set; }
        public string? CreatedAt { get; set; }
        public string? UpdatedAt { get; set; }
        public string? CreatorId { get; set; }
        public string? Description { get; set; }
        public string? Format { get; set; }
        public double? Duration { get; set; }
        public string? Title { get; set; }
        public string? Artist { get; set; }
        public string? Album { get; set; }
        public string? Genre { get; set; }
        public string? Lyrics { get; set; }
        public string? CoverUrl { get; set; }
        public double? Year { get; set; }
    }
}
