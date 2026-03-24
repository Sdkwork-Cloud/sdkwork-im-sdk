using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class RtcProviderOperationErrorDto
    {
        public double? StatusCode { get; set; }
        public string? Message { get; set; }
        public string? Provider { get; set; }
        public string? Operation { get; set; }
        public double? ProviderStatusCode { get; set; }
        public string? ProviderErrorCode { get; set; }
        public bool? Retryable { get; set; }
        public string? ProviderMessage { get; set; }
    }
}
