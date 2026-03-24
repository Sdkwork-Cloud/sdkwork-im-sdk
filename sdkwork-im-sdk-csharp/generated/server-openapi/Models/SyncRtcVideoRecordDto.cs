using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class SyncRtcVideoRecordDto
    {
        public string? RoomId { get; set; }
        public string? TaskId { get; set; }
    }
}
