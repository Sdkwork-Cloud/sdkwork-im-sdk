from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class UpdateRtcVideoRecordStatusDto:
    status: str
    error_message: str = None
