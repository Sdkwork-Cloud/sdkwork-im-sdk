from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class EventContent:
    type: str
    name: str = None
    data: Dict[str, Any] = None
    metadata: Dict[str, Any] = None
