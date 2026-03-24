from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class GenerateRtcTokenDto:
    room_id: str
    user_id: str = None
    channel_id: str = None
    provider: str = None
    role: str = None
    expire_seconds: float = None
