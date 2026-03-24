from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class CreateTimelinePostDto:
    text: str = None
    media: List[TimelineMediaItemDto] = None
    visibility: str
    custom_audience_ids: List[str] = None
    extra: Dict[str, Any] = None
