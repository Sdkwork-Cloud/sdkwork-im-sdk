from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class StartRtcRecordingDto:
    task_id: str = None
    metadata: Dict[str, Any] = None
