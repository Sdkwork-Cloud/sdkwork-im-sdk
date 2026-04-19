using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Sdkwork.Im.Sdk.Generated.Models
{
    public class RealtimeEventWindow
    {
        public string? DeviceId { get; set; }
        public List<RealtimeEvent>? Items { get; set; }
        public int? NextAfterSeq { get; set; }
        public bool? HasMore { get; set; }
        public int? AckedThroughSeq { get; set; }
        public int? TrimmedThroughSeq { get; set; }
    }
}

