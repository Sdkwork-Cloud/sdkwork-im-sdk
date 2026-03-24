from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class StoreMemoryDto:
    content: str
    type: str = None
    source: str = None
    session_id: str = None
    metadata: Dict[str, Any] = None
