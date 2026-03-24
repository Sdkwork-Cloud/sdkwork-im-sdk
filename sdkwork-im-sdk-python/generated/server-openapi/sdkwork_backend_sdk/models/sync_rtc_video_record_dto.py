from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class SyncRtcVideoRecordDto:
    room_id: str = None
    task_id: str = None
