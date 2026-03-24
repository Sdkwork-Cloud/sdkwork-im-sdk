from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class StopRtcRecordingDto:
    record_id: str = None
    task_id: str = None
    metadata: Dict[str, Any] = None
