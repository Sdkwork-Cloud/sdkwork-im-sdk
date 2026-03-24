from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class RtcTokenValidationResultDto:
    valid: bool
    room_id: str = None
    user_id: str = None
    provider: str = None
    channel_id: str = None
    role: str = None
    expires_at: str = None
