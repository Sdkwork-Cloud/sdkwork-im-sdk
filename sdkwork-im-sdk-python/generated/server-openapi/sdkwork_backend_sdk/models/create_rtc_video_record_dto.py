from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CreateRtcVideoRecordDto:
    room_id: str
    user_id: str = None
    file_name: str = None
    file_path: str = None
    file_type: str = None
    file_size: float = None
    start_time: str
    end_time: str = None
    status: str = None
    metadata: Dict[str, Any] = None
