using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class CardMediaResource
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
        public string? CardType { get; set; }
        public string? Title { get; set; }
        public string? ThumbnailUrl { get; set; }
        public string? SourceName { get; set; }
        public string? SourceIcon { get; set; }
        public string? TargetUrl { get; set; }
        public string? AppId { get; set; }
        public string? AppPath { get; set; }
        public string? AppOriginalId { get; set; }
        public string? AppVersion { get; set; }
        public string? PackageName { get; set; }
        public string? AppDownloadUrl { get; set; }
        public CardAction? MainAction { get; set; }
        public List<CardButton>? Buttons { get; set; }
        public Dictionary<string, object>? ExtraData { get; set; }
        public string? Tag { get; set; }
        public string? Status { get; set; }
        public string? ExpireTime { get; set; }
        public bool? ShowSource { get; set; }
    }
}
