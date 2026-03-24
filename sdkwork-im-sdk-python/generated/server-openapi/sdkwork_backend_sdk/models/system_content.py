from dataclasses import dataclass
from typing import Optional, List, Dict, Any

@dataclass
class SystemContent:
    type: str
    data: Dict[str, Any] = None
