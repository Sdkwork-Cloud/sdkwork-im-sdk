from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class TimelineMediaItemDto:
    type: str
    url: str
    width: float = None
    height: float = None
    duration: float = None
    cover_url: str = None
    extra: Dict[str, Any] = None
