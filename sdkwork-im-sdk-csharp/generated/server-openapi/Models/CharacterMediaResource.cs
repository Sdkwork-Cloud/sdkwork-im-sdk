using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CharacterMediaResource
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
        public string? CharacterType { get; set; }
        public string? Gender { get; set; }
        public string? AgeGroup { get; set; }
        public ImageMediaResource? AvatarImage { get; set; }
        public VideoMediaResource? AvatarVideo { get; set; }
        public string? SpeakerId { get; set; }
        public Dictionary<string, object>? AppearanceParams { get; set; }
        public Dictionary<string, object>? AnimationParams { get; set; }
        public List<string>? Actions { get; set; }
        public List<string>? Expressions { get; set; }
        public Dictionary<string, object>? VoiceFeatures { get; set; }
    }
}
