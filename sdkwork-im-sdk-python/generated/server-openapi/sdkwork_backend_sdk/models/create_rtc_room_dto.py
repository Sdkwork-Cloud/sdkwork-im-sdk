from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CreateRtcRoomDto:
    type: str
    participants: List[str]
    name: str = None
    channel_id: str = None
    provider: str = None
    ai_metadata: Dict[str, Any] = None
